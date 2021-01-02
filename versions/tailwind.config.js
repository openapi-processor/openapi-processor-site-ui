module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.tsx',
      './src/**/*.js',
      './src/**/*.css'
    ],
    options: {
      safelist: ['last:mr-0'],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    margin: ['last'],
    extend: {},
  },
  plugins: [],
}
