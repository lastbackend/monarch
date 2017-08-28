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

package node

import (
	"net/http"
	"github.com/go-playground/pure"
	log "github.com/sirupsen/logrus"
	//"fmt"
	"fmt"
)

func Daemon(cfg *Config) {
	p := pure.New()
	p.Post("/build", build)
	p.Post("/deploy", deploy)

	log.WithFields(log.Fields{
		"port": *cfg.Port,
	}).Info("listening")

	http.ListenAndServe(fmt.Sprintf(":%d", *cfg.Port), p.Serve())
}

func build(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello World"))
}

func deploy(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello World"))
}
