import { createSlider } from 'unit-test-helpers'

describe('useValue', () => {
  describe('onCreated', () => {
    it('should throw an error if v-model is not an array or number', async () => {
      const originalConsoleError = console.error
      const originalConsoleWarn = console.warn
      console.error = () => {}
      console.warn = () => {}

      expect(() => {
        createSlider({
          value: null
        })
      }).toThrowError()

      console.error = originalConsoleError
      console.warn = originalConsoleWarn
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