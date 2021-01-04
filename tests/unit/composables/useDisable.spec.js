import { createSlider } from 'unit-test-helpers'

describe('useDisable', () => {
  describe('disabled', () => {
    it('should not be disabled by default', () => {
      const slider = createSlider({
        value: 5
      })

      expect(slider.vm.disabled).toBe(false)
    })
  })

  describe('disable', () => {
    it('should be disabled when disable', () => {
      const slider = createSlider({
        value: 5,
      })

      slider.vm.disable()

      expect(slider.vm.disabled).toBe(true)
      expect(slider.vm.slider.getAttribute('disabled')).toBeTruthy()
    })
  })

  describe('enable', () => {
    it('should be enabled when enable', () => {
      const slider = createSlider({
        value: 5,
      })

      slider.vm.disable()
      slider.vm.enable()

      expect(slider.vm.disabled).toBe(false)
      expect(slider.vm.slider.getAttribute('disabled')).toBeFalsy()
    })
  })
})