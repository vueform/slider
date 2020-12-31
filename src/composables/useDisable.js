import { ref } from 'composition-api'

export default function useDisable (props, context, dependencies)
{
  // ============ DEPENDENCIES ============

  const slider = dependencies.slider

  // ================ DATA ================

  const disabled = ref(false)

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