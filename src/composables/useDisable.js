import { computed } from 'composition-api'

export default function useDisable (props, context, dependencies)
{
  // ============ DEPENDENCIES ============

  const slider = dependencies.slider

  // ============== COMPUTED ==============

  const disabled = computed(() => {
    return slider.value.getAttribute('disabled') == 'true'
  })

  // =============== METHODS ==============

  const disable = () => {
    slider.value.setAttribute('disabled', true)
  }

  const enable = () => {
    slider.value.removeAttribute('disabled')
  }

  return {
    disabled,
    disable,
    enable,
  }
}