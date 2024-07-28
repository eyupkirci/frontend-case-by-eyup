import { withTV } from 'tailwind-variants/transformer';

const config = withTV({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
      },
      backgroundImage: {
        '2digits-bg': "url('/assets/2digits.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-gradient': 'linear-gradient(to right, #02041f, #03054f, #02043d)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
});

export default config;
