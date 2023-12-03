import typographyPlugin from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f9f6f1",
      },
      fontFamily: {
        serif: "Lora, Georgia, serif",
      },
    },
  },
  plugins: [typographyPlugin],
};
