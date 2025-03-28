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
      'gradient-to-tl': 'linear-gradient(to top left,rgb(73, 93, 245),rgb(163, 172, 254))',
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

