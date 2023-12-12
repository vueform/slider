## v2.1.10

> `2023-12-12`

### 🐞 Bug Fixes
  - Export definitions.

## v2.1.9

> `2023-10-14`

### 🐞 Bug Fixes
  - Type fixes.

## v2.1.8

> `2023-10-14`

### 🐞 Bug Fixes
  - Type fixes.

## v2.1.7

> `2023-01-13`

### 🐞 Bug Fixes
  - Removed Slider export from index.d.ts #71.

## v2.1.6

> `2022-12-20`

### 🎉 Feature
  - Allow Slider instance without `v-model` #54.
  - Added new events: `@start`, `@end`, `@drag`, `@slide`, `@set` #68.

### 🐞 Bug Fixes
  - Not updating correctly when lazy is `false` if dragged below `0` #60.
  - Conflict with Tailwind CSS disabled prop resolved #67.

## v2.1.5

> `2022-09-26`

### 🎉 Feature
  - Unnecessary ES6 feature removed.

## v2.1.4

> `2022-09-26`

### 🎉 Features
  - A11y improvements.

## v2.1.3

> `2022-09-23`

### 🎉 Features
  - A11y improvements.
  - Added `ariaLabelledby` prop.

## v2.1.2

> `2022-07-22`

### 🐞 Bug Fixes
  - Fix for `tailwind.css`.

## v2.1.1

> `2022-07-11`

### 🎉 Features
  - Vue.js `2.7` compatibility

## v2.1.0

> `2022-07-11`

### 🎉 Features
  - Vue.js `2.7` compatibility

## v2.0.10

> `2022-05-11`

### 🎉 Features
  - Refresh slider when the number of handles change.

## v2.0.9

> `2022-02-26`

### 🎉 Features
  - Added support for `array` classes.

## v2.0.8

> `2021-12-09`

### 🎉 Features
  - Added `lazy` option that prevents updating `v-model` on dragging by default [#32](https://github.com/vueform/slider/issues/32) [#29](https://github.com/vueform/slider/issues/29) [#28](https://github.com/vueform/slider/issues/28).
  - Added `tailwind.css`.

### 🐞 Bug Fixes
  - Wrapped negative multipliers in brackets [#37](https://github.com/vueform/slider/issues/37).

## v2.0.7

> `2021-11-23`

### 🐞 Bug Fixes
  - Resolved `devDependencies` conflict.

## v2.0.6

> `2021-11-23`

### 🎉 Features
  - Followed up `nouislider` CSS changes.

## v2.0.5

> `2021-09-07`

### 🎉 Features
  - **BREAKING**: updated `default.css` classes and `classes` object in general. Please update to the latest, extended version.
  - Updated to latest `nouislider`.
  - Added `tooltipPosition` prop [#23](https://github.com/vueform/slider/issues/23).
  - Added `options` prop.

### 🐞 Bug Fixes
  - Update `classList` on `classes` change.

## v2.0.4

> `2021-08-02`

### 🐞 Bug Fixes
  - index.d.ts import fix.

## v2.0.3

> `2021-06-28`

### 🐞 Bug Fixes
  - Tailwind plugin fix.
  
## v2.0.2

> `2021-06-27`

### 🐞 Bug Fixes
  - Merged to main branch.
  
## v2.0.1

> `2021-06-27`

### 🐞 Bug Fixes
  - Added missing files.

## v2.0.0

> `2021-06-27`

### 🎉 Features
  - **BREAKING**: removed `height` prop & rewritten `default.css`.
  - Added `classes` prop.
  - Added CSS vars.
  - `id` no longer defaults to `undefined` instead of `slider`.
  
## v1.0.5

> `2021-04-09`

### 🐞 Bug Fixes
  - Fixed `:disabled` property ([#9](https://github.com/vueform/slider/issues/9)).

## v1.0.4

> `2021-04-09`

### 🐞 Bug Fixes
  - Fixed `:disabled` property ([#9](https://github.com/vueform/slider/issues/9)).
  - Don't emit change on exogenous change, fix for [#4](https://github.com/vueform/slider/issues/4).

## v1.0.3

> `2021-01-06`

### 🎉 Features
  - Added `disabled` & `id` properties

## v1.0.2

> `2021-01-04`

### 🐞 Bug Fixes
  - `package.json` `browser` property fix

## v1.0.1

> `2021-01-04`

### 🐞 Bug Fixes
  - Example link fixes
  
## v1.0.0

> `2021-01-04`

### 🎉 Features
  - First release