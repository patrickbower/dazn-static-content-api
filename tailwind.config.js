/**
 * Extending Tailwind with DAZN Styles
 *
 * These will override or extend tailwind:
 * https://tailwindcss.com/docs/configuration
 *
 * DAZN styles from prod and packages, notably:
 * @dazn/discovery-web-module-styles
 */

// import default theme object to overwrite (not extend) some defaults
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./src/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "var(--screen-sm)",
      md: "var(--screen-md)",
      lg: "var(--screen-lg)",
      xl: "var(--screen-xl)",
      ...defaultTheme.screens,
    },
    extend: {
      borderWidth: {
        3: "3px",
        6: "6px",
        10: "10px",
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      gridTemplateColumns: {
        15: "var(--grid-template-columns-15)",
      },
      container: {
        center: true,
      },
      colors: {
        tarmac: "var(--colour-tarmac)",
        ebony: "var(--colour-ebony)",
        mako: "var(--colour-mako)",
        asphalt: "var(--colour-asphalt)",
        concrete: "var(--colour-concrete)",
        iron: "var(--colour-iron)",
        chalk: "var(--colour-chalk)",
        neon: "var(--colour-neon)",
        field: "var(--colour-field)",
        gloves: "var(--colour-gloves)",
        danger: "var(--colour-danger)",
      },
      fontFamily: {
        trim: "DAZN Trim",
        oscine: "DAZN Oscine",
        display: "var(--font-family-display)",
        body: "var(--font-family-body)",
        condensed: "DAZN Trim Condensed",
      },
      fontSize: {
        12: "var(--font-size-12)",
        14: "var(--font-size-14)",
        16: "var(--font-size-16)",
        22: "var(--font-size-22)",
        24: "var(--font-size-24)",
        28: "var(--font-size-28)",
        32: "var(--font-size-32)",
        36: "var(--font-size-36)",
        42: "var(--font-size-42)",
      },
      strokeWidth: {
        3: "var(--stroke-width-3)",
        4: "var(--stroke-width-4)",
        5: "var(--stroke-width-5)",
        6: "var(--stroke-width-6)",
        7: "var(--stroke-width-7)",
        8: "var(--stroke-width-8)",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["responsive", "hover", "focus", "focus-within"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
