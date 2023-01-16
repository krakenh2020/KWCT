#!/bin/bash

#read -p 'data: ' data
read -p 'url metodo http/url-agent:portAPIRestAgent/tkms/import: ' url
echo

generate_post_data(){
  cat <<EOF
{"kty":"OKP","kid":"z6MkwZ9XcVLTNwkv8ELoxPu5q2dMkqLnE422ex69YMVX4hpr","crv":"Ed25519","alg":"EdDSA","x": "_hjLQG4OZMUagNFaKNvOkPTTzpKVWC2eKCdgN4QILM8","d": "Rh4-MEIiWoC8clgA2mnT_CAjiSQ0OeO96BYI0mrcmYE"}
EOF
}

curl -i \
-H "Accept: application/json" \
-H "Content-Type:application/json" \
-X POST --data "$(generate_post_data)" "$url"