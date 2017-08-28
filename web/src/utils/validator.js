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

import Error from "./errors";

const EmailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
const UsernameRegex = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/i;
const NameRegex = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/i;
const TextRegex = /^[A-Za-zа-яА-Я\s]+$/i;
const NumberRegex = /^\d+$/i;

class Validator {

  static LoginField(login) {
    switch (true) {
      case !login.length:
        return Error.FIELD_CANNOT_BE_BLANK;
      case login.length < 4:
        return Error.USERNAME_TO_SHORT;
      case login.indexOf("@") > 0 && !EmailRegex.test(login):
        return Error.EMAIL_FORMAT_INVALID;
      default:
        return null
    }
  }

  static UsernameField(username) {
    switch (true) {
      case !username.length:
        return Error.FIELD_CANNOT_BE_BLANK;
      case username.length < 4:
        return Error.USERNAME_TO_SHORT;
      case username.length > 64:
        return Error.USERNAME_TO_LONG;
      case !UsernameRegex.test(username):
        return Error.USERNAME_FORMAT_INVALID;
      default:
        return null
    }
  }

  static EmailField(email) {
    switch (true) {
      case !email.length:
        return Error.FIELD_CANNOT_BE_BLANK;
      case !EmailRegex.test(email):
        return Error.EMAIL_FORMAT_INVALID;
      default:
        return null
    }
  }

  static PasswordField(password) {
    switch (true) {
      case password.length < 8:
        return Error.PASSWORD_TO_SHORT;
      default:
        return null
    }
  }

  static NameField(name) {
    switch (true) {
      case !name.length:
        return Error.FIELD_CANNOT_BE_BLANK;
      case name.length < 4:
        return Error.NAME_TO_SHORT;
      case name.length > 64:
        return Error.NAME_TO_LONG;
      case !NameRegex.test(name):
        return Error.NAME_FORMAT_INVALID;
      default:
        return null
    }
  }

  static TextField(val) {
    switch (true) {
      case !val.length:
        return Error.FIELD_CANNOT_BE_BLANK;
      case !TextRegex.test(val):
        return Error.NAME_FORMAT_INVALID;
      default:
        return null
    }
  }

  static NumberField(val) {
    switch (true) {
      case !val.length:
        return Error.FIELD_CANNOT_BE_BLANK;
      case !NumberRegex.test(val):
        return Error.NAME_FORMAT_INVALID;
      default:
        return null
    }
  }

  static NotEmptyField(val) {
    switch (true) {
      case !val.length:
        return Error.FIELD_CANNOT_BE_BLANK;
      default:
        return null
    }
  }

}

export default Validator