import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': {
          50: '#E8E6DC',
          100: '#E0DED4',
          200: '#D8D6CC',
          300: '#CECBB8',
          400: '#C4C0A8',
          500: '#DCDCD2',
          600: '#C8C5BB',
          700: '#B0ADA0',
          800: '#98958',
          900: '#807D70',
        },
        cream: {
          50: '#E8E6DC',
          100: '#E0DED4',
          200: '#D8D6CC',
          300: '#CECBB8',
          400: '#C4C0A8',
          500: '#DCDCD2',
          600: '#C8C5BB',
          700: '#B0ADA0',
          800: '#989588',
          900: '#807D70',
        },
        black: {
          50: '#000000',
          100: '#0a0a0a',
          200: '#1a1a1a',
          300: '#2a2a2a',
          400: '#3a3a3a',
          500: '#000000',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        primary: {
          50: '#E8E6DC',
          100: '#E0DED4',
          200: '#D8D6CC',
          300: '#CECBB8',
          400: '#C4C0A8',
          500: '#DCDCD2',
          600: '#C8C5BB',
          700: '#B0ADA0',
          800: '#989588',
          900: '#807D70',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'fadeInUp': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'slideInLeft': 'slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slideInRight': 'slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(220, 220, 210, 0.2), 0 0 10px rgba(220, 220, 210, 0.15)' },
          '100%': { boxShadow: '0 0 10px rgba(220, 220, 210, 0.25), 0 0 20px rgba(220, 220, 210, 0.2), 0 0 30px rgba(220, 220, 210, 0.15)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(40px) scale(0.95)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideInLeft: {
          'from': { opacity: '0', transform: 'translateX(-50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          'from': { opacity: '0', transform: 'translateX(50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

