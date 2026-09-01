#!/usr/bin/env bash
# TEMPORARY diagnostic. Delete with the workflow that calls it.
#
# Asks the running production server for the three /pro screenshots, first over
# curl and then through real browsers, varying the request order and the
# address. The question is why /_next/image never answers the first image
# request under Playwright while curl gets all three in milliseconds.
#
# Two earlier versions of this script lied to us, so the server lifecycle is
# now defensive:
#
#   * `kill` on the npm process left `next start` orphaned holding port 3000.
#     Later rounds silently reused the first round's server, and the browser
#     rounds ran against a stale one that answered 404 for every page. Kill the
#     whole process group and wait for the port to actually close.
#   * Readiness accepted any HTTP response, so a 404 from that stale server
#     counted as "ready". Readiness now demands 200 *and* the marker the page
#     is supposed to contain.

set -uo pipefail

# Playwright's baseURL. `getent hosts localhost` resolves to ::1 in this
# container while `getent ahosts` leads with 127.0.0.1, so the two addresses
# are worth keeping distinct rather than assuming they are the same server.
BROWSER_BASE=http://localhost:3000
CURL_BASE=http://127.0.0.1:3000
# The Accept header chromium sends.
ACCEPT='image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
# The /pro page must contain this, or we are talking to the wrong server.
MARKER='id="database"'
LOGDIR="${RUNNER_TEMP:-/tmp}/probe"
mkdir -p "$LOGDIR"

port_answers() {
  curl -sS -o /dev/null --max-time 3 "$CURL_BASE/pro" 2>/dev/null
}

stop_server() {
  # next start is a child of npm, so killing the recorded pid is not enough.
  pkill -f 'next-server' 2>/dev/null
  pkill -f 'next start' 2>/dev/null
  pkill -f 'npm run start' 2>/dev/null
  for _ in $(seq 1 30); do
    port_answers || return 0
    sleep 1
  done
  echo "  !! port 3000 still answering after kill; later rounds are suspect"
}

start_server() {
  # Two statements: bash expands the whole `local` line before assigning, so a
  # second variable cannot reference the first one on the same line.
  local tag=$1
  local log="$LOGDIR/server-$tag.log"
  stop_server
  rm -rf .next/cache/images
  npm run start >"$log" 2>&1 &

  for _ in $(seq 1 60); do
    if grep -q EADDRINUSE "$log" 2>/dev/null; then
      echo "  !! server could not bind port 3000:"
      sed -n '1,12p' "$log"
      return 1
    fi
    # 200 alone is not enough: the stale server returned 404 pages happily.
    if curl -sS --max-time 5 "$CURL_BASE/pro" 2>/dev/null | grep -q "$MARKER"; then
      return 0
    fi
    sleep 1
  done

  echo "  !! server never served a real /pro"
  echo "  --- status from each address ---"
  curl -sS -o /dev/null --max-time 5 -w '    localhost %{http_code}\n' "$BROWSER_BASE/pro" \
    || echo "    localhost unreachable"
  curl -sS -o /dev/null --max-time 5 -w '    127.0.0.1 %{http_code}\n' "$CURL_BASE/pro" \
    || echo "    127.0.0.1 unreachable"
  echo "  --- server output ---"
  sed -n '1,20p' "$log"
  return 1
}

# fetch <label> <public-path> <width>
fetch() {
  local label=$1 path=$2 width=$3
  local encoded
  encoded=$(printf '%s' "$path" | sed 's|/|%2F|g')
  printf '  %-14s %-44s w=%-5s ' "$label" "$path" "$width"
  curl -s -o /dev/null --max-time 30 -H "Accept: $ACCEPT" \
    -w 'status=%{http_code} type=%{content_type} bytes=%{size_download} time=%{time_total}\n' \
    "$CURL_BASE/_next/image?url=${encoded}&w=${width}&q=75" \
    || echo "curl exited $? (timed out or connection died)"
}

round() {
  local n=$1; shift
  echo
  echo "=============== ROUND $n: $1 ==============="
  shift
  if ! start_server "$n"; then
    echo "!! round $n skipped"
    return
  fi
  for spec in "$@"; do
    IFS=: read -r label path width <<<"$spec"
    fetch "$label" "$path" "$width"
  done
}

round 1 "crud requested first (the order Playwright produces)" \
  "1st:/screenshots/pro-projects-crud.png:750" \
  "2nd:/screenshots/pro-dashboard-getting-started.png:750" \
  "3rd:/screenshots/pro-rtl-header.png:750" \
  "repeat:/screenshots/pro-projects-crud.png:750"

round 2 "rtl-header requested first (order reversed)" \
  "1st:/screenshots/pro-rtl-header.png:750" \
  "2nd:/screenshots/pro-projects-crud.png:750" \
  "3rd:/screenshots/pro-dashboard-getting-started.png:750"

round 3 "favicon warm-up first, then the screenshots" \
  "warmup:/favicon-32.png:64" \
  "1st:/screenshots/pro-projects-crud.png:750" \
  "2nd:/screenshots/pro-dashboard-getting-started.png:750" \
  "3rd:/screenshots/pro-rtl-header.png:750"

round 4 "crud first at webkit's width" \
  "1st:/screenshots/pro-projects-crud.png:1920" \
  "2nd:/screenshots/pro-projects-crud.png:750"

# The comparison that matters: a real browser, one cold server each time, at
# the address Playwright uses and at the one curl uses.
for engine in chromium firefox webkit; do
  for base in "$BROWSER_BASE" "$CURL_BASE"; do
    echo
    echo "=============== BROWSER: $engine @ $base ==============="
    if ! start_server "browser-$engine-$(printf '%s' "$base" | tr -c 'a-z0-9' '-')"; then
      echo "!! skipped"
      continue
    fi
    node .github/scripts/probe-image-browser.mjs "$base" "$engine" || true
  done
done

stop_server
echo
echo "probe finished"
