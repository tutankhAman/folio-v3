#!/usr/bin/env bash
# update-resume.sh — copy the latest resume from ~/Downloads into public/ and push.
set -euo pipefail

SRC="$HOME/Downloads/Aman_Aziz_Resume.pdf"
DEST="public/Aman_Aziz_Resume.pdf"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$REPO_ROOT"

if [[ ! -f "$SRC" ]]; then
  echo "ERROR: source resume not found at $SRC" >&2
  exit 1
fi

# Skip if unchanged (same size + mtime)
if [[ -f "$DEST" ]] && cmp -s "$SRC" "$DEST"; then
  echo "Resume already up to date — nothing to do."
  exit 0
fi

cp "$SRC" "$DEST"
git add "$DEST"
git commit -m "chore: update resume ($(date +%Y-%m-%d))"
git push origin "$(git branch --show-current)"
echo "Resume updated and pushed."
