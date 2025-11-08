/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: "#6366F1", // vivid indigo
        brandMint: "#34D399", // fresh green
        brandPink: "#F472B6",
        brandYellow: "#FACC15",
        softText: "#1E293B", // darker neutral
      },
      backgroundImage: {
        "soft-gradient":
          "linear-gradient(135deg, #c7d2fe 0%, #a7f3d0 50%, #fbcfe8 100%)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Helvetica", "Arial"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
