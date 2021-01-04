import { mount, createLocalVue } from '@vue/test-utils'
import CompositionApi from 'composition-api'
import Slider from './../../../src/Slider'

export const createSlider = (props = {}, options = {}) => {
  const localVue = createLocalVue()
  localVue.use(CompositionApi)

  let config = {
    localVue,
  }

  if (options.attach) {
    config.attachTo = document.querySelector('body')
  }

  let wrapper = mount({
    data() {
      return {
        value: props.value,
        props: props,
      }
    },
    template: `
      <div>
        <Slider
          v-model="value"
          v-bind="props"
        />
      </div>
    `,
    components: {
      Slider,
    }
  }, config)

  return wrapper.findAllComponents({ name: 'Slider' }).at(0)
}

export const destroy = (wrapper) => {
  wrapper.destroy()
} 

export const findAll = (parent, query) => {
  let res = parent.findAll(query)

  return {
    at: (i) => { return res.at(i) },
    length: res.length,
  }
}

export const getValue = (slider) => {
  return slider.vm.value
}