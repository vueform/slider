import { createSlider, getValue } from 'unit-test-helpers'

describe('useValue', () => {
  describe('onCreated', () => {
    it('should set v-model as min value is not an array or number', async () => {
      const slider = createSlider({
        value: null,
        min: 5
      })

      expect(slider.vm.slider$.get()).toBe('5.00')
    })

    it('should throw an error if v-model is an empty array', async () => {
      const originalConsoleError = console.error
      const originalConsoleWarn = console.warn
      console.error = () => {}
      console.warn = () => {}

      expect(() => {
        createSlider({
          value: []
        })
      }).toThrowError()

      console.error = originalConsoleError
      console.warn = originalConsoleWarn
    })
  })
})