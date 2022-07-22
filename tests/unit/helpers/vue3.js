import { mount } from '@vue/test-utils'
import Slider from './../../../src/Slider.vue'

export const createSlider = (props = {}, options = {}) => {
  let config = {}

  document.body.innerHTML = `
    <div>
      <div id="app"></div>
    </div>
  `

  if (options.attach) {
    config.attachTo = document.getElementById('app')
  }

  let wrapper = mount({
    data() {
      return {
        value: props.value,
        props: props
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

  if (options.returnRoot) {
    return wrapper
  }

  return wrapper.findAllComponents({ name: 'Slider' })[0]
}

export const destroy = (wrapper) => {
  wrapper.unmount()
} 

export const findAllComponents = (parent, query) => {
  let res = parent.findAllComponents(query)

  return {
    at: (i) => { return res[i] },
    length: res.length,
  }
}

export const findAll = (parent, query) => {
  let res = parent.findAll(query)

  return {
    at: (i) => { return res[i] },
    length: res.length,
  }
}

export const getValue = (slider) => {
  return slider.vm.modelValue
}

export const setProp = (wrapper, object, prop, value) => {
  object[prop] = value
}