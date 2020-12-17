#!/bin/bash

set -ex

pushd network
./network.sh down
popd

# remove generated wallet
rm -rf ../common/config/wallet/*
rm -rf ../../dist/common/config/wallet/*