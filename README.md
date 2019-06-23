[![Published on NPM](https://img.shields.io/npm/v/@anypoint-web-components/validator-mixin.svg)](https://www.npmjs.com/package/@anypoint-web-components/validator-mixin)

[![Build Status](https://travis-ci.org/anypoint-web-components/validator-mixin.svg?branch=stage)](https://travis-ci.org/anypoint-web-components/validator-mixin)

# ValidatorMixin

A port of `iron-validator-behavior` that works with any JavaScript class.

To be used with Polymer 3, LitElement and low level web components.

Use `ValidatorMixin` to implement a custom input/form validator.

Element instances implementing this mixin will be registered for use
in elements that implement `ValidatableMixin`.

## Validator name

By default it takes lower case name of current HTML element. If this class
is used outside custom elements environment then it uses static `is` property
to get the name of the validator.

```javascript
static get is() {
 return 'my-validator';
}
```

## Installation

```bash
npm i @anypoint-web-components/validator-mixin
```

## Usage

```javascript
import { LitElement } from 'lit-element';
import { ValidatorMixin } from '@anypoint-web-components/validator-mixin/validator-mixin.js';

class CatsOnly extends ValidatorMixin(LitElement) {
  validateObject(obj) {
    return !Object.keys(obj).some((key) => obj[key].match(/^(c|ca|cat|cats)?$/) === null);
  }

  validateArray(value) {
    return !value.some((value) => value.match(/^(c|ca|cat|cats)?$/) === null);
  }

  validate(values) {
    if (Array.isArray(values)) {
      return this.validateArray(values);
    }
    if (typeof values === 'object') {
      return this.validateObject(values);
    }
    return values.match(/^(c|ca|cat|cats)?$/) !== null;
  }
}
window.customElements.define('cats-only', CatsOnly);
```

## Testing
```bash
npm test
```

## Demo
```bash
npm start
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)
