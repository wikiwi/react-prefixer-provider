# react-vendor-prefixer-provider

Provide a Vendor Prefixer via Context so you don't need to hard code or pass it through the whole component tree.
Includes a HOC to inject the Vendor Prefixer from Context, so you don't need to deal with the context at all.

[![NPM Version Widget]][npm version]
[![Build Status Widget]][build status]
[![Coverage Status Widget]][coverage status]

## Installation

```sh
npm install react-vendor-prefixer-provider --save
```

## Usage

```javascript
import { VendorPrefixerProvider, withVendorPrefixer } from "react-vendor-prefixer-provider"

const RawButton = (props) => (
  <button {...props} style={props.vendorPrefixer(props.style)} />
)

const Button = withVendorPrefixer(RawButton)

const App = () => (
  <VendorPrefixerProvider vendorPrefixer={myVendorPrefixer}>
    <Button style={appearance: "normal"}>Hello</Button>
  </VendorPrefixerProvider>
)

ReactDOM.render(<App />, mountNode)
```

### With decorator syntax

You can use ES7 with [decorators](https://github.com/wycats/javascript-decorators) (using [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)).

```javascript
@withVendorPrefixer
const Button = (props) => (
  <button {...props} style={props.vendorPrefixer(props.style)} />
)
```

### Example implementation of `vendorPrefixer`

```javascript
// This prefixes everything with the webkit prefix.
const myVendorPrefixer = (styles) => {
  const prefixed = {};
  for (let key in styles) {
    prefixed["Webkit" + key[0].toUpperCase() + key.substr(1)] = styles[key];
  }
  return prefixed;
};
```

[npm version]: https://www.npmjs.com/package/react-vendor-prefixer-provider

[npm version widget]: https://img.shields.io/npm/v/react-vendor-prefixer-provider.svg?style=flat-square

[build status]: https://travis-ci.org/wikiwi/react-vendor-prefixer-provider

[build status widget]: https://img.shields.io/travis/wikiwi/react-vendor-prefixer-provider/master.svg?style=flat-square

[coverage status]: https://coveralls.io/github/wikiwi/react-vendor-prefixer-provider?branch=master

[coverage status widget]: https://img.shields.io/coveralls/wikiwi/react-vendor-prefixer-provider/master.svg?style=flat-square

