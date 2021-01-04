import { ref, toRefs } from 'composition-api'
import isNullish from './../utils/isNullish'

export default function useValue (props, context, dependencies)
{
  const { value: baseValue, modelValue } = toRefs(props)

  // ================ DATA ================
  
  /* istanbul ignore next */
  const value = context.expose !== undefined ? modelValue : baseValue

  const initialValue = ref(value.value)

  // ================ HOOKS ===============

  if (isNullish(value.value)) {
    throw new Error('Slider v-model must be a Number or Array')
  }

  if (Array.isArray(value.value) && value.value.length == 0) {
    throw new Error('Slider v-model must not be an empty array')
  }

  return {
    value,
    initialValue,
  }
}