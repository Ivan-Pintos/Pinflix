/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "slate-900-opacity-80": "rgba(2, 6, 23, 1)",
        "slate-900-opacity-50": "rgba(2, 6, 23, 0.6)",
        "slate-900-opacity-0": "rgba(2, 6, 23,, 0)",
      },
      backgroundImage: (theme) => ({
        "gradient-opacity":
          "linear-gradient(180deg, " +
          theme("colors.slate-900-opacity-80") +
          " 0%, " +
          theme("colors.slate-900-opacity-50") +
          " 80%, " +
          theme("colors.transparent") +
          " 100%)",
      }),
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
};
