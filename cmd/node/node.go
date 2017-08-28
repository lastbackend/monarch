//
// Last.Backend LLC CONFIDENTIAL
// __________________
//
// [2014] - [2017] Last.Backend LLC
// All Rights Reserved.
//
// NOTICE:  All information contained herein is, and remains
// the property of Last.Backend LLC and its suppliers,
// if any.  The intellectual and technical concepts contained
// herein are proprietary to Last.Backend LLC
// and its suppliers and may be covered by Russian Federation and Foreign Patents,
// patents in process, and are protected by trade secret or copyright law.
// Dissemination of this information or reproduction of this material
// is strictly forbidden unless prior written permission is obtained
// from Last.Backend LLC.
//

package main

import (
	"fmt"
	"github.com/jawher/mow.cli"
	"github.com/lastbackend/monarch/pkg/node"
	log "github.com/sirupsen/logrus"
	"os"
)

func main() {

	var (
		cfg node.Config
	)

	app := cli.App("", "Infrastructure management toolkit")

	app.Version("v version", "0.9.0")

	app.Spec = "[OPTIONS]"

	var level = app.String(cli.StringOpt{
		Name:   "logging", Desc: "Logging level mode",
		EnvVar: "DEBUG", Value: "info", HideValue: true,
	})

	cfg.Port = app.Int(cli.IntOpt{
		Name:   "port", Desc: "Port to listen to",
		EnvVar: "PORT", Value: 33555, HideValue: false,
	})

	var help = app.Bool(cli.BoolOpt{
		Name:      "h help",
		Value:     false,
		Desc:      "Show the help info and exit",
		HideValue: true,
	})

	app.Before = func() {
		if *help {
			app.PrintLongHelp()
		}
	}

	log.SetOutput(os.Stdout)

	lvl, err := log.ParseLevel(*level)
	if err != nil {
		log.Fatal("Can't parse log level")
	}
	log.SetLevel(lvl)

	app.Action = func() {
		node.Daemon(&cfg)
	}

	err = app.Run(os.Args)
	if err != nil {
		fmt.Errorf("Error: run application: %s", err.Error())
		return
	}
}
