<template>
  <div v-bind="sliderProps" ref="slider"></div>
</template>

<script>
  import useValue from './composables/useValue'
  import useClasses from './composables/useClasses'
  import useTooltip from './composables/useTooltip'
  import useSlider from './composables/useSlider'

  /* istanbul ignore next */
  const valueProps = {
    value: {
      validator: function(p) {
        return p => typeof p === 'number' || p instanceof Array || p === null || p === undefined || p === false
      },
      required: false,
    },
    modelValue: {
      validator: function(p) {
        return p => typeof p === 'number' || p instanceof Array || p === null || p === undefined || p === false
      },
      required: false,
    },
  }

  export default {
    name: 'Slider',
    emits: [
      'input', 'update:modelValue', 'update', 'change',
    ],
    props: {
      ...valueProps,
      id: {
        type: [String, Number],
        required: false,
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
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
      options: {
        type: Object,
        required: false,
        default: () => ({})
      },
      merge: {
        type: Number,
        required: false,
        default: -1
      },
      format: {
        type: [Object, Function, Boolean],
        required: false,
        default: null,
      },
      classes: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      showTooltip: {
        type: String,
        required: false,
        default: 'always'
      },
      tooltipPosition: {
        type: String,
        required: false,
        default: null,
      },
      lazy: {
        type: Boolean,
        required: false,
        default: true,
      },
      ariaLabelledby: {
        type: String,
        required: false,
        default: undefined,
      },
      aria: {
        required: false,
        type: Object,
        default: () => ({}),
      },
    },
    setup(props, context)
    {
      // no export
      const value = useValue(props, context)

      const classes = useClasses(props, context)
      const tooltip = useTooltip(props, context, {
        value: value.value,
        classList: classes.classList,
      })

      const slider = useSlider(props, context, {
        value: value.value,
        initialValue: value.initialValue,
        tooltipFormat: tooltip.tooltipFormat,
        tooltipsFormat: tooltip.tooltipsFormat,
        tooltipsMerge: tooltip.tooltipsMerge,
        classList: classes.classList,
      })

      return {
        ...classes,
        ...tooltip,
        ...slider,
      }
    }
  }
</script>