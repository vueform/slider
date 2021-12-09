<div align="center">
  <a href="https://www.npmjs.com/package/@vueform/slider" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/dm/@vueform/slider?color=%2353ca2f">
  </a>

  <img alt="CircleCI" src="https://img.shields.io/circleci/build/github/vueform/slider">

  <a href="https://codecov.io/gh/vueform/slider" target="_blank">
    <img src="https://img.shields.io/codecov/c/github/vueform/slider"/>
  </a>

  <a href="https://www.npmjs.com/package/@vueform/slider" target="_blank">
    <img alt="npm bundle size (scoped version)" src="https://img.shields.io/bundlephobia/minzip/@vueform/slider?color=53ca2f">
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

## About Vueform

<a href="https://vueform.com?ref=ghb">
  <img align="center" src="https://github.com/vueform/multiselect/raw/main/assets/vueform-banner.png" alt="Vueform" title="Vueform">
</a>

<br>
<br>

Vueform is a comprehensive form builder for Vue.js that makes form development a breeze. It standardizes and handles the entire form building process, including:
- a complete theming and templating system with **Tailwind support** (similar to @vueform libraries)
- 25+ form elements with **multi-file uploads**, date pickers and rich text editor
- element **nesting** and **repeating**
- **50+ validators** with async, dependent and custom rules
- **conditional logic** on element & form level
- breaking forms into **steps** with **form wizard**
- **dynamic** form rendering with **JSON** support
- **translating** form content and global i18n support.

Vueform [pre-release](https://vueform.com) is open for registration for the **first 100 developers** with **special discounts**.

Learn more: [https://vueform.com](https://vueform.com)

## Other libraries

* [@vueform/multiselect](https://github.com/vueform/multiselect) - Vue 3 multiselect component with single select, multiselect and tagging options.
* [@vueform/toggle](https://github.com/vueform/toggle) - Vue 3 toggle component with labels, custom slots and styling options.

## Slider features

* Vue 2 & 3 support
* 100% coverage
* TypeScript support
* ESM support
* Fully configurable
* Single slider
* Multiple sliders
* Tooltips
* Formatting
* CSS vars support
* Tailwind & utility class support
* Based on [noUiSlider](https://github.com/leongersen/noUiSlider)

## Sections

* [Demo](#demo)
* [Installation](#installation)
  * [Using with Vue 3](#using-with-vue-3)
  * [Using with Vue 2](#using-with-vue-2)
  * [Using with Nuxt.js](#using-with-nuxt-js)
* [Support](#support)
* [Configuration](#configuration)
  * [Basic props](#basic-props)
  * [Events](#events)
* [Styling](#styling)
  * [Styling with CSS vars](#styling-with-css-vars)
  * [Styling with Tailwind CSS](#styling-with-tailwind-css)
* [Examples](#examples)
  * [Single slider](#single-slider)
  * [Multiple slider](#multiple-slider)
  * [Tooltip formatting](#tooltip-formatting)
  * [Tooltip merging](#tooltip-merging)
* [License](#license)

## Demo 

Check out our [demo](https://jsfiddle.net/0Lp1bqyv/).

## Installation

```
npm install @vueform/slider
```

### Using with Vue 3

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

### Using with Vue 2

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

### Using with Nuxt.js

First you need install [@nuxtjs/composition-api](https://composition-api.nuxtjs.org/getting-started/setup):

``` bash
npm i @nuxtjs/composition-api --save
```

Then you need to enable it as a module in `nuxt.config.js`:

``` js
{
  buildModules: [
    '@nuxtjs/composition-api/module'
  ]
}
```

After that make sure to change the imported module to Vue 2 version of Slider:

``` js
import Slider from '@vueform/slider/dist/slider.vue2'
```

For more information on using `@nuxtjs/composition-api` read [their documentation](https://composition-api.nuxtjs.org/).

## Support

Join our [Discord channel](https://discord.gg/WhX2nG6GTQ) or [open an issue](https://github.com/vueform/slider/issues).

## Configuration

### Basic props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **id** | `string` | `slider` | The `id` attribute of slider container DOM. |
| **lazy** | `boolean` | `true` | Whether to update `v-model` only when the slider value is set and not while dragging. If enabled you must not use inline objects as props (eg. `format`, `options`, `classes`) but outsource them to a data property. |
| **disabled** | `boolean` | `false` | Whether the slider should be disabled. |
| **min** | `number` | `0` | Minimum value of the slider. |
| **max** | `number` | `100` | Maximum value of the slider. |
| **step** | `number` | `1` | The jump between intervals. If `-1` it enables fractions (eg. `1.23`). |
| **tooltips** | `boolean` | `true` | Whether tooltips should show above handlers. |
| **showTooltip** | `string` | `'always'` | When tooltips should be shown. Possible values: `always\|focus\|drag`. |
| **merge** | `number` | `-1` | The step distance between two handles when their tooltips should be merged (when `step` is `-1` then `1` is assumed). Eg: <br><br> `{ merge: 5, step: 10 }` <br> -> values: `0, <=50` will merge <br> -> values: `0, 60` will not merge <br><br> `{ merge: 5, step: -1 }` <br> -> values: `0, <=5` will merge <br> -> values: `0, 5.01` will not merge  |
| **format** | `object\|function` |  | Formats the tooltip. It can be either a function that receives a `value` param and expects a string or number as return or an object with the following properties: <br> `prefix` - eg `$` -> `$100` <br> `suffix` - eg `USD` -> `100USD` <br> `decimals` - eg `2` -> `100.00`  <br> `thousand` - eg `,` - `1,000` |
| **orientation** | `string` | `'horizontal'` | The orientation of the slider. Possible values: `horizontal\|vertical` |
| **direction** | `string` | `'ltr'` | The direction of the slider. By default value increases *left-to-right* and *top-to-bottom*, which is reversed when using `rtl`. Possible values: `ltr\|rtl` |
| **tooltipPosition** | `string` | `null` | The position of the slider tooltips. Possible values: `null\|'top'\|'bottom'\|'left'\|'right'` depending on `orientation` prop. When `null` it equals to `orientation` default (`'top'` for `'horizontal'` and `'left'` for `'vertical'`). |
| **options** | `object` | `{}` | Additional [options](https://refreshless.com/nouislider/slider-options/) for noUiSlider. |
| **classes** | `object` | | An object of class names that gets merged with the default values. Default:<br>`{`<br>&nbsp;&nbsp;`target: 'slider-target',`<br>&nbsp;&nbsp;`ltr: 'slider-ltr',`<br>&nbsp;&nbsp;`rtl: 'slider-rtl',`<br>&nbsp;&nbsp;`horizontal: 'slider-horizontal',`<br>&nbsp;&nbsp;`vertical: 'slider-vertical',`<br>&nbsp;&nbsp;`textDirectionRtl: 'slider-txt-dir-rtl',`<br>&nbsp;&nbsp;`textDirectionLtr: 'slider-txt-dir-ltr',`<br>&nbsp;&nbsp;`base: 'slider-base',`<br>&nbsp;&nbsp;`connects: 'slider-connects',`<br>&nbsp;&nbsp;`connect: 'slider-connect',`<br>&nbsp;&nbsp;`origin: 'slider-origin',`<br>&nbsp;&nbsp;`handle: 'slider-handle',`<br>&nbsp;&nbsp;`touchArea: 'slider-touch-area',`<br>&nbsp;&nbsp;`tooltip: 'slider-tooltip',`<br>&nbsp;&nbsp;`tooltipTop: 'slider-tooltip-top',`<br>&nbsp;&nbsp;`tooltipBottom: 'slider-tooltip-bottom',`<br>&nbsp;&nbsp;`tooltipLeft: 'slider-tooltip-left',`<br>&nbsp;&nbsp;`tooltipRight: 'slider-tooltip-right',`<br>&nbsp;&nbsp;`active: 'slider-active',`<br>&nbsp;&nbsp;`draggable: 'slider-draggable',`<br>&nbsp;&nbsp;`tap: 'slider-state-tap',`<br>&nbsp;&nbsp;`drag: 'slider-state-drag'`<br>`}` |

<a href="https://vueform.com?ref=ghb">
  <img align="center" src="https://github.com/vueform/multiselect/raw/main/assets/vueform-banner.png" alt="Vueform" title="Vueform">
</a>

### Events

| Event | Attributes | Description |
| --- | --- | --- |
| **@change** | `value` | Emitted when dragging the slider is finished or it's value changed by clicking, keyboard or programmatical set. |
| **@update** | `value` | Emitted in the same scenarios as changed, but also when the slider is being dragged if `lazy` option is disabled. |

## Styling

### Styling with CSS vars

The following CSS variables can be used to customize slider when using `default.css`:

``` css
--slider-bg: #D1D5DB;
--slider-connect-bg: #10B981;
--slider-connect-bg-disabled: #9CA3AF;
--slider-height: 6px;
--slider-vertical-height: 300px;
--slider-radius: 9999px;

--slider-handle-bg: #fff;
--slider-handle-border: 0;
--slider-handle-width: 16px;
--slider-handle-height: 16px;
--slider-handle-radius: 9999px;
--slider-handle-shadow: 0.5px 0.5px 2px 1px rgba(0,0,0,.32);
--slider-handle-shadow-active: 0.5px 0.5px 2px 1px rgba(0,0,0,.42);
--slider-handle-ring-width: 3px;
--slider-handle-ring-color: #10B98130;

--slider-tooltip-font-size: 0.875rem;
--slider-tooltip-line-height: 1.25rem;
--slider-tooltip-font-weight: 600;
--slider-tooltip-min-width: 20px;
--slider-tooltip-bg: #10B981;
--slider-tooltip-bg-disabled: #9CA3AF;
--slider-tooltip-color: #fff;
--slider-tooltip-radius: 5px;
--slider-tooltip-py: 2px;
--slider-tooltip-px: 6px;
--slider-tooltip-arrow-size: 5px;
--slider-tooltip-distance: 3px;
```

Override them globally:

``` css
:root {
  --slider-connect-bg: #3B82F6;
  --slider-tooltip-bg: #3B82F6;
  --slider-handle-ring-color: #3B82F630;
}
```

Or on instance level:

``` vue
<Slider
  v-model="value"
  class="slider-red"
/>

<Slider
  v-model="value"
  class="slider-blue"
/>
```

``` css
.slider-red {
  --slider-connect-bg: #EF4444;
  --slider-tooltip-bg: #EF4444;
  --slider-handle-ring-color: #EF444430;
}

.slider-blue {
  --slider-connect-bg: #3B82F6;
  --slider-tooltip-bg: #3B82F6;
  --slider-handle-ring-color: #3B82F630;
}
```

### Styling with Tailwind CSS

To use the slider with Tailwind CSS you must add it as a plugin to `tailwind.config.js`:

``` js
// tailwind.config.js

module.exports = {
  // ...
  plugins: [
    require('@vueform/slider/tailwind'),
  ]
}
```

This plugin adds certain utilities and variants which are neccessary for the slider but Tailwind does not provide by default.

After that you need to import `themes/tailwind.scss` to you main component:

``` vue
<template>
  <div id="app">
    <Slider ... />
  </div>
</template>

<script>
  // ...
</script>

<style lang="scss">
  @import 'path/to/node_modules/@vueform/slider/themes/tailwind.scss'
</style>
```

#### Using `:classes` prop

Alternatively you can define class names directly by passing them to the `Slider` component via `classes` property. When using this approach you don't need to import `tailwind.scss`. Here's a default styling for Tailwind CSS (the same included in `tailwind.scss`):

``` vue
<Slider v-model="value" :classes="{
  target: 'relative box-border select-none touch-none tap-highlight-transparent touch-callout-none disabled:cursor-not-allowed',
  focused: 'slider-focused',
  tooltipFocus: 'slider-tooltip-focus',
  tooltipDrag: 'slider-tooltip-drag',
  ltr: 'slider-ltr',
  rtl: 'slider-rtl',
  horizontal: 'slider-horizontal h-1.5',
  vertical: 'slider-vertical w-1.5 h-80',
  textDirectionRtl: 'slider-txt-rtl',
  textDirectionLtr: 'slider-txt-ltr',
  base: 'w-full h-full relative z-1 bg-gray-300 rounded',
  connects: 'w-full h-full relative overflow-hidden z-0 rounded',
  connect: 'absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full bg-green-500 cursor-pointer tap:duration-300 tap:transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed',
  origin: 'slider-origin absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full h:h-0 v:-top-full txt-rtl-h:left-0 txt-rtl-h:right-auto v:w-0 tap:duration-300 tap:transition-transform',
  handle: 'absolute rounded-full bg-white border-0 shadow-slider cursor-grab focus:outline-none h:w-4 h:h-4 h:-top-1.5 h:-right-2 txt-rtl-h:-left-2 txt-rtl-h:right-auto v:w-4 v:h-4 v:-top-2 v:-right-1.25 disabled:cursor-not-allowed focus:ring focus:ring-green-500 focus:ring-opacity-30',
  touchArea: 'h-full w-full',
  tooltip: 'absolute block text-sm font-semibold whitespace-nowrap py-1 px-1.5 min-w-5 text-center text-white rounded border border-green-500 bg-green-500 transform h:-translate-x-1/2 h:left-1/2 v:-translate-y-1/2 v:top-1/2 disabled:bg-gray-400 disabled:border-gray-400 merge-h:translate-x-1/2 merge-h:left-auto merge-v:-translate-x-4 merge-v:top-auto tt-focus:hidden tt-focused:block tt-drag:hidden tt-dragging:block',
  tooltipTop: 'bottom-6 h:arrow-bottom merge-h:bottom-3.5',
  tooltipBottom: 'top-6 h:arrow-top merge-h:top-5',
  tooltipLeft: 'right-6 v:arrow-right merge-v:right-1',
  tooltipRight: 'left-6 v:arrow-left merge-v:left-7',
  tooltipHidden: 'slider-tooltip-hidden',
  active: 'slider-active shadow-slider-active cursor-grabbing',
  draggable: 'cursor-ew-resize v:cursor-ns-resize',
  tap: 'slider-state-tap',
  drag: 'slider-state-drag',
}" />
```

There are certain variants that help detecting different states/config of the slider:
* `h` - applied when the slider is horizontal
* `v` - applied when the slider is vertical
* `merge-h` - applied when the slider is horizontal and tooltips are merged
* `merge-v` - applied when the slider is horizontal and tooltips are merged
* `disabled` - applied when the slider is disabled
* `txt-rtl-h` - applied when the slider is horizontal and text direction is set to `rtl`
* `tap` - applied when the slider bar is being taped to jump to certain position
* `tt-focus` - applied when the slider should only display tooltips on focus (`showToolip: 'focus'`) and the slider is not focused
* `tt-focused` - applied when the slider should only display tooltips on focus and the slider is focused
* `tt-drag` - applied when the slider should only display tooltips on drag (`showToolip: 'drag'`) and the slider is not being dragged
* `tt-dragging` - applied when the slider should only display tooltips on drag and the slider is being dragged

The `target` class receives `ltr`, `rtl`, `horizontal`, `vertical`, `textDirectionRtl`, `textDirectionLtr`, `focused`, `tooltipFocus`, `tooltipDrag`, `tap`, and `drag` classes when the related state is applied.

Certain classes do not define any styles (like `.slider-horizontal`, `.slider-vertical`) but only required to detect certain states. If you are changing the class list for any class name make sure to always keep the ones that start with `slider-` to be able to use the utilities mentioned above (`h`, `v`, etc).

In case you need to override the same type of utility you might use [@neojp/tailwind-important-variant](https://www.npmjs.com/package/@neojp/tailwindcss-important-variant) and use eg. `bg-green-500!`.

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

[JSFiddle - Example #1](https://jsfiddle.net/0Lp1bqyv/)

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

[JSFiddle - Example #2](https://jsfiddle.net/0Lp1bqyv/)

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
        return `€${Math.round(value)}`
      }
    })
  }
</script>
```

[JSFiddle - Example #3](https://jsfiddle.net/0Lp1bqyv/)

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

[JSFiddle - Example #4](https://jsfiddle.net/0Lp1bqyv/)

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

[JSFiddle - Example #5](https://jsfiddle.net/0Lp1bqyv/)

## License

[MIT](https://github.com/vueform/slider/blob/main/LICENSE.md)