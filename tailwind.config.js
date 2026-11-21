/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF8F3',
        burgundy: { DEFAULT: '#641E32', deep: '#4A1424', soft: '#7D2A43' },
        gold: { DEFAULT: '#B99A63', soft: '#D9C49B' },
        charcoal: '#292725',
        beige: '#EDE5DA',
        mute: '#6B655E',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(14px)' }, '100%': { opacity: '1', transform: 'none' } },
        slideIn: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'none' } },
        slideLeft: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'none' } },
        fade: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pulse2: { '0%,100%': { opacity: '.55' }, '50%': { opacity: '1' } },
      },
      animation: {
        fadeUp: 'fadeUp .8s cubic-bezier(.2,.7,.2,1) both',
        slideIn: 'slideIn .35s cubic-bezier(.2,.8,.2,1) both',
        slideLeft: 'slideLeft .35s cubic-bezier(.2,.8,.2,1) both',
        fade: 'fade .3s ease both',
        pulse2: 'pulse2 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
