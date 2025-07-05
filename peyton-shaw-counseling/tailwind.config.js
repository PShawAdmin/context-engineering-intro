const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Refined palette: grey-blues, greys, and nudes
        primary: {
          DEFAULT: '#64748B', // Slate blue
          50: '#F1F5F9',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
          800: '#0F172A',
          900: '#020617',
        },
        secondary: {
          DEFAULT: '#CBD5E1', // Misty blue
          light: '#E2E8F0',
          dark: '#94A3B8',
        },
        accent: {
          DEFAULT: '#D4A574', // Clay
          50: '#FAF5F0',
          100: '#F5E6D3',
          200: '#E5C4A1',
          300: '#D4A574',
          400: '#C4946A',
          500: '#B38360',
          600: '#9A6F52',
          700: '#7D5A42',
          800: '#604533',
          900: '#433024',
        },
        // Named colors for specific uses
        slate: {
          DEFAULT: '#64748B',
          50: '#F1F5F9',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
          800: '#0F172A',
          900: '#020617',
        },
        nude: {
          DEFAULT: '#D4A574',
          cream: '#FAF5F0',
          linen: '#F5E6D3',
          sand: '#E5C4A1',
          clay: '#D4A574',
          warm: '#C4946A',
        },
        // Background colors
        background: {
          DEFAULT: '#FAF5F0',
          cream: '#FAF5F0',
          linen: '#F5E6D3',
          dove: '#E2E8F0',
          pearl: '#F8FAFC',
          charcoal: '#1E293B',
        },
        // Text colors
        text: {
          DEFAULT: '#475569',
          charcoal: '#1E293B',
          storm: '#475569',
          slate: '#64748B',
          light: '#94A3B8',
          cream: '#FAF5F0',
        },
        // Grey-blue colors
        'grey-blue': {
          DEFAULT: '#64748B',
          light: '#94A3B8',
          lighter: '#CBD5E1',
          lightest: '#E2E8F0',
        },
        // Grey colors
        'grey': {
          charcoal: '#1E293B',
          storm: '#475569',
        },
        // Override gray with our palette
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'wave': 'wave 8s ease-in-out infinite',
        'gentle-breathe': 'gentleBreathe 12s ease-in-out infinite',
        'subtle-drift': 'subtleDrift 20s ease-in-out infinite',
        'wave-glow': 'waveGlow 4s ease-in-out infinite',
        'gentle-morph': 'gentleMorph 15s ease-in-out infinite',
        'wave-float': 'waveFloat 8s ease-in-out infinite',
        'wave-sway': 'waveSway 10s ease-in-out infinite',
        'rolling-wave': 'rollingWave 20s linear infinite',
        'blob-drift-right': 'blobDriftRight 30s ease-in-out infinite both',
        'blob-drift-left': 'blobDriftLeft 35s ease-in-out infinite both',
        'blob-drift-diagonal-down': 'blobDriftDiagonalDown 40s ease-in-out infinite both',
        'blob-drift-diagonal-up': 'blobDriftDiagonalUp 38s ease-in-out infinite both',
        'blob-drift-vertical': 'blobDriftVertical 25s ease-in-out infinite both',
        'blob-drift-slow': 'blobDriftSlow 50s ease-in-out infinite both',
        'blob-fade-in': 'blobFadeIn 3s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        wave: {
          '0%, 100%': {
            transform: 'scaleY(1) translateY(0)',
          },
          '50%': {
            transform: 'scaleY(1.1) translateY(-2px)',
          },
        },
        gentleBreathe: {
          '0%, 100%': {
            transform: 'translateY(0) scaleY(1)',
          },
          '50%': {
            transform: 'translateY(-2px) scaleY(1.02)',
          },
        },
        subtleDrift: {
          '0%': {
            transform: 'translateX(-30px)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'translateX(30px)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'translateX(-30px)',
            opacity: '0.3',
          },
        },
        waveGlow: {
          '0%, 100%': {
            opacity: '0.1',
            background: 'linear-gradient(180deg, transparent 0%, rgba(226, 232, 240, 0.3) 100%)',
          },
          '50%': {
            opacity: '0.3',
            background: 'linear-gradient(180deg, transparent 0%, rgba(226, 232, 240, 0.5) 100%)',
          },
        },
        gentleMorph: {
          '0%, 100%': {
            opacity: '0.4',
          },
          '50%': {
            opacity: '0.6',
          },
        },
        waveFloat: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
        waveSway: {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0)',
          },
          '25%': {
            transform: 'translateY(-3px) translateX(10px)',
          },
          '75%': {
            transform: 'translateY(-3px) translateX(-10px)',
          },
        },
        rollingWave: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
        blobDriftRight: {
          '0%, 100%': {
            transform: 'translateX(-100px)',
            opacity: '0',
          },
          '20%': {
            opacity: '0.15',
          },
          '50%': {
            transform: 'translateX(50vw)',
            opacity: '0.2',
          },
          '80%': {
            opacity: '0.15',
          },
        },
        blobDriftLeft: {
          '0%, 100%': {
            transform: 'translateX(calc(100vw + 100px))',
            opacity: '0',
          },
          '20%': {
            opacity: '0.125',
          },
          '50%': {
            transform: 'translateX(30vw)',
            opacity: '0.175',
          },
          '80%': {
            opacity: '0.125',
          },
        },
        blobDriftDiagonalDown: {
          '0%, 100%': {
            transform: 'translate(-100px, -100px)',
            opacity: '0',
          },
          '25%': {
            transform: 'translate(25vw, 10vh)',
            opacity: '0.15',
          },
          '50%': {
            transform: 'translate(50vw, 30vh)',
            opacity: '0.175',
          },
          '75%': {
            transform: 'translate(80vw, 50vh)',
            opacity: '0.1',
          },
        },
        blobDriftDiagonalUp: {
          '0%, 100%': {
            transform: 'translate(calc(100vw + 100px), 50vh)',
            opacity: '0',
          },
          '25%': {
            transform: 'translate(70vw, 30vh)',
            opacity: '0.125',
          },
          '50%': {
            transform: 'translate(40vw, 10vh)',
            opacity: '0.15',
          },
          '75%': {
            transform: 'translate(10vw, -10vh)',
            opacity: '0.1',
          },
        },
        blobDriftVertical: {
          '0%, 100%': {
            transform: 'translateY(100vh)',
            opacity: '0',
          },
          '30%': {
            opacity: '0.1',
          },
          '50%': {
            transform: 'translateY(-20vh)',
            opacity: '0.15',
          },
          '70%': {
            opacity: '0.1',
          },
        },
        blobDriftSlow: {
          '0%, 100%': {
            transform: 'translateX(-10vw)',
            opacity: '0',
          },
          '25%': {
            transform: 'translateX(20vw)',
            opacity: '0.125',
          },
          '50%': {
            transform: 'translateX(50vw)',
            opacity: '0.15',
          },
          '75%': {
            transform: 'translateX(80vw)',
            opacity: '0.125',
          },
        },
        blobFadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(30, 41, 59, 0.05)',
        'medium': '0 4px 20px 0 rgba(30, 41, 59, 0.08)',
        'warm': '0 4px 20px 0 rgba(212, 165, 116, 0.15)',
        'clay': '0 4px 15px 0 rgba(212, 165, 116, 0.12)',
      },
      backgroundImage: {
        'pattern-watercolor': 'linear-gradient(135deg, rgba(148, 163, 184, 0.05) 0%, transparent 40%), linear-gradient(225deg, rgba(212, 165, 116, 0.05) 0%, transparent 40%)',
        'pattern-blob': 'radial-gradient(circle at 20% 80%, rgba(212, 165, 116, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(148, 163, 184, 0.1) 0%, transparent 50%)',
        'pattern-grain': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E")',
        'pattern-lines': 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(148, 163, 184, 0.05) 35px, rgba(148, 163, 184, 0.05) 70px)',
        'pattern': 'linear-gradient(135deg, rgba(148, 163, 184, 0.05) 0%, transparent 40%), linear-gradient(225deg, rgba(212, 165, 116, 0.05) 0%, transparent 40%)',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}