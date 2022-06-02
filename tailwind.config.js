module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '360px',
        'sm': '420px',
      },
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'background': "url('/background.png')",
      },
      colors: {
        brand: {
          300: '#FF9979',
          500: '#F57D58',
          700: '#F25C2F',
        },
        green: {
          500: '#04D361',
        },
        neutral: {
          200: '#e1e1e6',
          800: '#202024',
          900: '#121214'
        }
      },
      dropShadow: {
        'ticket': '0 0 48px rgba(245, 125, 88, 0.25)',
      }
    },
  },
  plugins: [],
}
