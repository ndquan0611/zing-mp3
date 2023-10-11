/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    mode: 'jit',
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
            },
            colors: {
                primary: '#c273ed',
                darkPrimary: '#9b4de0',
                textColor: '#dadada',
                textSecondary: '#ffffff80',
                borderPrimary: '#ffffff1a',
                bgPrimary: '#34224f',
            },
        },
    },
    plugins: [],
};
