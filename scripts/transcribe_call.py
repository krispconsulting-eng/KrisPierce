#!/usr/bin/env python3
"""Transcribe a local audio/video file via the OpenAI Whisper API.

Usage:
    OPENAI_API_KEY=... python3 scripts/transcribe_call.py recording.mp4 out.txt
"""
import argparse
import json
import mimetypes
import os
import sys
import urllib.request
import uuid


def transcribe(file_path: str) -> str:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        sys.exit("OPENAI_API_KEY is not set. See docs/CREDENTIALS.md.")

    boundary = uuid.uuid4().hex
    mime_type = mimetypes.guess_type(file_path)[0] or "application/octet-stream"

    with open(file_path, "rb") as f:
        file_bytes = f.read()

    body = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="model"\r\n\r\nwhisper-1\r\n'
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="file"; filename="{os.path.basename(file_path)}"\r\n'
        f"Content-Type: {mime_type}\r\n\r\n"
    ).encode() + file_bytes + f"\r\n--{boundary}--\r\n".encode()

    req = urllib.request.Request(
        "https://api.openai.com/v1/audio/transcriptions",
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)["text"]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input_path")
    parser.add_argument("output_path")
    args = parser.parse_args()

    text = transcribe(args.input_path)
    with open(args.output_path, "w") as f:
        f.write(text)
    print(f"Saved {args.output_path}")


if __name__ == "__main__":
    main()
