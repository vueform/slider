<div align="center">
  <img alt="CircleCI" src="https://img.shields.io/circleci/build/github/vueform/slider">

  <a href="https://codecov.io/gh/vueform/slider" target="_blank">
    <img src="https://img.shields.io/codecov/c/github/vueform/slider"/>
  </a>

  <a href="https://www.npmjs.com/package/@vueform/slider" target="_blank">
    <img alt="npm bundle size (scoped version)" src="https://img.shields.io/bundlephobia/minzip/@vueform/slider?color=53ca2f">
  </a>

  <a href="https://github.com/vueform/slider/blob/main/LICENSE.md" target="_blank">
    <img alt="GitHub" src="https://img.shields.io/github/license/vueform/slider?color=53ca2f">
  </a>

  <a href="https://discord.gg/WhX2nG6GTQ" target="_blank">
    <img alt="Discord" src="https://img.shields.io/discord/787237947635793940">
  </a>

  <a href="https://www.npmjs.com/package/@vueform/slider" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/@vueform/slider">
  </a>

  <h1>Vue 3 slider by <a href="https://vueform.com?ref=github" target="_blank">Vueform</a></h1>
  
  <a href="https://vueform.com?ref=github" target="_blank">
    <br>
    <img align="center" src="https://github.com/vueform/slider/raw/main/assets/logo.svg" width="110">
    <br>
  </a>

  <br>
  <br>

  <a href="https://www.npmjs.com/package/@vueform/slider" target="_blank">
    <img align="center" src="https://github.com/vueform/slider/raw/main/assets/screenshot-1.png">
  </a>
  <br>

</div>

## Sponsors

<div align="center"><br>
  <a href="https://vueform.com?ref=github"><img src="https://github.com/vueform/slider/raw/main/assets/logo-horizontal.svg" width="200"></a>
</div>

## Multiselect features

* Vue 2 & 3 support
* No dependencies
* Lightweight (~5 kB gzipped)
* 100% coverage
* ESM support
* Fully configurable

## Demo

Check out our [demo](https://jsfiddle.net/wLxfv2p5/).

## Installation

```
npm install @vueform/slider
```

## Usage with Vue 3

``` vue
<template>
  <div>
    <Multiselect
      v-model="value"
      :options="options"
    />
  </div>
</template>

<script>
  import Multiselect from '@vueform/slider'

  export default {
    components: {
      Multiselect,
    },
    data() {
      return {
        value: null,
        options: [
          'Batman',
          'Robin',
          'Joker',
        ]
      }
    }
  }
</script>

<style src="@vueform/slider/themes/default.css"></style>
```

## Usage with Vue 2

When using with Vue 2 make sure to install [@vue/composition-api](https://github.com/vuejs/composition-api#npm) first and change the imported module to:

``` js
import Multiselect from '@vueform/slider/dist/slider.vue2.js'
```

## Support

Join our [Discord channel](https://discord.gg/WhX2nG6GTQ) or [open an issue](https://github.com/vueform/slider/issues).

## Basic props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **mode** | `string` | `single` | Possible values: `single\|multiple\|tags`. |

## Events

| Event | Attributes | Description |
| --- | --- | --- |
| **@change** | `value` | Emitted after the value is changed. |

## Examples

* [Single select](#single-select)

### Single select

``` vue
<Multiselect
  v-model="value"
  :options="['Batman', 'Robin', 'Joker']"
/>
```

[JSFiddle - Example #1](https://jsfiddle.net/wLxfv2p5/)

## About Vueform

[Vueform](https://vueform.com?ref=github) streamlines the entire form building process in Vue 2 & 3. It comes with 30+ elements, file uploads, element nesting, 50+ validators, conditions, form steps, i18n including reactive configuration, API access, ESM modules and many more. Check out our [live demos](https://vueform.com?ref=github#demo) or see [all the features](https://vueform.com?ref=github#features) and [sign up for beta](https://vueform.com?ref=github#beta) to get early access.


## License

[MIT](https://github.com/vueform/slider/blob/main/LICENSE.md)