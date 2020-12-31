import { computed, toRefs } from 'composition-api'

export default function useStyle (props, context, dependencies)
{
  const { orientation, height } = toRefs(props)

  // ============== COMPUTED ==============

  const style = computed(() => {
    return orientation.value == 'vertical'
      ? { height: height.value }
      : []
  })

  return {
    style,
  }
}