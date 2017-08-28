#!/usr/bin/env bash

## declare an array of components variable
declare -a arr=("ci")

## now loop through the components array
for i in "${arr[@]}"
do
   echo "Build $i"
   GOOS=linux  go build --tags nopkcs11 -ldflags "-X main.Version=0.0.1" -o "build/linux/cc-$i" "cmd/ccs/$i/$i.go"
   GOOS=darwin go build --tags nopkcs11 -ldflags "-X main.Version=0.0.1" -o "build/darwin/cc-$i" "cmd/ccs/$i/$i.go"
done
