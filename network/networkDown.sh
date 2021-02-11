#!/bin/bash

set -ex

pushd network-conf
./network.sh down
popd

# remove generated wallet
rm -rf ../api/src/config/wallet/*
rm -rf ../api/dist/config/wallet/*