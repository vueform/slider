import { createSlider, getValue, destroy, findAllComponents, findAll, setProp } from 'unit-test-helpers'
import { nextTick } from 'composition-api'

describe('useClasses', () => {
  describe('classList', () => {
    it('should add tooltipFocus to target when showTooltip=focus', () => {
      const slider = createSlider({
        value: 5,
        showTooltip: 'focus'
      })

      expect(slider.vm.slider.classList.contains(slider.vm.classList.tooltipFocus)).toBe(true)
    })

    it('should add tooltipDrag to target when showTooltip=drag', () => {
      const slider = createSlider({
        value: 5,
        showTooltip: 'drag'
      })

      expect(slider.vm.slider.classList.contains(slider.vm.classList.tooltipDrag)).toBe(true)
    })
  })
})