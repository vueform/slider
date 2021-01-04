import { createSlider } from 'unit-test-helpers'

describe('useStyle', () => {
  describe('style', () => {
    it('should not have height when horizontal', () => {
      const slider = createSlider({
        value: 5
      })

      expect(slider.vm.slider.style.height).toBe('')
    })

    it('should have height equal to height when vertical', () => {
      const slider = createSlider({
        value: 5,
        height: '330px',
        orientation: 'vertical',
      })

      expect(slider.vm.slider.style.height).toBe('330px')
    })
  })
})