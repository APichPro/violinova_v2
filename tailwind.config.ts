import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        white: {
          1: "#FFFFFF",
          2: "rgba(255, 255, 255, 0.72)",
          3: "rgba(255, 255, 255, 0.4)",
          4: "rgba(255, 255, 255, 0.64)",
          5: "rgba(255, 255, 255, 0.80)",
        },
        black: {
          1: "#15171C",
          2: "#222429",
          3: "#101114",
          4: "#252525",
          5: "#2E3036",
          6: "#24272C",
        },
        brown: {
          1: "rgba(54, 52, 48, 1)",
          2: "rgba(54, 52, 48, 0.80)",
          3: "rgba(54, 52, 48, 0.72)",
          4: "rgba(54, 52, 48, 0.64)",
          5: "rgba(54, 52, 48, 0.4)",
        },
        orange: {
          // #F97535
          1: "rgba(249, 117, 53, 1)",
          2: "rgba(249, 117, 53, 0.80)",
          3: "rgba(249, 117, 53, 0.72)",
          4: "rgba(249, 117, 53, 0.64)",
          5: "rgba(249, 117, 53, 0.4)",
        },
        pal: {
          1: "#D6D6D6",
          2: "#8F8F8F",
          3: "rgba(214, 214, 214, 0.64)",
          4: "#E5E0DA",
          5: "#BCB2A4",
        },
      },
      backgroundImage: {
        "nav-focus":
          "linear-gradient(270deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.00) 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
