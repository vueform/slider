import { createSlider, getValue, findAll, setProp } from 'unit-test-helpers'
import { nextTick } from 'vue'

describe('useTooltip', () => {
  describe('tooltipsFormat', () => {
    it('should have plain number as value & display when not range', async () => {
      const slider = createSlider({
        value: 0
      })

      const tooltip = findAll(slider, `.slider-tooltip`).at(0)

      slider.vm.update(5)

      await nextTick()

      expect(getValue(slider)).toBe(5)
      expect(tooltip.element.innerHTML).toBe('5')
    })

    it('should have plain number as value & display when range', async () => {
      const slider = createSlider({
        value: [0, 1]
      })
      const tooltip0 = findAll(slider, `.slider-tooltip`).at(0)
      const tooltip1 = findAll(slider, `.slider-tooltip`).at(1)

      slider.vm.update([5,10])

      await nextTick()

      expect(getValue(slider)).toStrictEqual([5, 10])
      expect(tooltip0.element.innerHTML).toBe('5')
      expect(tooltip1.element.innerHTML).toBe('10')
    })

    it('should have float(2) number as value & display when step=-1', async () => {
      const slider = createSlider({
        value: 1,
        step: -1
      })

      const tooltip = findAll(slider, `.slider-tooltip`).at(0)

      expect(getValue(slider)).toBe(1)
      expect(tooltip.element.innerHTML).toBe('1.00')

      slider.vm.update(5.21)

      await nextTick()

      expect(getValue(slider)).toBe(5.21)
      expect(tooltip.element.innerHTML).toBe('5.21')
    })

    it('should format display with function', async () => {
      const slider = createSlider({
        value: 1,
        format: v => '$' + v
      })

      const tooltip = findAll(slider, `.slider-tooltip`).at(0)

      expect(getValue(slider)).toBe(1)
      expect(tooltip.element.innerHTML).toBe('$1')

      slider.vm.update(5)

      await nextTick()

      expect(getValue(slider)).toBe(5)
      expect(tooltip.element.innerHTML).toBe('$5')
    })

    it('should format display with wNumb object', async () => {
      const slider = createSlider({
        value: 1,
        format: {
          decimals: 2,
          prefix: '$'
        }
      })

      const tooltip = findAll(slider, `.slider-tooltip`).at(0)

      expect(getValue(slider)).toBe(1)
      expect(tooltip.element.innerHTML).toBe('$1.00')

      slider.vm.update(5)

      await nextTick()

      expect(getValue(slider)).toBe(5)
      expect(tooltip.element.innerHTML).toBe('$5.00')
    })
  })

  describe('tooltipsMerge', () => {
    it('should merge tooltips with default format', async () => {
      const slider = createSlider({
        value: [0, 1],
        merge: 5,
      })
      const tooltip1 = findAll(slider, `.slider-tooltip`).at(1)

      expect(tooltip1.element.innerHTML).toBe('0 - 1')

      slider.vm.update([5,10])

      await nextTick()

      expect(tooltip1.element.innerHTML).toBe('5 - 10')
    })

    it('should merge tooltips with default format when step=-1', async () => {
      const slider = createSlider({
        value: [0, 1],
        merge: 10,
        step: -1
      })
      const tooltip1 = findAll(slider, `.slider-tooltip`).at(1)

      expect(tooltip1.element.innerHTML).toBe('0.00 - 1.00')

      slider.vm.update([5.12,10.21])

      await nextTick()

      expect(tooltip1.element.innerHTML).toBe('5.12 - 10.21')
    })

    it('should merge tooltips with function format', async () => {
      const slider = createSlider({
        value: [0, 1],
        merge: 10,
        format: v => '$' + v
      })
      let tooltip1 = findAll(slider, `.slider-tooltip`).at(1)

      expect(tooltip1.element.innerHTML).toBe('$0 - $1')

      slider.vm.update([5.12,10.21])
      await nextTick()
      expect(tooltip1.element.innerHTML).toBe('$5 - $10')

      setProp(slider, slider.vm.$parent.props, 'step', -1)

      await nextTick()

      tooltip1 = findAll(slider, `.slider-tooltip`).at(1)

      slider.vm.update([5.12,10.21])
      await nextTick()
      expect(tooltip1.element.innerHTML).toBe('$5.12 - $10.21')
    })

    it('should merge tooltips with wNumb object format', async () => {
      const slider = createSlider({
        value: [0, 1],
        merge: 10,
        format: {
          decimals: 2,
          prefix: '$'
        }
      })
      let tooltip1 = findAll(slider, `.slider-tooltip`).at(1)

      expect(tooltip1.element.innerHTML).toBe('$0.00 - $1.00')

      slider.vm.update([5.12,10.21])

      await nextTick()

      expect(tooltip1.element.innerHTML).toBe('$5.00 - $10.00')

      setProp(slider, slider.vm.$parent.props, 'step', -1)

      await nextTick()

      tooltip1 = findAll(slider, `.slider-tooltip`).at(1)

      slider.vm.update([5.12,10.21])
      await nextTick()
      expect(tooltip1.element.innerHTML).toBe('$5.12 - $10.21')
    })
  })
})