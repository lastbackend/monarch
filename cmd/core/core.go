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
	"github.com/lastbackend/monarch/pkg/core"
	"github.com/jawher/mow.cli"
	"os"
)

func main() {

	var (
		cfg core.Config
	)

	app := cli.App("", "Core API server")

	app.Version("v version", "0.1.0")

	app.Spec = "[OPTIONS]"

	cfg.LogLevel = app.Int(cli.IntOpt{
		Name:   "debug", Desc: "Debug level mode",
		EnvVar: "DEBUG", Value: 0, HideValue: true,
	})

	cfg.Token = app.String(cli.StringOpt{
		Name:   "token", Desc: "Secret token for signature",
		EnvVar: "SECRET_TOKEN", Value: "b8tX!ae4", HideValue: true,
	})

	cfg.APIServer.Host = app.String(cli.StringOpt{
		Name:   "http-server-host", Desc: "Http server host",
		EnvVar: "HTTP_SERVER_HOST", Value: "", HideValue: true,
	})
	cfg.APIServer.Port = app.Int(cli.IntOpt{
		Name:   "http-server-port", Desc: "Http server port",
		EnvVar: "HTTP_SERVER_PORT", Value: 2968, HideValue: true,
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

	app.Action = func() {
		core.Daemon(&cfg)
	}

	err := app.Run(os.Args)
	if err != nil {
		fmt.Errorf("Error: run application: %s", err.Error())
		return
	}
}
