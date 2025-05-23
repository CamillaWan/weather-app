/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  safelist: ["bg-Sydney", "bg-Shanghai", "bg-NewYork", "bg-London"],
  theme: {
    fontFamily: {
      square: ["AlimamaFangYuanTiVF-Square", "sans-serif"],
    },
    colors: {
      white: "#ffffff",
      purple: "#742bfc",
      blue: "#495df5",
      slate: "#f8fafc",
    },
    extend: {
      fontSize: {
        xxs: "0.625rem",
        xxxs: "0.5rem",
      },
      backgroundImage: {
        "gradient-to-l":
          "linear-gradient(to left,rgb(73, 93, 245),rgb(145, 155, 251))",
        "gradient-to-tl":
          "linear-gradient(to top left,rgb(56, 82, 250),rgb(145, 162, 252))",
        Sydney: "url(../src/assets/City/Sydney.png)",
        Shanghai: "url(../src/assets/City/Shanghai.png)",
        NewYork: "url(../src/assets/City/Newyork.png)",
        London: "url(../src/assets/City/London.png)",
      },

      backgroundPosition: {
        "bottom-right": "bottom right",
      },
    },
  },
  plugins: [],
};
