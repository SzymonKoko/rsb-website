#!/usr/bin/env sh
set -eu

ROOT_DIR="$(git rev-parse --show-toplevel)"
HOOK_SOURCE="$ROOT_DIR/scripts/git-hooks/post-commit"
HOOK_TARGET="$ROOT_DIR/.git/hooks/post-commit"

if [ ! -f "$HOOK_SOURCE" ]; then
  echo "Missing hook source: $HOOK_SOURCE" >&2
  exit 1
fi

mkdir -p "$ROOT_DIR/.git/hooks"
cp "$HOOK_SOURCE" "$HOOK_TARGET"
chmod +x "$HOOK_TARGET"

echo "Installed post-commit hook: $HOOK_TARGET"
