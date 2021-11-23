import { computed, toRefs } from 'composition-api'
import wnumb from 'wnumb'

export default function useTooltip (props, context, dependencies)
{
  const { format, step } = toRefs(props)

  // ============ DEPENDENCIES ============

  const value = dependencies.value
  const classList = dependencies.classList

  // ============== COMPUTED ==============

  // no export
  const tooltipFormat = computed(() => {
    if (!format || !format.value) {
      return wnumb({ decimals: step.value >= 0 ? 0 : 2 })
    }

    if (typeof format.value == 'function') {
      return { to: format.value }
    }

    return wnumb({...format.value})
  })

  const tooltipsFormat = computed(() => {
    return Array.isArray(value.value) ? value.value.map(v => tooltipFormat.value) : tooltipFormat.value
  })

  // =============== METHODS ==============
  
  /* istanbul ignore next */
  const tooltipsMerge = (slider, threshold, separator) => {
    var textIsRtl = getComputedStyle(slider).direction === 'rtl'
    var isRtl = slider.noUiSlider.options.direction === 'rtl'
    var isVertical = slider.noUiSlider.options.orientation === 'vertical'
    var tooltips = slider.noUiSlider.getTooltips()
    var origins = slider.noUiSlider.getOrigins()

    // Move tooltips into the origin element. The default stylesheet handles this.
    tooltips.forEach(function (tooltip, index) {
      if (tooltip) {
        origins[index].appendChild(tooltip)
      }
    })

    slider.noUiSlider.on('update', function (values, handle, unencoded, tap, positions) {
      var pools = [[]]
      var poolPositions = [[]]
      var poolValues = [[]]
      var atPool = 0

      // Assign the first tooltip to the first pool, if the tooltip is configured
      if (tooltips[0]) {
        pools[0][0] = 0
        poolPositions[0][0] = positions[0]
        poolValues[0][0] = tooltipFormat.value.to(parseFloat(values[0]))
      }

      for (var i = 1; i < values.length; i++) {
        if (!tooltips[i] || (values[i] - values[i - 1]) > threshold) {
          atPool++
          pools[atPool] = []
          poolValues[atPool] = []
          poolPositions[atPool] = []
        }

        if (tooltips[i]) {
          pools[atPool].push(i)
          poolValues[atPool].push(tooltipFormat.value.to(parseFloat(values[i])))
          poolPositions[atPool].push(positions[i])
        }
      }

      pools.forEach(function (pool, poolIndex) {
        var handlesInPool = pool.length

        for (var j = 0; j < handlesInPool; j++) {
          var handleNumber = pool[j]

          if (j === handlesInPool - 1) {
            var offset = 0

            poolPositions[poolIndex].forEach(function (value) {
              offset += 1000 - value
            })

            var direction = isVertical ? 'bottom' : 'right'
            var last = isRtl ? 0 : handlesInPool - 1
            var lastOffset = 1000 - poolPositions[poolIndex][last]
            offset = (textIsRtl && !isVertical ? 100 : 0) + (offset / handlesInPool) - lastOffset

            // Center this tooltip over the affected handles
            tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator)
            tooltips[handleNumber].style.display = 'block'
            tooltips[handleNumber].style[direction] = offset + '%'
            if (tooltips[handleNumber].classList.contains(classList.value.tooltipHidden)) {
              tooltips[handleNumber].classList.remove(classList.value.tooltipHidden)
            }
          } else {
            // Hide this tooltip
            tooltips[handleNumber].style.display = 'none'
            tooltips[handleNumber].classList.add(classList.value.tooltipHidden)
          }
        }
      })
    })
  }

  return {
    tooltipsFormat,
    tooltipsMerge,
  }
}