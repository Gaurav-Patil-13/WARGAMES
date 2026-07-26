export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080b10',
        panel: '#101721',
        line: '#233041',
        acid: '#7CFFB2',
        amber: '#FFCD7A',
        cyan: '#6AE4FF'
      },
      boxShadow: {
        glow: '0 0 24px rgba(124, 255, 178, 0.18)'
      }
    }
  },
  plugins: []
};
