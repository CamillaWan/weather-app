/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {

    },
    colors: {
      'white': '#f5f3ff',
      'slate': '#e2e8f0',
      
    },
    extend: {
      backgroundImage: {
      'gradient-to-l': 'linear-gradient(to left,rgb(73, 93, 245),rgb(145, 155, 251))',
      'gradient-to-tl': 'linear-gradient(to top left,rgb(56, 82, 250),rgb(145, 162, 252))',
      },
      backgroundPosition: {
        'bottom-right': 'bottom right',
      },
     
    },
  },
  plugins: [],
}

