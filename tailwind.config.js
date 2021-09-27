module.exports = {
  purge: {
    mode: "all",
    content: ["./src/pages/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
    options: {
      safelist: [
        /data-theme$/,
      ]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily:{
      'arvo':['Arvo', 'serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui:{
    styled: true,
    themes: true
  }
}
