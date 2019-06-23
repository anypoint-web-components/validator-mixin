/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { IronMeta } from '@polymer/iron-meta/iron-meta.js';

/**
 * A port of `iron-validator-behavior` that works with any JavaScript class.
 * To be used with Polymer 3, LitElement and low level web components.
 *
 * Use `ValidatorMixin` to implement a custom input/form validator.
 * Element instances implementing this behavior will be registered for use
 * in elements that implement `ValidatableMixin`.
 *
 * ## Validator name
 *
 * By default it takes lower case name of current HTML element. If this class
 * is used outside custom elements environment then it uses static `is` property
 * to get the name of the validator.
 *
 * ```
 * static get is() {
 *  return 'my-validator';
 * }
 * ```
 *
 * @mixinFunction
 * @param {Class} base
 * @return {Class}
 */
export const ValidatorMixin = (base) =>
  class extends base {
    static get properties() {
      return {
        /**
         * Error message to display when the form control did not passed the validation.
         */
        message: { type: String }
      };
    }

    get message() {
      return this._message;
    }

    set message(value) {
      const key = '_message';
      const old = this[key];
      if (old === value) {
        return;
      }
      this[key] = value;
      if (this.requestUpdate) {
        // Lit element
        this.requestUpdate('message', old);
      }
    }

    /**
     * @constructor
     */
    constructor() {
      super();
      let key = this.nodeName;
      if (key) {
        key = key.toLowerCase();
      }
      if (!key) {
        key = this.constructor.is;
      }
      new IronMeta({
        type: 'validator',
        key,
        value: this
      });
    }
    /**
     * Implement custom validation logic in this function.
     *
     * @param {Object|String} values The value to validate. May be any type depending
     * on the validation logic.
     * @return {Boolean} true if `values` is valid.
     */
    validate() {
      return true;
    }
  };
