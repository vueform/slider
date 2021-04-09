import { ref, computed, toRefs, watch, onMounted, onUnmounted } from 'composition-api'
import nouislider from 'nouislider'
import isNullish from './../utils/isNullish'
import arraysEqual from './../utils/arraysEqual'

export default function useSlider (props, context, dependencies)
{
  const { options, orientation, direction, tooltips, step, min, max, merge, format, id, disabled } = toRefs(props)

  // ============ DEPENDENCIES ============

  const value = dependencies.value
  const initialValue = dependencies.initialValue
  const tooltipsFormat = dependencies.tooltipsFormat
  const tooltipsMerge = dependencies.tooltipsMerge
  const style = dependencies.style

  // ================ DATA ================

  const slider = ref(null)

  const slider$ = ref(null)

  // no export
  const inited = ref(false)

  // ============== COMPUTED ==============

  // no export
  const defaultOptions = computed(() => {
    let defaultOptions = {
      cssPrefix: 'slider-',
      orientation: orientation.value,
      direction: direction.value,
      tooltips: tooltips.value ? tooltipsFormat.value : false,
      connect: 'lower',
      start: isNullish(value.value) ? min.value : value.value,
      range: {
        'min': min.value,
        'max': max.value
      }
    }

    if (step.value > 0) {
      defaultOptions.step = step.value
    }

    if (Array.isArray(value.value)) {
      defaultOptions.connect = true
    }

    return defaultOptions
  })

  const sliderProps = computed(() => {
    let sliderProps = {
      id: id.value,
      style: style.value,
    }

    if (disabled.value) {
      sliderProps.disabled = true
    }

    return sliderProps
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
      ? sliderValue.map(v => parseFloat(v))
      : parseFloat(sliderValue)
  }

  const update = (val, triggerChange = true) => {
    slider$.value.set(val, triggerChange)
  }

  // no export
  const updateValue = (val) => {
    context.emit('input', val)
    context.emit('update:modelValue', val)
    context.emit('update', val)
  }

  const init = () => {
    slider$.value = nouislider.create(slider.value, Object.assign({}, defaultOptions.value, options.value))

    if (tooltips.value && isRange.value && merge.value >= 0) {
      tooltipsMerge(slider.value, merge.value, ' - ')
    }

    slider$.value.on('set', (val) => {
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

  const refresh = () => {
    inited.value = false
    destroy()
    init()
  }

  // ================ HOOKS ===============

  onMounted(init)
  onUnmounted(destroy)

  // ============== WATCHERS ==============

  watch(isRange, refresh, { immediate: false })
  watch(min, refresh, { immediate: false })
  watch(max, refresh, { immediate: false })
  watch(step, refresh, { immediate: false })
  watch(orientation, refresh, { immediate: false })
  watch(direction, refresh, { immediate: false })
  watch(tooltips, refresh, { immediate: false })
  watch(format, refresh, { immediate: false, deep: true })
  watch(merge, refresh, { immediate: false })
  watch(options, refresh, { immediate: false, deep: true })

  watch(value, (newValue) => {
    if (isNullish(newValue)) {
      update(min.value, false)
      return
    }

    if ((isRange.value && !arraysEqual(newValue, getSliderValue())) || (!isRange.value && newValue != getSliderValue())) {
      update(newValue, false)
    }
  }, { deep: true })

  return {
    slider,
    slider$,
    isRange,
    sliderProps,
    init,
    destroy,
    refresh,
    update,
    reset,
  }
}