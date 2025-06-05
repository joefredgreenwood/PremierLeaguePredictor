/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#1e40af", // e.g. blue-800
          foreground: "#ffffff", // e.g. white
        },
        secondary: {
          DEFAULT: "#f59e0b", // e.g. amber-500
          foreground: "#1e293b", // e.g. slate-800
        },
      },
    },
  },
  plugins: [],
};
