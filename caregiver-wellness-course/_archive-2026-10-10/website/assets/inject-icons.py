#!/usr/bin/env python3
"""Inline assets/icons.svg into every HTML page's <!-- ICON_SPRITE --> marker
(or an existing injected block), so pages work standalone over file:// with
no fetch() call. Re-run this any time icons.svg changes.

Usage: python3 assets/inject-icons.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
SPRITE = (ROOT / "assets" / "icons.svg").read_text()
BLOCK = f"<!-- ICON_SPRITE:START -->\n{SPRITE}<!-- ICON_SPRITE:END -->"

PATTERN = re.compile(
    r"<!-- ICON_SPRITE -->|<!-- ICON_SPRITE:START -->.*?<!-- ICON_SPRITE:END -->",
    re.DOTALL,
)

count = 0
for html_file in ROOT.glob("*.html"):
    text = html_file.read_text()
    if not PATTERN.search(text):
        continue
    new_text = PATTERN.sub(BLOCK, text, count=1)
    if new_text != text:
        html_file.write_text(new_text)
        count += 1
        print(f"injected: {html_file.name}")

print(f"done, {count} file(s) updated")
