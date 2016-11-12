# react-prefixer-provider

Provide a vendor prefixer via context so you don't need to hard code or pass it through the whole component tree.
Includes a HOC to inject the prefixer from context, so you don't need to deal with the context at all.

[![NPM Version Widget]][npm version]
[![Build Status Widget]][build status]
[![Coverage Status Widget]][coverage status]

## Installation

```sh
npm install react-prefixer-provider --save
```

## Usage

```javascript
import { PrefixerProvider, withPrefixer } from "react-prefixer-provider"

const RawButton = (props) => (
  <button {...props} style={props.prefixer(props.style)} />
)

const Button = withPrefixer(RawButton)

const App = () => (
  <PrefixerProvider prefixer={myPrefixer}>
    <Button style={appearance: "normal"}>Hello</Button>
  </PrefixerProvider>
)

ReactDOM.render(<App />, mountNode)
```

### With decorator syntax

You can use ES7 with [decorators](https://github.com/wycats/javascript-decorators) (using [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)).

```javascript
@withPrefixer
const Button = (props) => (
  <button {...props} style={props.prefixer(props.style)} />
)
```

### Example implementation of `prefixer`

```javascript
// This prefixes everything with the webkit prefix.
const myPrefixer = (styles) => {
  const prefixed = {}
  for (let key in styles) {
    prefixed["Webkit" + key[0].toUpperCase() + key.substr(1)] = styles[key]
  }
  return prefixed
}
```

[npm version]: https://www.npmjs.com/package/react-prefixer-provider

[npm version widget]: https://img.shields.io/npm/v/react-prefixer-provider.svg?style=flat-square

[build status]: https://travis-ci.org/wikiwi/react-prefixer-provider

[build status widget]: https://img.shields.io/travis/wikiwi/react-prefixer-provider/master.svg?style=flat-square

[coverage status]: https://coveralls.io/github/wikiwi/react-prefixer-provider?branch=master

[coverage status widget]: https://img.shields.io/coveralls/wikiwi/react-prefixer-provider/master.svg?style=flat-square

