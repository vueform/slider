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

  <h1>Vue 3 Slider</h1>
  
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

## Other libraries

* [@vueform/multiselect](https://github.com/vueform/multiselect) - Vue 3 multiselect component with single select, multiselect and tagging options.
* [@vueform/toggle](https://github.com/vueform/toggle) - Vue 3 toggle component with labels, custom slots and styling options.

## Slider features

* Vue 2 & 3 support
* 100% coverage
* ESM support
* Fully configurable
* Single slider
* Multiple sliders
* Tooltips
* Formatting

## Demo 

Check out our [demo](https://jsfiddle.net/u6ty74wz/10/).

## Installation

```
npm install @vueform/slider
```

## Usage with Vue 3

``` vue
<template>
  <div>
    <Slider v-model="value" />
  </div>
</template>

<script>
  import Slider from '@vueform/slider'

  export default {
    components: {
      Slider,
    },
    data() {
      return {
        value: 20
      }
    }
  }
</script>

<style src="@vueform/slider/themes/default.css"></style>
```

## Using with Vue 2

When using Vue 2 install [@vue/composition-api](https://github.com/vuejs/composition-api#npm) via npm/yarn first:

``` bash
npm i @vue/composition-api --save-dev
```

Then install the plugin for Vue:

``` js
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

After that make sure to change the imported Slider module to:

``` js
import Slider from '@vueform/slider/dist/slider.vue2.js'
```

## Using with Nuxt.js

First you need install [@nuxtjs/composition-api](https://composition-api.nuxtjs.org/getting-started/setup):

``` bash
npm i @nuxtjs/composition-api --save-dev
```

Then you need to enable it as a module in `nuxt.config.js`:

``` js
{
  buildModules: [
    '@nuxtjs/composition-api'
  ]
}
```

After that make sure to change the imported module to Vue 2 version of Slider, as Nuxt.js still depends on that:

``` js
import Slider from '@vueform/slider/dist/slider.vue2.js'
```

## Support

Join our [Discord channel](https://discord.gg/WhX2nG6GTQ) or [open an issue](https://github.com/vueform/slider/issues).

## Basic props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **id** | `string` | `slider` | The `id` attribute of slider container DOM. |
| **disabled** | `boolean` | `false` | Whether the slider should be disabled. |
| **min** | `number` | `0` | Minimum value of the slider. |
| **max** | `number` | `100` | Maximum value of the slider. |
| **step** | `number` | `1` | The jump between intervals. If `-1` it enables fractions (eg. `1.23`). |
| **tooltips** | `boolean` | `true` | Whether tooltips should show above handlers. |
| **merge** | `number` | `-1` | The step distance between two handles when their tooltips should be merged (when `step` is `-1` then `1` is assumed). Eg: <br><br> `{ merge: 5, step: 10 }` <br> -> values: `0, <=50` will merge <br> -> values: `0, 60` will not merge <br><br> `{ merge: 5, step: -1 }` <br> -> values: `0, <=5` will merge <br> -> values: `0, 5.01` will not merge  |
| **format** | `object\|function` |  | Formats the tooltip. It can be either a function that receives a `value` param and expects a string or number as return or an object with the following properties: <br> `prefix` - eg `$` -> `$100` <br> `suffix` - eg `USD` -> `100USD` <br> `decimals` - eg `2` -> `100.00`  <br> `thousand` - eg `,` - `1,000` |
| **orientation** | `string` | `'horizontal'` | The orientation of the slider. Possible values: `horizontal|vertical` |
| **height** | `string` | `'300px'` | The height of the slider when `orientation` is `vertical`. Can have any valid CSS measure suffix. |
| **direction** | `string` | `'ltr'` | The direction of the slider. By default value increases *left-to-right* and *top-to-bottom*, which is reversed when using `rtl`. Possible values: `ltr|rtl` |

## Events

| Event | Attributes | Description |
| --- | --- | --- |
| **@change** | `value` | Emitted when dragging the slider is finished or it's value changed by clicking, keyboard or programmatical set. |
| **@update** | `value` | Emitted in the same scenarios as changed, but also when the slider is being dragged. |

## Examples

* [Single slider](#single-slider)
* [Multiple slider](#multiple-slider)
* [Tooltip formatting](#tooltip-formatting)
* [Tooltip mergin](#tooltip-merging)
* [Vertical slider](#vertical-slider)

### Single slider

``` vue
<template>
  <Slider
    v-model="value"
  />
</template>

<script>
  import Slider from '@vueform/slider'

  export default {
    components: { Slider },
    data: () => ({
      value: 20
    })
  }
</script>
```

[JSFiddle - Example #1](https://jsfiddle.net/u6ty74wz/10/)

### Multiple slider

``` vue
<template>
  <Slider
    v-model="value"
  />
</template>

<script>
  import Slider from '@vueform/slider'

  export default {
    components: { Slider },
    data: () => ({
      value: [20, 40]
    })
  }
</script>
```

[JSFiddle - Example #2](https://jsfiddle.net/u6ty74wz/10/)

### Tooltip formatting

``` vue
<template>
  <Slider
    v-model="value"
    :format="format"
  />
</template>

<script>
  import Slider from '@vueform/slider'

  export default {
    components: { Slider },
    data: () => ({
      value: 20,
      format: function (value) {
        return `€${value}`
      }
    })
  }
</script>
```

[JSFiddle - Example #3](https://jsfiddle.net/u6ty74wz/10/)

### Tooltip merging

``` vue
<template>
  <Slider
    v-model="value"
    :merge="merge"
    :format="format"
  />
</template>

<script>
  import Slider from '@vueform/slider'

  export default {
    components: { Slider },
    data: () => ({
      value: [20, 30, 40],
      merge: 10,
      format: {
        prefix: '$',
        decimals: 2
      }
    })
  }
</script>
```

[JSFiddle - Example #4](https://jsfiddle.net/u6ty74wz/10/)

### Vertical slider

``` vue
<template>
  <Slider
    v-model="value"
  />
</template>

<script>
  import Slider from '@vueform/slider'

  export default {
    components: { Slider },
    data: () => ({
      value: 50,
      orientation: 'vertical',
      direction: 'rtl'
    })
  }
</script>
```

[JSFiddle - Example #5](https://jsfiddle.net/u6ty74wz/10/)

## About Vueform

[Vueform](https://vueform.com?ref=github) streamlines the entire form building process in Vue 2 & 3. It comes with 30+ elements, file uploads, element nesting, 50+ validators, conditions, form steps, i18n including reactive configuration, API access, ESM modules and many more. Check out our [live demos](https://vueform.com?ref=github#demo) or see [all the features](https://vueform.com?ref=github#features) and [sign up for beta](https://vueform.com?ref=github#beta) to get early access.


## License

[MIT](https://github.com/vueform/slider/blob/main/LICENSE.md)