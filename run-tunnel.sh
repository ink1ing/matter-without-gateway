#!/bin/bash
export PATH=$PATH:/opt/homebrew/bin:/usr/local/bin
cloudflared tunnel --config /Users/silas/.cloudflared/config.yml --protocol http2 run
