const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ theme, addBase, addVariant, addUtilities, e }) => {
  const plain = {
    '.cursor-grabbing': {
      cursor: 'grabbing',
    },
    '.touch-none': {
      touchAction: 'none',
    },
    '.tap-highlight-transparent': {
      '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
    },
    '.touch-callout-none': {
      '-webkit-touch-callout': 'none',
    },
    '.will-change-transform': {
      willChange: 'transform',
    },
    '.transform-origin-0': {
      transformOrigin: '0 0',
    },
    '.transform-style-flat': {
      '-webkit-transform-style': 'preserve-3d',
      transformStyle: 'flat',
    },
    '.cursor-inherit': {
      cursor: 'inherit',
    },
    '.cursor-ew-resize': {
      cursor: 'ew-resize',
    },
    [`.slider-vertical .${e('v:cursor-ns-resize')}`]: {
      cursor: 'ns-resize',
    },
    [`.slider-vertical .${e('v:arrow-right')}:before`]: {
      content: '""',
      position: 'absolute',
      right: '-10px',
      top: '50%',
      width: '0',
      height: '0',
      border: '5px solid transparent',
      borderLeftColor: 'inherit',
      transform: 'translateY(-50%)',
    },
    [`.slider-horizontal .${e('h:arrow-bottom')}:before`]: {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      width: '0',
      height: '0',
      border: '5px solid transparent',
      borderTopColor: 'inherit',
      transform: 'translate(-50%)',
    },
  }

  addUtilities(plain)

  addVariant('h', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.slider-horizontal .${e(`h${separator}${className}`)}`
    })
  })

  addVariant('v', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.slider-vertical .${e(`v${separator}${className}`)}`
    })
  })

  addVariant('merge-h', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.slider-horizontal .slider-origin > .${e(`merge-h${separator}${className}`)}`
    })
  })

  addVariant('merge-v', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.slider-vertical .slider-origin > .${e(`merge-v${separator}${className}`)}`
    })
  })

  addVariant('h-txt-rtl', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.slider-horizontal.slider-txt-rtl .${e(`h-txt-rtl${separator}${className}`)}`
    })
  })

  addVariant('tap', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.slider-tap .${e(`tap${separator}${className}`)}`
    })
  })

  addVariant('disabled', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `[disabled] .${e(`disabled${separator}${className}`)}`
    })
  })
}, {
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      borderColor: ['disabled'],
      height: ['h', 'v'],
      width: ['h', 'v'],
      inset: ['h', 'v', 'h-txt-rtl', 'merge-h', 'merge-v'],
      translate: ['h', 'v', 'merge-h', 'merge-v'],
      transitionProperty: ['tap'],
      transitionDuration: ['tap'],
    }
  },
  theme: {
    extend: {
      zIndex: {
        1: 1,
      },
      width: {
        '1\/10': '10%',
      },
      height: {
        '1\/10': '10%',
      },
      minWidth: {
        5: '1.25rem',
      },
      inset: {
        '-1.25': '-0.3125rem'
      },
      boxShadow: {
        slider: '0.5px 0.5px 2px 1px rgba(0,0,0,.32)',
        'slider-active': '0.5px 0.5px 2px 1px rgba(0,0,0,.42)',
      }
    }
  }
})