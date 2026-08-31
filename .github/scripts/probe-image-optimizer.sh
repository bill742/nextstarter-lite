#!/usr/bin/env bash
# TEMPORARY diagnostic. Delete with the workflow that calls it.
#
# Asks the running production server for the three /pro screenshots through
# /_next/image and reports what comes back. The interesting variable is the
# ORDER: round 1 asks for the screenshot that hangs under Playwright first,
# round 2 asks for a different one first. If the hang moves with the position
# rather than staying with the file, the bug is in the optimizer's cold start,
# not in the image.

set -uo pipefail

BASE=http://localhost:3000
# The Accept header chromium sends. Firefox and chromium both fail; webkit,
# which runs at deviceScaleFactor 2 and so requests a different width, passes.
ACCEPT='image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
LOGDIR="${RUNNER_TEMP:-/tmp}/probe"
mkdir -p "$LOGDIR"

start_server() {
  local round=$1
  rm -rf .next/cache/images
  npm run start >"$LOGDIR/server-$round.log" 2>&1 &
  SERVER_PID=$!
  for _ in $(seq 1 120); do
    if curl -fsS -o /dev/null --max-time 2 "$BASE/pro" 2>/dev/null; then return 0; fi
    sleep 1
  done
  echo "server never became ready"
  cat "$LOGDIR/server-$round.log"
  return 1
}

stop_server() {
  kill "$SERVER_PID" 2>/dev/null
  wait "$SERVER_PID" 2>/dev/null
  # next start leaves the port held briefly; make sure round 2 gets a clean one.
  sleep 2
}

# fetch <label> <public-path> <width>
fetch() {
  local label=$1 path=$2 width=$3
  local encoded
  encoded=$(printf '%s' "$path" | sed 's|/|%2F|g')
  local url="$BASE/_next/image?url=${encoded}&w=${width}&q=75"
  printf '  %-14s %-44s w=%-5s ' "$label" "$path" "$width"
  curl -s -o /dev/null --max-time 30 -H "Accept: $ACCEPT" \
    -w 'status=%{http_code} type=%{content_type} bytes=%{size_download} time=%{time_total}\n' \
    "$url" || echo "curl exited $? (timed out or connection died)"
}

round() {
  local n=$1; shift
  echo
  echo "=============== ROUND $n: $1 ==============="
  shift
  start_server "$n" || exit 1
  for spec in "$@"; do
    IFS=: read -r label path width <<<"$spec"
    fetch "$label" "$path" "$width"
  done
  echo "--- server output ---"
  cat "$LOGDIR/server-$n.log"
  stop_server
}

# Round 1 mirrors what the browser does: crud first, then the other two, then
# crud again to see whether a second ask for a hung key also hangs.
round 1 "crud requested first (the order Playwright produces)" \
  "1st:/screenshots/pro-projects-crud.png:750" \
  "2nd:/screenshots/pro-dashboard-getting-started.png:750" \
  "3rd:/screenshots/pro-rtl-header.png:750" \
  "repeat:/screenshots/pro-projects-crud.png:750"

# Round 2 flips the order. If rtl-header now hangs and crud succeeds, the hang
# belongs to whichever request arrives first, and the file is innocent.
round 2 "rtl-header requested first (order reversed)" \
  "1st:/screenshots/pro-rtl-header.png:750" \
  "2nd:/screenshots/pro-projects-crud.png:750" \
  "3rd:/screenshots/pro-dashboard-getting-started.png:750"

# Round 3 warms the optimizer on an image nothing else uses, then asks for the
# three real ones. If everything passes, a warm-up is a viable workaround.
round 3 "favicon warm-up first, then the screenshots" \
  "warmup:/favicon-32.png:64" \
  "1st:/screenshots/pro-projects-crud.png:750" \
  "2nd:/screenshots/pro-dashboard-getting-started.png:750" \
  "3rd:/screenshots/pro-rtl-header.png:750"

# Round 4 checks the width the passing browser uses, on a cold server.
round 4 "crud first at webkit's width" \
  "1st:/screenshots/pro-projects-crud.png:1920" \
  "2nd:/screenshots/pro-projects-crud.png:750"

echo
echo "probe finished"
