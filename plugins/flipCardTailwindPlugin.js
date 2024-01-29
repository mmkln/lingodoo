const plugin = require('tailwindcss/plugin');

const flipCardPlugin = plugin(function({ addUtilities }) {
    const newUtilities = {
        '.perspective': {
            perspective: '1000px',
        },
        '.flip-card': {
            position: 'relative',
            cursor: 'pointer',
            transitionDuration: '0.6s',
            transitionTimingFunction: 'ease-in-out',
            transformStyle: 'preserve-3d',
        },
        '.flip-front, .flip-back': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
        },
        '.flip-front': {
            zIndex: 2,
            transform: 'rotateX(0deg)',
        },
        '.flip-back': {
            transform: 'rotateX(180deg)',
        },
        '.flip-rotate-y': {
            transform: 'rotateY(180deg)',
        },
        '.flip-rotate-y-back': {
            transform: 'rotateY(-180deg)',
        },
        '.flip-rotate-x': {
            transform: 'rotateX(180deg)',
        },
        '.flip-rotate-x-back': {
            transform: 'rotateX(-180deg)',
        },
        // Тут можна додати інші варіанти фліпу (diagonal, inverted, тощо)
    };

    addUtilities(newUtilities);
});

module.exports = flipCardPlugin;
