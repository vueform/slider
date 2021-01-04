import { createSlider, getValue, destroy, findAllComponents, findAll, setProp } from 'unit-test-helpers'
import { nextTick } from 'composition-api'

describe('useSlider', () => {
  describe('slider', () => {
    it('should be slider DOM', () => {
      const slider = createSlider({
        value: 5
      })

      expect(slider.vm.slider.classList.contains('slider-target')).toBe(true)
    })
  })

  describe('slider$', () => {
    it('should be slider instance', () => {
      const slider = createSlider({
        value: 5
      })

      expect(slider.vm.slider$.target).toStrictEqual(slider.vm.slider)
    })
  })

  describe('isRange', () => {
    it('should be false if not range', () => {
      const slider = createSlider({
        value: 5
      })

      expect(slider.vm.isRange).toBe(false)
    })

    it('should be true if range', () => {
      const slider = createSlider({
        value: [5, 10]
      })

      expect(slider.vm.isRange).toBe(true)
    })
  })

  describe('reset', () => {
    it('should reset to initial value when not range', () => {
      const slider = createSlider({
        value: 5
      })

      slider.vm.slider$.set(20)

      slider.vm.reset()

      expect(getValue(slider)).toBe(5)
    })

    it('should reset to initial value when range', () => {
      const slider = createSlider({
        value: [5, 10, 15]
      })

      slider.vm.slider$.set([20, 25, 30])

      slider.vm.reset()

      expect(getValue(slider)).toStrictEqual([5, 10, 15])
    })
  })

  describe('update', () => {
    it('should update when not range', async () => {
      const slider = createSlider({
        value: 5
      })

      slider.vm.update(20)

      await nextTick()

      expect(getValue(slider)).toBe(20)
    })

    it('should update when range', async () => {
      const slider = createSlider({
        value: [5, 10, 15]
      })

      slider.vm.update([20, 25, 30])

      await nextTick()

      expect(getValue(slider)).toStrictEqual([20, 25, 30])
    })
  })

  describe('init', () => {
    it('should init slider with options', async () => {
      const slider = createSlider({
        value: 5,
        min: 10,
        max: 200,
        step: 10,
        orientation: 'vertical',
        direction: 'rtl',
        tooltips: false,
        options: {
          margin: 20
        }
      })

      expect(slider.vm.slider$.target).toStrictEqual(slider.vm.slider)
      expect(slider.vm.slider$.options.range.min).toBe(10)
      expect(slider.vm.slider$.options.range.max).toBe(200)
      expect(slider.vm.slider$.options.step).toBe(10)
      expect(slider.vm.slider$.options.orientation).toBe('vertical')
      expect(slider.vm.slider$.options.direction).toBe('rtl')
      expect(slider.vm.slider$.options.tooltips).toBe(false)
      expect(slider.vm.slider$.options.margin).toBe(20)
      expect(slider.vm.slider$.options.connect).toBe('lower')
    })

    it('should emit change on slider set event', async () => {
      const slider = createSlider({
        value: 5
      })

      slider.vm.slider$.set(20)

      expect(slider.emitted('change')[0][0]).toBe(20)
    })

    it('should emit update on slider update event', async () => {
      const slider = createSlider({
        value: 5
      })

      slider.vm.slider$.set(20)

      expect(slider.emitted('update')[0][0]).toBe(20)
    })
  })

  describe('destroy', () => {
    it('should destroy slider', async () => {
      const slider = createSlider({
        value: 5,
      })

      slider.vm.destroy()

      expect(slider.vm.slider$).toBe(null)
      expect(slider.vm.slider.classList.contains('slider-target')).toBe(false)
    })
  })

  describe('refresh', () => {
    it('should refresh slider', async () => {
      const slider = createSlider({
        value: 5,
      })

      slider.vm.slider$.options.connect = 'upper'

      slider.vm.refresh()

      expect(slider.vm.slider$).not.toBe(null)
      expect(slider.vm.slider.classList.contains('slider-target')).toBe(true)
      expect(slider.vm.slider$.options.connect).toBe('lower')
    })
  })

  describe('onUnmounted', () => {
    it('should destroy on unmounted', async () => {
      const wrapper = createSlider({
        value: 5,
      }, {
        returnRoot: true
      })

      const slider = findAllComponents(wrapper, { name: 'Slider' }).at(0)

      destroy(wrapper)

      expect(slider.vm.slider$).toBe(null)
    })
  })

  describe('watch', () => {
    it('should refresh slider when isRange changes', async () => {
      const slider = createSlider({
        value: 5,
      })

      slider.vm.$parent.value = [10, 20]

      await nextTick()

      expect(slider.vm.isRange).toBe(true)
      expect(slider.vm.slider$.options.start).toStrictEqual([10, 20])
    })

    it('should refresh slider when min changes', async () => {
      const slider = createSlider({
        value: 5,
      })

      setProp(slider, slider.vm.$parent.props, 'min', 3)

      await nextTick()

      expect(slider.vm.min).toBe(3)
      expect(slider.vm.slider$.options.range.min).toStrictEqual(3)
    })

    it('should refresh slider when max changes', async () => {
      const slider = createSlider({
        value: 5,
      })

      setProp(slider, slider.vm.$parent.props, 'max', 50)

      await nextTick()

      expect(slider.vm.max).toBe(50)
      expect(slider.vm.slider$.options.range.max).toStrictEqual(50)
    })

    it('should refresh slider when step changes', async () => {
      const slider = createSlider({
        value: 5,
      })

      setProp(slider, slider.vm.$parent.props, 'step', 5)

      await nextTick()

      expect(slider.vm.step).toBe(5)
      expect(slider.vm.slider$.options.step).toStrictEqual(5)
    })

    it('should refresh slider when orientation changes', async () => {
      const slider = createSlider({
        value: 5,
      })

      setProp(slider, slider.vm.$parent.props, 'orientation', 'vertical')

      await nextTick()

      expect(slider.vm.orientation).toBe('vertical')
      expect(slider.vm.slider$.options.orientation).toStrictEqual('vertical')
    })

    it('should refresh slider when direction changes', async () => {
      const slider = createSlider({
        value: 5,
      })

      setProp(slider, slider.vm.$parent.props, 'direction', 'rtl')

      await nextTick()

      expect(slider.vm.direction).toBe('rtl')
      expect(slider.vm.slider$.options.direction).toStrictEqual('rtl')
    })

    it('should refresh slider when tooltips changes', async () => {
      const slider = createSlider({
        value: 5,
      })

      setProp(slider, slider.vm.$parent.props, 'tooltips', false)

      await nextTick()

      expect(slider.vm.tooltips).toBe(false)
      expect(slider.vm.slider$.options.tooltips).toStrictEqual(false)
    })

    it('should refresh slider when format changes', async () => {
      const slider = createSlider({
        value: 5,
      })

      setProp(slider, slider.vm.$parent.props, 'format', { decimals: 2 })

      await nextTick()

      const tooltip = findAll(slider, `.slider-tooltip`).at(0)

      expect(tooltip.html()).toContain('5.00')
    })

    it('should refresh slider when mergeTooltips changes', async () => {
      const slider = createSlider({
        value: [5, 10],
      })

      setProp(slider, slider.vm.$parent.props, 'mergeTooltips', 10)

      await nextTick()

      const tooltip = findAll(slider, `.slider-tooltip`).at(1)

      expect(tooltip.html()).toContain('5 - 10')
    })

    it('should refresh slider when options changes', async () => {
      const slider = createSlider({
        value: 5,
      })

      setProp(slider, slider.vm.$parent.props, 'options', { margin: 10 })

      await nextTick()

      expect(slider.vm.options).toStrictEqual({ margin: 10 })
      expect(slider.vm.slider$.options.margin).toStrictEqual(10)
    })

    it('should update slider value if v-model changes when not range', async () => {
      const slider = createSlider({
        value: 5,
      })
      
      expect(slider.vm.slider$.get()).toBe(5)

      slider.vm.$parent.value = 10
      await nextTick()
      expect(slider.vm.slider$.get()).toBe(10)

      slider.vm.$parent.value = null
      await nextTick()
      expect(slider.vm.slider$.get()).toBe(0)

      slider.vm.$parent.value = 1
      await nextTick()
      expect(slider.vm.slider$.get()).toBe(1)

      slider.vm.$parent.value = undefined
      await nextTick()
      expect(slider.vm.slider$.get()).toBe(0)

      slider.vm.$parent.value = 1
      await nextTick()
      expect(slider.vm.slider$.get()).toBe(1)

      slider.vm.$parent.value = false
      await nextTick()
      expect(slider.vm.slider$.get()).toBe(0)
    })

    it('should update slider value if v-model changes when range', async () => {
      const slider = createSlider({
        value: [5, 10],
      })
      
      expect(slider.vm.slider$.get()).toStrictEqual([5, 10])

      slider.vm.$parent.value = [15, 20]
      await nextTick()
      expect(slider.vm.slider$.get()).toStrictEqual([15, 20])

      slider.vm.$parent.value = null
      await nextTick()
      expect(slider.vm.slider$.get()).toStrictEqual(0)

      slider.vm.$parent.value = [1, 2]
      await nextTick()
      expect(slider.vm.slider$.get()).toStrictEqual([1, 2])

      slider.vm.$parent.value = undefined
      await nextTick()
      expect(slider.vm.slider$.get()).toStrictEqual(0)

      slider.vm.$parent.value = [1, 2]
      await nextTick()
      expect(slider.vm.slider$.get()).toStrictEqual([1, 2])

      slider.vm.$parent.value = false
      await nextTick()
      expect(slider.vm.slider$.get()).toStrictEqual(0)
    })
  })
})