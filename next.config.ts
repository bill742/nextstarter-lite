import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next generates AGENTS.md and CLAUDE.md on `next dev` to brief coding
  // agents on its own conventions. This project keeps its agent instructions
  // elsewhere, and the regenerated files only showed up as untracked noise in
  // `git status` after every dev run.
  agentRules: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
