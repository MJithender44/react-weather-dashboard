/** @format */

module.exports = {
    content: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx'],
    darkMode: 'media',
    prefix: '',
    important: false,
    separator: ':',
    theme: {
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        light: '#F7f8f9',
        dark: '#181818',
        sun: '#E7AB4D',
        react: '#2acef7',
        heart: '#ed2324',
        toggle: '#ffa500',
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        red: {
          400: '#fc8181',
          700: '#c53030',
        },
        orange: {
          500: '#ed8936',
          600: '#dd6b20',
          700: '#c05621',
        },
        teal: {
          600: '#319795',
          700: '#2c7a7b',
          900: '#234e52',
        },
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        default: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '2rem',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SpaceGrotesk"',
          '"Lato"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: [
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
    },
  }  