// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
//   darkMode: 'class', // We will use this for the light/dark toggle
//   theme: {
//     extend: {
//       fontFamily: {
//         // Here we define your hybrid font strategy
//         sans: ['Inter', 'ui-sans-serif', 'system-ui'],
//         mono: ['"Roboto Mono"', 'ui-monospace', 'SFMono-Regular'],
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Change from 'media' (default) to 'class'
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
