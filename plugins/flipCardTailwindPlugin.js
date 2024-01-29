const plugin = require('tailwindcss/plugin');

const flipCardPlugin = plugin(function({ addUtilities }) {
    const newUtilities = {
        '.perspective': {
            perspective: '1000px',
        },
        '.flip-container': {
            position: 'relative',
            width: '100%',
            height: '100%',
        },
        '.flip-card': {
            width: '100%',
            height: '100%',
            transition: 'transform 0.5s',
            transformStyle: 'preserve-3d',
            'backface-visibility': 'hidden',
        },
        '.flip-front': {
            'backface-visibility': 'hidden',
        },
        '.flip-back': {
            'backface-visibility': 'hidden',
            transform: 'rotateX(180deg)',
        },
        '.is-flipped .flip-card': {
            transform: 'rotateX(180deg)',
        },
    };

    addUtilities(newUtilities);
});

module.exports = flipCardPlugin;
