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
                    },
                    ceil_nior: {
                        primary: '#2e1065',
                        secondary: '#f5f5f5',
                        background: '#f5f5f5',
                    },
                    everbloom: { 
                        primary: '#022c22', 
                        secondary: '#022c22', 
                        background: '#f5f5f5' 
                    },
                    taraj: { 
                        primary: '#0c457d', 
                        secondary: '#0c457d', 
                        background: '#f5f5f5' 
                    },
                    nivalia: { 
                        primary: '#0d56ba', 
                        secondary: '#474444', 
                        background: '#f5f5f5' 
                    },
                    hirutai: { 
                        primary: '#8f2323', 
                        secondary: '#8f2323', 
                        background: '#f5f5f5' 
                    },
                    celestia: { 
                        primary: '#04001e', 
                        secondary: '#04001e', 
                        background: '#f5f5f5' 
                    },
                }
            },
        },
        plugins: []
    }
    