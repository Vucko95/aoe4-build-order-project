/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        13: "3.25rem", // adjust the value as needed
      },  
      margin: {
        'top-13': '53.5px',
      },
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        slideRight: "slideRight 2s ease-in-out",
      },
    },
  },
  plugins: [],
};

module.exports = config;
