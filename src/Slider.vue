<template>
  <div v-bind="sliderProps" ref="slider"></div>
</template>

<script>
  import useValue from './composables/useValue'
  import useStyle from './composables/useStyle'
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
        default: 'slider'
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
      height: {
        type: String,
        required: false,
        default: '300px'
      },
      format: {
        type: [Object, Function, Boolean],
        required: false,
        default: null,
      },
    },
    setup(props, context)
    {
      // no export
      const value = useValue(props, context)

      const style = useStyle(props, context)
      const tooltip = useTooltip(props, context, {
        value: value.value,
      })

      const slider = useSlider(props, context, {
        value: value.value,
        initialValue: value.initialValue,
        tooltipsFormat: tooltip.tooltipsFormat,
        tooltipsMerge: tooltip.tooltipsMerge,
        style: style.style,
      })

      return {
        ...style,
        ...tooltip,
        ...slider,
      }
    }
  }
</script>