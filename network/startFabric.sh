#!/bin/bash

set -e

starttime=$(date +%s)

CC_SRC_LANGUAGE="typescript"
CC_SRC_PATH="../../chaincode"

rm -rf ../api/src/config/wallet/*
rm -rf ../api/dist/config/wallet/*

pushd network-conf
./network.sh down
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC -ccn ebudgetingCC -ccv 1 -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH} -cci initLedger
popd

cat <<EOF
Total setup execution time: $(($(date +%s) - starttime)) secs...
EOF

