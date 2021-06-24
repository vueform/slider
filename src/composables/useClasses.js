import { computed, toRefs } from 'composition-api'

export default function useClasses (props, context, dependencies)
{
  const { classes } = toRefs(props)

  // ============== COMPUTED ==============

  const classList = computed(() => {
    return {
      target: 'slider-target',
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
      touchArea: 'slider-touch-area',
      tooltip: 'slider-tooltip',
      active: 'slider-active',
      draggable: 'slider-draggable',
      tap: 'slider-state-tap',
      drag: 'slider-state-drag',
      ...classes.value,
    }
  })

  return {
    classList,
  }
}