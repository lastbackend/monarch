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

package middleware

import (
	"github.com/lastbackend/enterprise/pkg/common/errors"
	"github.com/lastbackend/enterprise/pkg/common/types"
	"github.com/lastbackend/enterprise/pkg/util/http/utils"
	"net/http"
	"strings"
)

// Auth - authentication middleware
func Authenticate(h http.HandlerFunc) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		var token string
		var params = utils.Vars(r)

		if _, ok := r.URL.Query()["x-lastbackend-token"]; ok {
			token = r.URL.Query().Get("x-lastbackend-token")
		} else if _, ok := params["x-lastbackend-token"]; ok {
			token = params["x-lastbackend-token"]
		} else if r.Header.Get("Authorization") != "" {
			// Parse authorization header
			var auth = strings.SplitN(r.Header.Get("Authorization"), " ", 2)

			// Check authorization header parts length and authorization header format
			if len(auth) != 2 || auth[0] != "Bearer" {
				errors.HTTP.Unauthorized(w)
				return
			}
			token = auth[1]

		} else {
			w.Header().Set("Content-Type", "application/json")
			errors.HTTP.Unauthorized(w)
			return
		}

		s := new(types.Session)
		err := s.Decode(token)
		if err != nil {
			errors.HTTP.Unauthorized(w)
			return
		}

		// Set user data to request context
		r = utils.SetContext(r, "uid", s.Uid)
		r = utils.SetContext(r, "username", s.Username)
		r = utils.SetContext(r, "email", s.Email)

		h.ServeHTTP(w, r)
	}
}
