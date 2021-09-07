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

    it('should add tooltipTop when orientation=horizontal', () => {
      const slider = createSlider({
        value: 5,
        orientation: 'horizontal'
      })

      expect(slider.vm.classList.tooltip.indexOf(slider.vm.classList.tooltipTop) !== -1).toBe(true)
    })

    it('should add tooltipBottom when orientation=horizontal & tooltipDirection=bottom', () => {
      const slider = createSlider({
        value: 5,
        orientation: 'horizontal',
        tooltipDirection: 'bottom'
      })

      expect(slider.vm.classList.tooltip.indexOf(slider.vm.classList.tooltipBottom) !== -1).toBe(true)
    })

    it('should add tooltipTop when orientation=horizontal & tooltipDirection=left', () => {
      const slider = createSlider({
        value: 5,
        orientation: 'horizontal',
        tooltipDirection: 'left'
      })

      expect(slider.vm.classList.tooltip.indexOf(slider.vm.classList.tooltipTop) !== -1).toBe(true)
    })

    it('should add tooltipLeft when orientation=vertical', () => {
      const slider = createSlider({
        value: 5,
        orientation: 'vertical'
      })

      expect(slider.vm.classList.tooltip.indexOf(slider.vm.classList.tooltipLeft) !== -1).toBe(true)
    })

    it('should add tooltipRight when orientation=vertical & tooltipDirection=right', () => {
      const slider = createSlider({
        value: 5,
        orientation: 'vertical',
        tooltipDirection: 'right'
      })

      expect(slider.vm.classList.tooltip.indexOf(slider.vm.classList.tooltipRight) !== -1).toBe(true)
    })

    it('should add tooltipLeft when orientation=vertical & tooltipDirection=top', () => {
      const slider = createSlider({
        value: 5,
        orientation: 'vertical',
        tooltipDirection: 'top'
      })

      expect(slider.vm.classList.tooltip.indexOf(slider.vm.classList.tooltipLeft) !== -1).toBe(true)
    })
  })
})