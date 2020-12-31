<template>
  <div :id="id" :style="style" ref="slider"></div>
</template>

<script>
  import { ref, computed, toRefs, watch, onMounted, onUnmounted } from 'composition-api'
  import noUiSlider from 'nouislider'
  import wNumb from 'wnumb'
  import isNullish from './utils/isNullish'
  import arraysEqual from './utils/arraysEqual'

  export default {
    name: 'Slider',
    emits: [
      'input', 'update:modelValue', 'update', 'change',
    ],
    props: {
      value: {
        type: [Number, Array],
        required: false,
      },
      modelValue: {
        type: [Number, Array],
        required: false,
      },
      id: {
        type: [String, Number],
        required: false,
        default: 'slider'
      },
      min: {
        type: Number,
        required: false,
        default: 0
      },
      max: {
        type: Number,
        required: false,
        default: 100
      },
      step: {
        type: Number,
        required: false,
        default: 1
      },
      orientation: {
        type: String,
        required: false,
        default: 'horizontal',
      },
      direction: {
        type: String,
        required: false,
        default: 'ltr',
      },
      tooltips: {
        type: Boolean,
        required: false,
        default: true,
      },
      format: {
        type: Function,
        required: false,
      },
      options: {
        type: Object,
        required: false,
        default: () => ({})
      },
      mergeTooltips: {
        type: Number,
        required: false,
        default: 0
      },
      height: {
        type: String,
        required: false,
        default: '300px'
      },
      format: {
        type: Object,
        required: false,
      }
    },
    setup(props, context)
    {
      const { value: baseValue, modelValue, options, orientation, direction,
              tooltips, step, min, max, mergeTooltips, height, format } = toRefs(props)

      // ================ DATA ================

      const slider = ref(null)

      const slider$ = ref(null)

      const value = context.expose !== undefined ? modelValue : baseValue

      const inited = ref(false)

      // ============== COMPUTED ==============

      const tooltipFormat = computed(() => {
        if (!format || !format.value) {
          return { to: v => v, from: v => v }
        }

        if (format.value.display !== undefined || format.value.value !== undefined) {
          if (format.value.display === undefined) {
            throw new Error('Slider format must have `display` property')
          }

          if (format.value.value === undefined) {
            throw new Error('Slider format must have `value` property')
          }

          return { to: format.value.display, from: format.value.value }
        }

        return wNumb(Object.assign({}, format.value))
      })

      const defaultOptions = computed(() => {
        let defaultOptions = {
          cssPrefix: 'slider-',
          orientation: orientation.value,
          tooltips: tooltips.value,
          format: tooltipFormat.value,
          connect: 'lower',
          start: isNullish(value.value) ? min.value : value.value,
          step: step.value,
          range: {
            'min': min.value,
            'max': max.value
          }
        }

        if (Array.isArray(value.value)) {
          defaultOptions.connect = true
        }

        return defaultOptions
      })

      const isRange = computed(() => {
        return Array.isArray(value.value)
      })

      const style = computed(() => {
        return orientation.value == 'vertical'
          ? { height: height.value }
          : []
      })

      // =============== METHODS ==============

      const update = (val) => {
        slider$.value.set(val)
      }

      const updateValue = (val) => {
        context.emit('input', val)
        context.emit('update:modelValue', val)
        context.emit('update', val)
      }

      const getSliderValue = () => {
        return slider$.value.get()
      }

      const tooltipsMerge = (slider, threshold, separator) => {
        var textIsRtl = getComputedStyle(slider).direction === 'rtl'
        var isRtl = slider.noUiSlider.options.direction === 'rtl'
        var isVertical = slider.noUiSlider.options.orientation === 'vertical'
        var tooltips = slider.noUiSlider.getTooltips()
        var origins = slider.noUiSlider.getOrigins()

        // Move tooltips into the origin element. The default stylesheet handles this.
        tooltips.forEach(function (tooltip, index) {
          if (tooltip) {
            origins[index].appendChild(tooltip)
          }
        })

        slider.noUiSlider.on('update', function (values, handle, unencoded, tap, positions) {
          var pools = [[]]
          var poolPositions = [[]]
          var poolValues = [[]]
          var atPool = 0

          // Assign the first tooltip to the first pool, if the tooltip is configured
          if (tooltips[0]) {
            pools[0][0] = 0
            poolPositions[0][0] = positions[0]
            poolValues[0][0] = values[0]
          }

          for (var i = 1; i < positions.length; i++) {
            if (!tooltips[i] || (positions[i] - positions[i - 1]) > threshold) {
              atPool++
              pools[atPool] = []
              poolValues[atPool] = []
              poolPositions[atPool] = []
            }

            if (tooltips[i]) {
              pools[atPool].push(i)
              poolValues[atPool].push(values[i])
              poolPositions[atPool].push(positions[i])
            }
          }

          pools.forEach(function (pool, poolIndex) {
            var handlesInPool = pool.length

            for (var j = 0; j < handlesInPool; j++) {
              var handleNumber = pool[j]

              if (j === handlesInPool - 1) {
                var offset = 0

                poolPositions[poolIndex].forEach(function (value) {
                    offset += 1000 - 10 * value
                })

                var direction = isVertical ? 'bottom' : 'right'
                var last = isRtl ? 0 : handlesInPool - 1
                var lastOffset = 1000 - 10 * poolPositions[poolIndex][last]
                offset = (textIsRtl && !isVertical ? 100 : 0) + (offset / handlesInPool) - lastOffset

                // Center this tooltip over the affected handles
                tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator)
                tooltips[handleNumber].style.display = 'block'
                tooltips[handleNumber].style[direction] = offset + '%'
              } else {
                // Hide this tooltip
                tooltips[handleNumber].style.display = 'none'
              }
            }
          })
        })
      }

      const initSlider = () => {
        slider$.value = noUiSlider.create(slider.value, Object.assign({}, defaultOptions.value, options.value))

        if (tooltips.value && isRange.value && mergeTooltips.value > 0) {
          tooltipsMerge(slider.value, mergeTooltips.value, ' - ')
        }

        slider$.value.on('change', (val) => {
          if (!inited.value) {
            return
          }

          context.emit('change', !isRange.value ? val[0] : val)
        })

        slider$.value.on('update', (val) => {
          if (!inited.value) {
            return
          }

          updateValue(!isRange.value ? val[0] : val)
        })

        inited.value = true
      }

      const destroySlider = () => {
        slider$.value.off()
        slider$.value.destroy()
        slider$.value = null
      }

      const reinitSlider = () => {
        inited.value = false
        destroySlider()
        initSlider()
      }

      // ================ HOOKS ===============

      if (isNullish(value.value)) {
        throw new Error('Slider v-model must not be a Number or Array')
      }

      if (isRange.value && value.value.length == 0) {
        throw new Error('Slider v-model must not be an empty array')
      }

      onMounted(initSlider)
      onUnmounted(destroySlider)

      // ============== WATCHERS ==============

      watch(isRange, reinitSlider, { immediate: false })
      watch(min, reinitSlider, { immediate: false })
      watch(max, reinitSlider, { immediate: false })
      watch(step, reinitSlider, { immediate: false })
      watch(orientation, reinitSlider, { immediate: false })
      watch(direction, reinitSlider, { immediate: false })
      watch(tooltips, reinitSlider, { immediate: false })
      watch(format, reinitSlider, { immediate: false })
      watch(options, reinitSlider, { immediate: false, deep: true })
      watch(mergeTooltips, reinitSlider, { immediate: false })
      watch(format, reinitSlider, { immediate: false, deep: true })

      watch(value, (newValue) => {
        if ((isRange.value && !arraysEqual(newValue, getSliderValue())) || (!isRange.value && newValue != getSliderValue())) {
          update(newValue)
        }
      }, { deep: true })

      return {
        slider,
        slider$,
        update,
        isRange,
        style,
      }
    }
  }
</script>

<style lang="scss">
  .slider-target {
    margin-left: 100px;
  }

  /* Functional styling;
  * These styles are required for noUiSlider to function.
  * You don't need to change these rules to apply your design.
  */
  .slider-target,
  .slider-target * {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-user-select: none;
    -ms-touch-action: none;
    touch-action: none;
    -ms-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .slider-target {
    position: relative;
  }

  .slider-base,
  .slider-connects {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  /* Wrapper for all connect elements.
  */
  .slider-connects {
    overflow: hidden;
    z-index: 0;
  }

  .slider-connect,
  .slider-origin {
    will-change: transform;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    -ms-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    -webkit-transform-style: preserve-3d;
    transform-origin: 0 0;
    transform-style: flat;
  }

  .slider-connect {
    height: 100%;
    width: 100%;
  }
  
  .slider-origin {
    height: 10%;
    width: 10%;
  }

  /* Offset direction
  */
  .slider-txt-dir-rtl.slider-horizontal .slider-origin {
    left: 0;
    right: auto;
  }

  /* Give origins 0 height/width so they don't interfere with clicking the
  * connect elements.
  */
  .slider-vertical .slider-origin {
    width: 0;
  }

  .slider-horizontal .slider-origin {
    height: 0;
  }

  .slider-handle {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
  }

  .slider-touch-area {
    height: 100%;
    width: 100%;
  }

  .slider-state-tap .slider-connect,
  .slider-state-tap .slider-origin {
    -webkit-transition: transform 0.3s;
    transition: transform 0.3s;
  }

  .slider-state-drag * {
    cursor: inherit !important;
  }

  /* Slider size and handle placement;
  */
  .slider-horizontal {
    height: 6px;
  }

  .slider-horizontal .slider-handle {
    width: 16px;
    height: 16px;
    top: -6px;
    right: -8px;
  }
  
  .slider-vertical {
    width: 6px;
    height: 300px;
  }

  .slider-vertical .slider-handle {
    width: 16px;
    height: 16px;
    top: -8px;
    right: -6px;
  }

  .slider-txt-dir-rtl.slider-horizontal .slider-handle {
    left: -8px;
    right: auto;
  }

  /* Styling;
  * Giving the connect element a border radius causes issues with using transform: scale
  */
  .slider-base {
    background-color: #d4e0e7;
    border-radius: 3px;
  }

  .slider-connects {
    border-radius: 3px;
  }

  .slider-connect {
    background: #41b883;
    cursor: pointer;
  }

  /* Handles and cursors;
  */
  .slider-draggable {
    cursor: ew-resize;
  }

  .slider-vertical .slider-draggable {
    cursor: ns-resize;
  }

  .slider-handle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    border: 0;
    right: -8px;
    box-shadow: 0.5px 0.5px 2px 1px rgba(0,0,0,.32);
    cursor: grab;

    &:focus {
      outline: none;
    }
  }

  .slider-active {
    box-shadow: 0.5px 0.5px 2px 1px rgba(0,0,0,.42);
    cursor: grabbing;
  }

  /* Disabled state;
  */

  [disabled] .slider-connect {
    background: #B8B8B8;
  }
  [disabled].slider-target,
  [disabled].slider-handle,
  [disabled] .slider-handle {
    cursor: not-allowed;
  }

  .slider-tooltip {
    position: absolute;
    display: block;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    padding: 2px 5px;
    min-width: 20px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    border: 1px solid #41b883;
    background: #41b883;
  }

  .slider-horizontal .slider-tooltip {
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 24px;

    &:before {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top-color: inherit;
      transform: translate(-50%);
    }
  }

  .slider-vertical .slider-tooltip {
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    top: 50%;
    right: 24px;

    &:before {
      content: "";
      position: absolute;
      right: -10px;
      top: 50%;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-left-color: inherit;
      transform: translateY(-50%);
    }
  }

  .slider-horizontal .slider-origin > .slider-tooltip {
    -webkit-transform: translate(50%, 0);
    transform: translate(50%, 0);
    left: auto;
    bottom: 14px;
  }

  .slider-vertical .slider-origin > .slider-tooltip {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
    top: auto;
    right: 18px;
  }

  /* Base;
  *
  */
  .slider-pips,
  .slider-pips * {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .slider-pips {
    position: absolute;
    color: #999;
  }

  /* Values;
  *
  */
  .slider-value {
    position: absolute;
    white-space: nowrap;
    text-align: center;
  }

  .slider-value-sub {
    color: #ccc;
    font-size: 10px;
  }

  /* Markings;
  *
  */
  .slider-marker {
    position: absolute;
    background: #CCC;
  }

  .slider-marker-sub {
    background: #AAA;
  }

  .slider-marker-large {
    background: #AAA;
  }

  /* Horizontal layout;
  *
  */
  .slider-pips-horizontal {
    padding: 10px 0;
    height: 80px;
    top: 100%;
    left: 0;
    width: 100%;
  }

  .slider-value-horizontal {
    -webkit-transform: translate(-50%, 50%);
    transform: translate(-50%, 50%);

    .slider-rtl & {
      -webkit-transform: translate(50%, 50%);
      transform: translate(50%, 50%);
    }
  }

  .slider-marker-horizontal.slider-marker {
    margin-left: -1px;
    width: 2px;
    height: 5px;
  }

  .slider-marker-horizontal.slider-marker-sub {
    height: 10px;
  }

  .slider-marker-horizontal.slider-marker-large {
    height: 15px;
  }

  /* Vertical layout;
  *
  */
  .slider-pips-vertical {
    padding: 0 10px;
    height: 100%;
    top: 0;
    left: 100%;
  }

  .slider-value-vertical {
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    padding-left: 25px;

    .slider-rtl & {
      -webkit-transform: translate(0, 50%);
      transform: translate(0, 50%);
    }
  }

  .slider-marker-vertical.slider-marker {
    width: 5px;
    height: 2px;
    margin-top: -1px;
  }

  .slider-marker-vertical.slider-marker-sub {
    width: 10px;
  }

  .slider-marker-vertical.slider-marker-large {
    width: 15px;
  }
</style>