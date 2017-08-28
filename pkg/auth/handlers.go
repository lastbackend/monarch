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
	"net/http"
	"github.com/lastbackend/monarch/pkg/types"
	"github.com/lastbackend/monarch/pkg/utils/errors"
)

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbSI6InRlYW1AbGFzdGJhY2tlbmQuY29tIiwiZXhwIjoxNTEwMDQ3OTQ1LCJqdGkiOjE1MTAwNDc5NDUsInVpZCI6IjRmMjg1OGJiLWVjYWItNGY4OC1iNzczLTU1MWQzNGYwN2JhZCIsInVuIjoibGFzdGJhY2tlbmQifQ.Ens6F7UMiI3J4diqkTDtwPbYpAk1ItZgnl6NjRbKSyk`

// SessionCreateH - create session handler
func SessionCreateH(w http.ResponseWriter, r *http.Request) {

	var (
		err error
	)

	log.V(logLevel).Debug("Handler: Session: create session")

	session := &types.Session{
		Uid:      "4f2858bb-ecab-4f88-b773-551d34f07bad",
		Username: "lastbackend",
		Email:    "team@lastbackend.com",
	}

	response, err := NewSession(session).ToJson()
	if err != nil {
		log.V(logLevel).Errorf("Handler: Session: convert struct to json err: %v", err)
		errors.HTTP.InternalServerError(w)
		return
	}

	w.WriteHeader(http.StatusOK)
	if _, err = w.Write(response); err != nil {
		log.V(logLevel).Errorf("Handler: Session: write response err: %v", err)
		return
	}
}
