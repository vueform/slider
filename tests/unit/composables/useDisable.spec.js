import { createSlider } from 'unit-test-helpers'

describe('useDisable', () => {
  it('should not be disabled by default', () => {
    const slider = createSlider({
      value: 5
    })

    expect(slider.vm.disabled).toBe(false)
  })

  it('should be disabled when disable', () => {
    const slider = createSlider({
      value: 5,
    })

    slider.vm.disable()

    expect(slider.vm.disabled).toBe(true)
    expect(slider.vm.slider.getAttribute('disabled')).toBeTruthy()
  })

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