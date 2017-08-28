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

image:
	@echo "== Pre-building configuration"
	@sh ./hack/build-images.sh
