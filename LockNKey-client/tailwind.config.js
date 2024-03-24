/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lavender: "#dde2ee",
        gray: "#0f1732",
        darkblue: "#1931bb",
        oldlace: "#fff4e3",
        darkslategray: {
          "100": "#3f465c",
          "200": "#1f2e46",
        },
        "neutral-10": "#486284",
        "neutral-0": "#fff",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        montserrat: "Montserrat",
        "body-small": "'DM Sans'",
      },
      borderRadius: {
        "31xl": "50px",
      },
    },
    fontSize: {
      base: "16px",
      xl: "20px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: true,
  },

};
