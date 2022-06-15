/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors : {
      transparent: 'transparent',
      current: 'currentColor',
      moderate_blue : 'hsl(238, 40%, 52%)',
      soft_red : 'hsl(358, 79%, 66%)',
      light_grayish_blue : 'hsl(239, 57%, 85%)',
      pale_red : 'hsl(357, 100%, 86%)',
      dark_blue: 'hsl(212, 24%, 26%)',
      grayish_blue: 'hsl(211, 10%, 45%)',
      light_gray: 'hsl(223, 19%, 93%)',
      very_light_gray: 'hsl(228, 33%, 97%)',
      white: 'hsl(0, 0%, 100%)'

    },
    extend: {
      fontFamily : {
        'body': ['"Rubik"', '"sans-serif"'],
      }
    },
  },
  plugins: [],
}
