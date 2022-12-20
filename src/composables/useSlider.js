import { ref, computed, toRefs, watch, onMounted, onUnmounted, nextTick } from 'vue'
import nouislider from 'nouislider'
import isNullish from './../utils/isNullish'
import arraysEqual from './../utils/arraysEqual'

export default function useSlider (props, context, dependencies)
{
  const {
    orientation, direction, tooltips, step,
    min, max, merge, id, disabled, options,
    classes, format, lazy, ariaLabelledby,
    aria,
  } = toRefs(props)

  // ============ DEPENDENCIES ============

  const value = dependencies.value
  const initialValue = dependencies.initialValue
  const tooltipsFormat = dependencies.tooltipsFormat
  const tooltipsMerge = dependencies.tooltipsMerge
  const tooltipFormat = dependencies.tooltipFormat
  const classList = dependencies.classList

  // ================ DATA ================

  const slider = ref(null)

  const slider$ = ref(null)

  // no export
  const inited = ref(false)

  // ============== COMPUTED ==============

  // no export
  const defaultOptions = computed(() => {
    let defaultOptions = {
      cssPrefix: '',
      cssClasses: classList.value,
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

    if ((ariaLabelledby && ariaLabelledby.value) || (aria && Object.keys(aria.value).length)) {
      let handles = Array.isArray(value.value) ? value.value : [value.value]

      defaultOptions.handleAttributes = handles.map(h => (Object.assign({}, aria.value, ariaLabelledby && ariaLabelledby.value ? {
        'aria-labelledby': ariaLabelledby.value,
      }: {})))
    }

    if (format.value) {
      defaultOptions.ariaFormat = tooltipFormat.value
    }

    return defaultOptions
  })

  const sliderProps = computed(() => {
    let sliderProps = {
      id: id && id.value ? id.value : undefined,
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

    slider$.value.on('set', () => {
      const sliderValue = getSliderValue()

      context.emit('change', sliderValue)
      context.emit('set', sliderValue)

      /* istanbul ignore else */
      if (lazy.value) {
        updateValue(sliderValue)
      }
    })

    slider$.value.on('update', () => {
      if (!inited.value) {
        return
      }

      const sliderValue = getSliderValue()

      if ((isRange.value && arraysEqual(value.value, sliderValue)) || (!isRange.value && value.value == sliderValue)) {
        context.emit('update', sliderValue)
        // Required because set event is not
        // triggered even though it should be
        return
      }

      if (!lazy.value) {
        updateValue(sliderValue)
      }
    })

    /* istanbul ignore next */
    slider$.value.on('start', () => {
      context.emit('start', getSliderValue())
    })

    /* istanbul ignore next */
    slider$.value.on('end', () => {
      context.emit('end', getSliderValue())
    })

    /* istanbul ignore next */
    slider$.value.on('slide', () => {
      context.emit('slide', getSliderValue())
    })

    /* istanbul ignore next */
    slider$.value.on('drag', () => {
      context.emit('drag', getSliderValue())
    })

    slider.value.querySelectorAll('[data-handle]').forEach((handle) => {
      handle.onblur = () => {
        /* istanbul ignore next */
        if (!slider.value) {
          return
        }

        classList.value.focused.split(' ').forEach((c) => {
          slider.value.classList.remove(c)
        })
      }

      handle.onfocus = () => {
        classList.value.focused.split(' ').forEach((c) => {
          slider.value.classList.add(c)
        })
      }
    })

    inited.value = true
  }

  const destroy = () => {
    slider$.value.off()
    slider$.value.destroy()
    slider$.value = null
  }

  const refresh = (n,o) => {
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
  watch(merge, refresh, { immediate: false })
  watch(format, refresh, { immediate: false, deep: true })
  watch(options, refresh, { immediate: false, deep: true })
  watch(classes, refresh, { immediate: false, deep: true })

  watch(value, (value, old) => {
    // If old was 0, null, undefined, '', false
    if (!old) {
      return
    }

    if (
      // If both old and new has multiple handles
      // and the number of handles decreased
      (typeof old === 'object' && typeof value === 'object' && value && Object.keys(old) > Object.keys(value)) ||

      // If the old had multiple handles but
      // if it decreased to single
      (typeof old === 'object' && typeof value !== 'object') ||

      // Or has no value at all
      isNullish(value)
    ) {
      refresh()
    }
  }, { immediate: false })

  watch(value, (newValue) => {
    if (isNullish(newValue)) {
      update(min.value, false)
      return
    }

    let sliderValue = getSliderValue()

    // couldn't reproduce
    /* istanbul ignore next */
    if (isRange.value && !Array.isArray(sliderValue)) {
      sliderValue = [sliderValue]
    }

    if ((isRange.value && !arraysEqual(newValue, sliderValue)) || (!isRange.value && newValue != sliderValue)) {
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
