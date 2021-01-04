import { createSlider } from 'unit-test-helpers'

describe('Slider', () => {
  describe('id', () => {
    it('should add id attribute to container DOM', async () => {
      const slider = createSlider({
        value: 0,
        id: 'my-slider'
      })

      expect(slider.attributes('id')).toBe('my-slider')
    })
  })
})