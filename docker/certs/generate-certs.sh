#!/bin/bash
openssl genrsa -out local-key.pem 2048
openssl req -new -x509 -key local-key.pem -out local.pem -days 365 <<EOF
KR
Seoul
Seoul
Development
IT
storyworld.com


EOF

