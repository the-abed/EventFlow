/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7F4ADD",
        secondary: "#814BDF",
        accent: "#38b3d2",
      },
    },
  },
  plugins: [],
};
