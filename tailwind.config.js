module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        fb: "#1877f2",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
