module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.tsx',
      './src/**/*.js',
      './src/**/*.css'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
