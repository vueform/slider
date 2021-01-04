import vue from 'vue-next-rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
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
      alias({
        entries: [
          { find: 'composition-api', replacement: 'vue' },
        ]
      }),
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
        'composition-api': 'Vue',
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
    external: ['composition-api', 'vue'],
  }
]