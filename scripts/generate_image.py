#!/usr/bin/env python3
"""Generate an image via the OpenAI Images API and save it locally.

Usage:
    OPENAI_API_KEY=... python3 scripts/generate_image.py "prompt text" out.png [--size 1024x1024]
"""
import argparse
import base64
import os
import sys
import urllib.request
import json


def generate_image(prompt: str, size: str) -> bytes:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        sys.exit("OPENAI_API_KEY is not set. See docs/CREDENTIALS.md.")

    payload = json.dumps({
        "model": "gpt-image-1",
        "prompt": prompt,
        "size": size,
    }).encode()

    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        body = json.load(resp)
    return base64.b64decode(body["data"][0]["b64_json"])


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("prompt")
    parser.add_argument("output_path")
    parser.add_argument("--size", default="1024x1024")
    args = parser.parse_args()

    image_bytes = generate_image(args.prompt, args.size)
    with open(args.output_path, "wb") as f:
        f.write(image_bytes)
    print(f"Saved {args.output_path}")


if __name__ == "__main__":
    main()
