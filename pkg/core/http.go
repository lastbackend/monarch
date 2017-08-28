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

package core

import (
	"github.com/gorilla/mux"
	"github.com/lastbackend/monarch/pkg/log"
	"github.com/lastbackend/monarch/pkg/utils/http"

)

// Extends routes variable
var routes = make([]http.Route, 0)

func AddRoutes(r ...[]http.Route) {
	for i := range r {
		routes = append(routes, r[i]...)
	}
}

func init() {
	AddRoutes(Routes)
}

func Listen(host string, port int) error {

	log.V(logLevel).Debugf("HTTP: listen HTTP server on %s:%d", host, port)

	r := mux.NewRouter()
	r.Methods("OPTIONS").HandlerFunc(http.Headers)

	for _, route := range routes {
		log.V(logLevel).Debugf("HTTP: init route: %s", route.Path)
		r.Handle(route.Path, http.Handle(route.Handler, route.Middleware...)).Methods(route.Method)
	}

	return http.Listen(host, port, r)
}
