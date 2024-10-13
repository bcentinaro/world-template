module.exports = {
    content: [
        './_layouts/*.html',
        './_includes/*.html',
        './_**/*.md',
        './*.md',
        './*.html',
    ],
    theme: {

        extend: {
            colors: {
                brand:  {
                    primary: '#0a0a0a',
                    secondary: '#0a0a0a',
                    background: '#f5f5f5',
                },
                default:  {
                    primary: '#0a0a0a',
                    secondary: '#0a0a0a',
                    background: '#f5f5f5',
                }
            }
        },
    },
    plugins: []
}
