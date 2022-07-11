import vue from 'vue-next-rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/Slider.vue',
    output: {
      file: 'dist/slider.js',
      format: 'esm',
    },
    plugins: [
      vue(),
      nodeResolve({
        resolveOnly: ['wnumb', 'nouislider']
      }),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        skipPreflightCheck: true,
      }),
      terser(),
    ],
    external: 'vue',
  },
  {
    input: 'src/Slider.vue',
    output: {
      file: 'dist/slider.global.js',
      format: 'iife',
      name: 'VueformSlider',
      globals: {
        'vue': 'Vue',
      }
    },
    plugins: [
      vue(),
      nodeResolve({
        resolveOnly: ['wnumb', 'nouislider']
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
      }),
      terser()
    ],
    external: ['vue'],
  }
]