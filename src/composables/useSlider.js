import { ref, computed, toRefs, watch, onMounted, onUnmounted } from 'composition-api'
import noUiSlider from 'nouislider'
import isNullish from './../utils/isNullish'
import arraysEqual from './../utils/arraysEqual'

export default function useSlider (props, context, dependencies)
{
  const { options, orientation, direction, tooltips, step, min, max, mergeTooltips, format } = toRefs(props)

  // ============ DEPENDENCIES ============

  const value = dependencies.value
  const initialValue = dependencies.initialValue
  const tooltipFormat = dependencies.tooltipFormat
  const tooltipsMerge = dependencies.tooltipsMerge

  // ================ DATA ================

  const slider = ref(null)

  const slider$ = ref(null)

  // no export
  const inited = ref(false)

  // ============== COMPUTED ==============

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

  // =============== METHODS ==============

  const reset = () => {
    updateValue(initialValue.value)
  }

  // no export
  const getSliderValue = () => {
    let sliderValue = slider$.value.get()

    return Array.isArray(sliderValue)
      ? sliderValue.map(v => tooltipFormat.value.from(v))
      : tooltipFormat.value.from(sliderValue)
  }

  const update = (val) => {
    slider$.value.set(val)
  }

  // no export
  const updateValue = (val) => {
    context.emit('input', val)
    context.emit('update:modelValue', val)
    context.emit('update', val)
  }

  const init = () => {
    slider$.value = noUiSlider.create(slider.value, Object.assign({}, defaultOptions.value, options.value))

    if (tooltips.value && isRange.value && mergeTooltips.value > 0) {
      tooltipsMerge(slider.value, mergeTooltips.value, ' - ')
    }

    slider$.value.on('change', (val) => {
      if (!inited.value) {
        return
      }

      context.emit('change', getSliderValue())
    })

    slider$.value.on('update', (val) => {
      if (!inited.value) {
        return
      }

      updateValue(getSliderValue())
    })

    inited.value = true
  }

  const destroy = () => {
    slider$.value.off()
    slider$.value.destroy()
    slider$.value = null
  }

  const reinit = () => {
    inited.value = false
    destroy()
    init()
  }

  // ================ HOOKS ===============

  onMounted(init)
  onUnmounted(destroy)

  // ============== WATCHERS ==============

  watch(isRange, reinit, { immediate: false })
  watch(min, reinit, { immediate: false })
  watch(max, reinit, { immediate: false })
  watch(step, reinit, { immediate: false })
  watch(orientation, reinit, { immediate: false })
  watch(direction, reinit, { immediate: false })
  watch(tooltips, reinit, { immediate: false })
  watch(format, reinit, { immediate: false })
  watch(options, reinit, { immediate: false, deep: true })
  watch(mergeTooltips, reinit, { immediate: false })
  watch(format, reinit, { immediate: false, deep: true })

  watch(value, (newValue) => {
    if ((isRange.value && !arraysEqual(newValue, getSliderValue())) || (!isRange.value && newValue != getSliderValue())) {
      update(newValue)
    }
  }, { deep: true })

  return {
    slider,
    slider$,
    isRange,
    init,
    destroy,
    reinit,
    reset,
  }
}