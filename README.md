## Installation

```sh
npm i -D typedoc-unhoax-theme
```

…and in your typedoc config:

```json
{
  "plugin": ["typedoc-unhoax-theme"]
}
```

There is no particular configuration for this plugin, it is mainly a theme.

## Examples

I added the default [TypeDoc Example](https://sacdenoeuds.github.io/typedoc-unhoax-theme/example/) and another one of my own [here](https://sacdenoeuds.github.io/typedoc-unhoax-theme/example-ddd/).

## Developing

```sh
npm ci
npm run debug # builds the project and the examples

# hosting the example:
npx http-server -p 8900 ./example/docs
```
