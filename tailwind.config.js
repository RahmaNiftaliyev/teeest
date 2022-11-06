module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#7338ac",
        "main-color": "#F5F5F5;",
        "footer-color": "#1E2029",
      },
      borderWidth: {
        DEFAULT: "1px",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        16: "repeat(4, minmax(0, 1fr))",

        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
      backgroundImage: {
        "hero-pattern": "url('../src/Assets/Images/hero.svg')",
      },
    },
  },
  plugins: [],
};
