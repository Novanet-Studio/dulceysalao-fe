import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      sans: ['Lora', 'sans-serif'],
    },
    screens: {
      xs: '340px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1366px',
    },
    container: {
      center: true,
      screens: {
        xs: '330px',
        sm: '520px',
        md: '920px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1690px',
      },
      padding: {
        DEFAULT: '1rem',
      },
    },
    extend: {
      colors: {
        // color-1 (rose-bud-cherry) always be the primary color
        'color-1': {
          DEFAULT: '#7f2346',
          50: '#fcf3f8',
          100: '#fae9f3',
          200: '#f7d3e6',
          300: '#f2afd2',
          400: '#e87eb3',
          500: '#dd5796',
          600: '#cb3776',
          700: '#af275c',
          800: '#91234d',
          900: '#7f2346',
          950: '#4a0d24',
        },

        // color-2 (karry)
        'color-2': {
          DEFAULT: '#ffe8cf',
          50: '#fff6ed',
          100: '#ffe8cf',
          200: '#fed3aa',
          300: '#fdb374',
          400: '#fb883c',
          500: '#f96816',
          600: '#ea4d0c',
          700: '#c2380c',
          800: '#9a2d12',
          900: '#7c2812',
          950: '#431107',
        },

        // color-3 (tan-hide)
        'color-3': {
          DEFAULT: '#ffa168',
          50: '#fff5ed',
          100: '#ffe7d4',
          200: '#ffcca9',
          300: '#ffa168',
          400: '#fe7839',
          500: '#fc5313',
          600: '#ed3909',
          700: '#c52709',
          800: '#9c2010',
          900: '#7e1d10',
          950: '#440c06',
        },

        // color-4 (tangerine)
        'color-4': {
          DEFAULT: '#f88d2b',
          50: '#fff8ed',
          100: '#fff0d5',
          200: '#fdddab',
          300: '#fcc375',
          400: '#fa9f3d',
          500: '#f88d2b',
          600: '#e8680e',
          700: '#c14e0d',
          800: '#993d13',
          900: '#7b3413',
          950: '#431807',
        },

        // color-5 (flame-pea)
        'color-5': {
          DEFAULT: '#e0592a',
          50: '#fdf5ef',
          100: '#fae7da',
          200: '#f5ccb3',
          300: '#eeaa83',
          400: '#e67d51',
          500: '#e0592a',
          600: '#d24624',
          700: '#ae3320',
          800: '#8b2b21',
          900: '#71261d',
          950: '#3d110d',
        },

        // color-6 (swamp-green)
        'color-6': {
          DEFAULT: '#9bae88',
          50: '#f5f7f2',
          100: '#e7ebe0',
          200: '#ced7c3',
          300: '#9bae88',
          400: '#82996e',
          500: '#627b4e',
          600: '#4a613a',
          700: '#3a4d2f',
          800: '#2f3e27',
          900: '#273420',
          950: '#151d11',
        },

        // color-7 (chicago)
        'color-7': {
          default: '#5a5a5a',
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5a5a5a',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        },

        // color-8 (mine-shaft)
        'color-8': {
          DEFAULT: '#282828',
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#282828',
        },

        // color-9 (mercury)
        'color-9': {
          50: '#f7f7f7',
          100: '#e6e7e8',
          200: '#dddee0',
          300: '#c6c8ca',
          400: '#aaadb0',
          500: '#94999d',
          600: '#84878c',
          700: '#767a7f',
          800: '#63666a',
          900: '#525356',
          950: '#343537',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
};
