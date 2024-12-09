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

### TypeDoc Default Example

You can check the code [in this repo](./examples/typedoc-default/) and the [full website](https://sacdenoeuds.github.io/typedoc-unhoax-theme/typedoc-default/)

<details>
  <summary>Desktop Screenshots</summary>
  <img src="examples/typedoc-default-asset-home.png" alt="Default Example / Home" width="100%">
  <img src="examples/typedoc-default-asset-home-document.png" alt="Default Example / Document" width="100%">
  <img src="examples/typedoc-default-asset-home-function.png" alt="Default Example / Function" width="100%">
</details>

### Domain / Use-Case Driven Example

You can check the code [in this repo](./examples/ddd/) and the [full website](https://sacdenoeuds.github.io/typedoc-unhoax-theme/ddd/)

<details>
  <summary>Screenshots</summary>
  <img src="examples/ddd-asset-use-case.png" alt="DDD / Use Case" width="100%">
  <img src="examples/ddd-asset-modules.png" alt="DDD / Modules" width="100%">
</details>

<details>
  <summary>Mobile Screenshots</summary>
  <p align="center">
    <img src="examples/ddd-asset-modules-mobile.png" alt="DDD / Modules / Mobile" width="30%">
    <img src="examples/ddd-asset-module-mobile-menu.png" alt="DDD / Modules / Mobile / menu opened" width="30%">
  </p>
</details>

## Contributing

```sh
npm ci
npm run install-examples # runs `npm ci` in examples folders.
npm run debug # builds the project and the examples

# hosting the example:
npx http-server -p 8900 ./demo
```
