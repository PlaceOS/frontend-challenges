module.exports = {
  purge:{
    content:[
      "./apps/**/*.html",
      "./apps/*/*.ts",
      "./apps/**/*.scss",
      "./libs/**/*.html",
      "./libs/**/*.ts"],
    options:{
      rejected: true,
      printRejected: true,
      whitelistPatterns: [
        /^cdk-/, 
        /^mat-/, 
      ],
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
