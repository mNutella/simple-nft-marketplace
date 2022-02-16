module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",   
    "./src/common/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
