#!/bin/sh
#
set -e

echo "start Building kraken-kwc"
docker build -t kraken-kwc:develop-1.x ../
echo "end Building kraken-kwc"