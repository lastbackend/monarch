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

package auth

import (
	"github.com/lastbackend/monarch/pkg/log"
	"os"
	"os/signal"
	"syscall"
)

const logLevel = 2
const app = "auth"

func Daemon(_cfg *Config) {

	var (
		sigs = make(chan os.Signal)
		done = make(chan bool, 1)
	)

	log.New(app, *_cfg.LogLevel)
	log.Info("Start Auth server")

	go func() {
		//types.SecretAccessToken = *_cfg.Token
		if err := Listen(*_cfg.APIServer.Host, *_cfg.APIServer.Port); err != nil {
			log.Fatalf("Http server start error: %v", err)
		}
	}()

	// Handle SIGINT and SIGTERM.
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		for {
			select {
			case <-sigs:
				done <- true
				return
			}
		}
	}()

	<-done

	log.Info("Handle SIGINT and SIGTERM.")
}
