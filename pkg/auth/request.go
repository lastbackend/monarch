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
	"io"
	"io/ioutil"
	"github.com/lastbackend/monarch/pkg/utils/errors"
	"github.com/lastbackend/monarch/pkg/log"
	"encoding/json"
)

type RequestSessionCreateS struct {
	Login    *string `json:"login,omitempty"`
	Password *string `json:"password,omitempty"`
}

func (s *RequestSessionCreateS) DecodeAndValidate(reader io.Reader) *errors.Err {

	var (
		err error
	)

	log.V(logLevel).Debug("Request: Auth: decode and validate data for creating")

	body, err := ioutil.ReadAll(reader)
	if err != nil {
		log.V(logLevel).Errorf("Request: Auth: decode and validate data for creating err: %s", err.Error())
		return errors.New("auth").Unknown(err)
	}

	if err = json.Unmarshal(body, s); err != nil {
		log.V(logLevel).Errorf("Request: Auth: convert struct from json err: %s", err.Error())
		return errors.New("auth").IncorrectJSON(err)
	}

	if s.Login == nil || *s.Login == "" {
		log.V(logLevel).Errorf("Request: Auth: parameter login not valid")
		return errors.New("auth").BadParameter("login", err)
	}

	if s.Password == nil || *s.Password == "" {
		log.V(logLevel).Errorf("Request: Auth: parameter password not valid")
		return errors.New("auth").BadParameter("password", err)
	}

	return nil
}
