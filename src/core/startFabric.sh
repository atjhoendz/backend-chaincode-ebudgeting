#!/bin/bash

set -e

starttime=$(date +%s)

CC_SRC_LANGUAGE="typescript"
CC_SRC_PATH="../chaincode/typescript"

rm -rf ../common/config/wallet/*
rm -rf ../../dist/common/config/wallet/*

pushd network
./network.sh down
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC -ccn fabcar -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
popd

cat <<EOF
Total setup execution time: $(($(date +%s) - starttime)) secs...
EOF

