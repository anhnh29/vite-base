/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

delete colors['lightBlue']
delete colors['warmGray']
delete colors['trueGray']
delete colors['coolGray']
delete colors['blueGray']
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        blue: {
          110: '#252a3d',
          120: '#1977F2',
        },
        white: {
          50: '#ffffff',
          60: '#f0f1f3',
          70: '#F1F4F9',
          80: '#f0f1f3',
          90: '#0000000f',
        },
        black: {
          60: '#101C2D',
          110: '#00000040',
        },
        gray: {
          60: '#66768E',
          70: '#DDE4EE',
          80: '#414E62',
        },
      },
      height: {
        df: '56px',
      },
      boxShadow: {
        primary:
          'rgba(0, 0, 0, 0.102) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
      },
    },
    screens: {
      '3xl': '1800',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
