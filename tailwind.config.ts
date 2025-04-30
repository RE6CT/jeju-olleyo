import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        rollAcross: {
          '0%': { transform: 'translateX(0) rotate(0deg)' },
          '100%': { transform: 'translateX(100vw) rotate(720deg)' },
        },
      },
      animation: {
        rollAcross: 'rollAcross 2.5s linear infinite',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          100: '#FFE0CC',
          200: '#FFC299',
          300: '#FFA366',
          400: '#FF8533',
          500: '#F60',
          600: '#CC5200',
          700: '#993D00',
          800: '#662900',
          900: '#331400',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          100: '#4AE2F7',
          200: '#42CBDE',
          300: '#38ACBC',
          400: '#3195A3',
          500: '#297E8A',
          600: '#216770',
          700: '#1A4F57',
          800: '#12383D',
          900: '#0B2124',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        gray: {
          50: '#F9FAFB',
          100: '#E7EDF0',
          102: '#909090',
          200: '#C7D5DC',
          300: '#A7BDC8',
          400: '#88A6B4',
          500: '#698EA1',
          600: '#537384',
          700: '#3F5864',
          800: '#2B3C45',
          900: '#182126',
        },
        blue: '#3E9BDF',
        red: '#FF0A0A',
        description: '#909090',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },

      // 모양 관련
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '12': '12px',
        '16': '16px',
        '24': '24px',
      },
      boxShadow: {
        button:
          '0px -2px 4px 0px rgba(0, 0, 0, 0.04), 0px 2px 4px 0px rgba(0, 0, 0, 0.04)',
        dropdown: '1px 1px 8px 1px rgba(213, 187, 169, 0.20)',
      },

      // 폰트 관련
      fontFamily: {
        sans: 'var(--font-pretendard)',
      },
      fontSize: {
        '8': ['0.5rem', { lineHeight: '150%' }],
        '9': ['0.5625rem', { lineHeight: '150%' }],
        '10': ['0.625rem', { lineHeight: '150%' }],
        '12': ['0.75rem', { lineHeight: '150%' }],
        '14': ['0.875rem', { lineHeight: '150%' }],
        '16': ['1rem', { lineHeight: '150%' }],
        '18': ['1.125rem', { lineHeight: '150%' }],
        '20': ['1.25rem', { lineHeight: '150%' }],
        '22': ['1.375rem', { lineHeight: '150%' }],
        '24': ['1.5rem', { lineHeight: '150%' }],
        '26': ['1.625rem', { lineHeight: '150%' }],
        '28': ['1.75rem', { lineHeight: '150%' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        'tight-2': '-0.02em',
      },
      backgroundImage: {
        'home-gradient':
          'linear-gradient(180deg, rgba(231, 237, 240, 0.60) 0%, rgba(255, 255, 255, 0.00) 100%)',
      },
      borderWidth: {
        '0.6': '0.6px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
