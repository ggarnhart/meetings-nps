module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "screen-80": "80vh",
      },
      width: {
        "screen-80": "80vw",
        "screen-90": "90vw",
        "screen-95": "95vw",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
