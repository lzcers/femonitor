module.exports = {
    entry: {
        main: './src/main.ts'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}
