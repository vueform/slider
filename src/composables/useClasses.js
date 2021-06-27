import { computed, ref, toRefs } from 'composition-api'

export default function useClasses (props, context, dependencies)
{
  const refs = toRefs(props)
  const showTooltip = ref(refs.showTooltip)
  const classes = {
    target: 'slider-target',
    focused: 'slider-focused',
    tooltipFocus: 'slider-tooltip-focus',
    tooltipDrag: 'slider-tooltip-drag',
    ltr: 'slider-ltr',
    rtl: 'slider-rtl',
    horizontal: 'slider-horizontal',
    vertical: 'slider-vertical',
    textDirectionRtl: 'slider-txt-dir-rtl',
    textDirectionLtr: 'slider-txt-dir-ltr',
    base: 'slider-base',
    connects: 'slider-connects',
    connect: 'slider-connect',
    origin: 'slider-origin',
    handle: 'slider-handle',
    handleUpper: 'slider-handle-upper',
    handleLower: 'slider-handle-lower',
    touchArea: 'slider-touch-area',
    tooltip: 'slider-tooltip',
    tooltipHidden: 'slider-tooltip-hidden',
    active: 'slider-active',
    draggable: 'slider-draggable',
    tap: 'slider-state-tap',
    drag: 'slider-state-drag',
    ...refs.classes.value,
  }

  // ============== COMPUTED ==============

  const classList = computed(() => {
    const classList = { ...classes }

    if (showTooltip.value !== 'always') {
      classList.target += ` ${showTooltip.value === 'drag' ? classList.tooltipDrag : classList.tooltipFocus}`
    }

    return classList
  })

  return {
    classList,
  }
}