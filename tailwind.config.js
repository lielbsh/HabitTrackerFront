// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Removed darkMode configuration
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html", // Include if you have Tailwind classes in HTML
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors
        background: {
          yellow: '#fffde0',
          green: '#dbdbbb',
          offwhite: '#f3ebd8',
          lightPurple: '#dac0f8', 
        },
        // Primary Colors
        mustard: '#e3921c',
        pink: '#f9a69e',
        greenPrimary: '#afaf8b', 
        grayCustom: '#545454', 
        dark: '#3c3333',
        purple: {
          100: '#ede7f6',
          200: '#d1c4e9',
          300: '#c9a6f1',
          400: '#bc81f3',
          900: '#503e4f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Roboto', 'serif'],
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 10px 15px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.grayCustom'),
            a: {
              color: theme('colors.mustard'),
              '&:hover': {
                color: theme('colors.dark'),
              },
            },
            h1: {
              color: theme('colors.dark'),
            },
            h2: {
              color: theme('colors.dark'),
            },
            // Additional typography styles...
          },
        },
        // Removed 'dark' variant
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
