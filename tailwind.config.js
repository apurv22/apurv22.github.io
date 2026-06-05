/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#E63946',
          dark: '#C42E3A',
        },
        // Palette: #E63946 #F1FAEE #A8DADC #457B9D #1D3557
        // Override the slate scale so existing slate-* classes adopt the new
        // navy -> off-white dark theme with no per-component edits.
        slate: {
          50: '#F8FCF6',
          100: '#F1FAEE',
          200: '#DCF0F0',
          300: '#C9E4E7',
          400: '#A8DADC',
          500: '#7BA7C0',
          600: '#5B8FAE',
          700: '#457B9D',
          800: '#274B6D',
          900: '#1D3557',
          950: '#142539',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
