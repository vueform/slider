import { computed, ref, toRefs } from 'vue'

export default function useClasses (props, context, dependencies)
{
  const { 
    classes: classes_, showTooltip, tooltipPosition, orientation,
  } = toRefs(props)

  // ============== COMPUTED ==============

  const classes = computed(() => ({
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
    handleLower: 'slider-handle-lower',
    handleUpper: 'slider-handle-upper',
    touchArea: 'slider-touch-area',
    tooltip: 'slider-tooltip',
    tooltipTop: 'slider-tooltip-top',
    tooltipBottom: 'slider-tooltip-bottom',
    tooltipLeft: 'slider-tooltip-left',
    tooltipRight: 'slider-tooltip-right',
    tooltipHidden: 'slider-tooltip-hidden',
    active: 'slider-active',
    draggable: 'slider-draggable',
    tap: 'slider-state-tap',
    drag: 'slider-state-drag',

    // Unimplemented
    pips: 'slider-pips',
    pipsHorizontal: 'slider-pips-horizontal',
    pipsVertical: 'slider-pips-vertical',
    marker: 'slider-marker',
    markerHorizontal: 'slider-marker-horizontal',
    markerVertical: 'slider-marker-vertical',
    markerNormal: 'slider-marker-normal',
    markerLarge: 'slider-marker-large',
    markerSub: 'slider-marker-sub',
    value: 'slider-value',
    valueHorizontal: 'slider-value-horizontal',
    valueVertical: 'slider-value-vertical',
    valueNormal: 'slider-value-normal',
    valueLarge: 'slider-value-large',
    valueSub: 'slider-value-sub',
    
    ...classes_.value,
  }))

  const classList = computed(() => {
    const classList = { ...classes.value }

    Object.keys(classList).forEach((className) => {
      classList[className] = Array.isArray(classList[className]) ? classList[className].filter(c => c!==null).join(' ') : classList[className]
    })

    if (showTooltip.value !== 'always') {
      classList.target += ` ${showTooltip.value === 'drag' ? classList.tooltipDrag : classList.tooltipFocus}`
    }

    if (orientation.value === 'horizontal') {
      classList.tooltip += tooltipPosition.value === 'bottom' ? ` ${classList.tooltipBottom}` : ` ${classList.tooltipTop}`
    }

    if (orientation.value === 'vertical') {
      classList.tooltip += tooltipPosition.value === 'right' ? ` ${classList.tooltipRight}` : ` ${classList.tooltipLeft}`
    }

    return classList
  })

  return {
    classList,
  }
}