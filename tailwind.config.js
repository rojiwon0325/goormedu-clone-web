module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      NanumSquareRoundLight: "NanumSquareRoundL",
      NanumSquareRound: "NanumSquareRound",
      NanumSquareRoundBold: "NanumSquareRoundB",
      NanumSquareRoundExtraBold: "NanumSquareRoundEB",
    },
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      lightgray: "#F7F7FA",
      gray229: "#E5E5E5",
      gray219: "#DBDBDB",
      gray203: "#CBCBCB",
      gray190: "#BEBEBE",
      gray175: "#AFAFAF",
      gray154: "#9A9A9A",
      gray122: "#7A7A7A",
      darkgray: "#676666",
      gray86: "#565656",
      gray62: "#3E3E3E",
      gray41: "#292929",
      black: "#000000",
      skyblue: "#DEEDFF",
      asyblue: "#9CA3AF",
      blue: "#609AE9",
      darkblue: "#3F618B",
      lightindigo: "#384051",
      indigo: "#2A303D",
      darkindigo: "#14161C",
    },
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "fade-in": "0.3s linear 0s fadeIn",
        "fade-out": "0.3s linear 0s fadeOut",
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
    },
  },
  plugins: [],
};
