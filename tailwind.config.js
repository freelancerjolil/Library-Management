/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#8BC34A',
        tertiary: '#FFC107',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        card: '#F5F5F5',
        textPrimary: '#212121',
        textSecondary: '#757575',
        textDisabled: '#BDBDBD',
        borderLight: '#E0E0E0',
        focusBorder: '#4CAF50',
        success: '#66BB6A',
        warning: '#FFB300',
        error: '#F44336',
        info: '#2196F3',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#4CAF50',
          secondary: '#8BC34A',
          accent: '#FFC107',
          neutral: '#FAFAFA',
          'base-100': '#FFFFFF',
          info: '#2196F3',
          success: '#66BB6A',
          warning: '#FFB300',
          error: '#F44336',
        },
      },
    ],
    darkTheme: 'dark',
  },
};
