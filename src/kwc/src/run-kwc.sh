#!/bin/sh
#
set -e

echo "start build KWC production mode"
ng build --prod
echo "start KWC angular app"
cd /kwc/dist/kwc
http-server -p $PORT -P http://127.0.0.1:$PORT?