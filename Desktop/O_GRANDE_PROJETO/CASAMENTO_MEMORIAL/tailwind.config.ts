import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Gama Design System
        'gama-primary': '#88CE11',
        'gama-dark': '#161616',
        'gama-darker': '#0F0F0F',
        'gama-surface': '#272727',
        'gama-surface-accent': '#3F3F3F',
        'gama-text': '#FFFFFF',
        'gama-text-secondary': '#A1A1AA',
        'gama-success': '#10B981',
        'gama-warning': '#F59E0B',
        'gama-error': '#E11D48',
        'gama-info': '#3B82F6',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      animation: {
        'gama-glow': 'gama-glow 2s ease-in-out infinite',
        'gama-float': 'gama-float 4s ease-in-out infinite',
        'gama-pulse': 'gama-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gama-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(136, 206, 17, 0.3))' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(136, 206, 17, 0.8))' },
        },
        'gama-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gama-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
export default config
