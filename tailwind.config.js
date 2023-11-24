import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
export default withMT({
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  safelist: [
    "sm:absolute",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#04050F",
        secondary: "#0E131C",
        tertiary: "#0F141E",
        quaternary: "#151C2A"
      },
      screens: {
        'xs': '448px',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/container-queries')],
});

