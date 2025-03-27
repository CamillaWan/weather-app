/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {

    },
    colors: {
      'white': "#f5f3ff",
    },
    extend: {
      backgroundImage: {
      'gradient-to-tl': 'linear-gradient(to top left,rgb(73, 93, 245),rgb(143, 136, 246))',
      'bg-cloud': "url('./assets/bg.png')",
      },
      backgroundPosition: {
        'bottom-right': 'bottom right',
      },
      backgroundSize: {
        'auto': 'auto',
      },
      
    },
  },
  plugins: [],
}

