import { ref, toRefs } from 'vue'
import isNullish from './../utils/isNullish'

export default function useValue (props, context, dependencies)
{
  const { value: baseValue, modelValue, min } = toRefs(props)

  // ================ DATA ================
  
  /* istanbul ignore next */
  let value = modelValue && modelValue.value !== undefined ? modelValue : baseValue

  const initialValue = ref(value.value)

  // ================ HOOKS ===============

  if (isNullish(value.value)) {
    value = ref(min.value)
  }

  if (Array.isArray(value.value) && value.value.length == 0) {
    throw new Error('Slider v-model must not be an empty array')
  }

  return {
    value,
    initialValue,
  }
}