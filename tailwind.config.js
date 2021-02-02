const colors = require('tailwindcss/colors')

module.exports = {
    darkMode: 'class', // or 'media' or 'class'
    purge: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#261f45',
                'light-blue': colors.lightBlue,
                gray: colors.blueGray,
                cyan: colors.cyan,
            },
          },
    },
    variants: {
        extend: {
            ringWidth: ['hover', 'active', 'focus'],
            borderWidth: ['hover', 'focus'],
            textColor: ['active', 'hover', 'focus', 'disabled'],
            backgroundColor: ['active', 'hover', 'focus', 'disabled'],
        },
    },
    plugins: [],
}
