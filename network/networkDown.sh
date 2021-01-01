#!/bin/bash

set -ex

pushd network-conf
./network.sh down
popd

# remove generated wallet
rm -rf ../api/src/common/config/wallet/*
rm -rf ../api/dist/common/config/wallet/*