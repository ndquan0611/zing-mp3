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
                'overlay-30': 'rgba(0, 0, 0, 0.3)',
            },
            keyframes: {
                rotateCenter: {
                    '0%': {
                        '-webkit-transform': 'rotate(0);',
                        transform: 'rotate(0);',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(360deg);',
                        transform: 'rotate(360deg);',
                    },
                },
                rotateCenterPause: {
                    '0%': {
                        '-webkit-transform': 'rotate(360deg);',
                        transform: 'rotate(360deg);',
                        'border-radius': '99999px',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(0);',
                        transform: 'rotate(0);',
                    },
                },
            },
            animation: {
                rotateCenter: 'rotateCenter 10s linear infinite;',
                rotateCenterPause: 'rotateCenterPause 0.2s linear 2 both;',
            },
        },
    },
    plugins: [],
};
