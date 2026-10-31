/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        mulberry: { DEFAULT: "#781845", deep: "#5E1236" },
        rose: "#C47B89", terracotta: "#B85C38", cream: "#FFF8F8", blush: "#FFF0F4", espresso: "#2B2125",
      },
      fontFamily: { display: ['"Cormorant Garamond"', "Georgia", "serif"], sans: ["Jost", "system-ui", "sans-serif"] },
      keyframes: {
        rise: { "0%": { opacity: 0, transform: "translateY(28px)" }, "100%": { opacity: 1, transform: "none" } },
        arch: { "0%": { clipPath: "inset(100% 0 0 0 round 999px 999px 0 0)" }, "100%": { clipPath: "inset(0 0 0 0 round 999px 999px 0 0)" } },
        draw: { "0%": { strokeDashoffset: 1 }, "100%": { strokeDashoffset: 0 } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-100%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pagein: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        pop: { "0%": { transform: "scale(1)" }, "40%": { transform: "scale(1.35)" }, "100%": { transform: "scale(1)" } },
      },
      animation: {
        rise: "rise 1s cubic-bezier(.2,.7,.2,1) both",
        arch: "arch 1.4s cubic-bezier(.65,0,.2,1) both",
        draw: "draw 3s ease-in-out .4s both",
        marquee: "marquee 38s linear infinite",
        float: "float 6s ease-in-out infinite",
        spin: "spin 40s linear infinite",
        pagein: "pagein .5s ease both",
        pop: "pop .4s ease",
      },
    },
  },
  plugins: [],
};
