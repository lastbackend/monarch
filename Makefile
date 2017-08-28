.PHONY : default deps test build image docs

HARDWARE = $(shell uname -m)
OS := $(shell uname)
VERSION ?= 0.9.0

default: deps test build

deps:
	@echo "Configuring Last.Backend Dependencies"
	go get -u github.com/kardianos/govendor
	govendor sync

test:
	@echo "Testing Last.Backend"
	@sh ./hack/run-coverage.sh

docs: docs/*
	@echo "Build Last.Backend Documentation"
	@sh ./hack/build-docs.sh

build:
	@echo "== Pre-building configuration"
	mkdir -p build/linux && mkdir -p build/darwin
	@echo "== Building Last.Backend platform"
	@sh ./hack/build-cross.sh

install:
	@echo "== Instal binaries"
	mv ./build/linux/* /usr/local/bin/


image:
	@echo "== Pre-building configuration"
	@sh ./hack/build-images.sh

run-core:
	@echo "== Run core"
	@go run ./cmd/core/core.go --debug=7

run-node:
	@echo "== Run node"
	@go run ./cmd/node/node.go --debug=7
