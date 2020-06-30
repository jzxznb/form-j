const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

console.log(path.resolve(__dirname, '../src/index.jsx'))

module.exports = {
    // mode: 'production',
    entry: { main: path.resolve(__dirname, '../src/index.js') },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../'),
        filename: '[name].js',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    resolve: {
        extensions: ['.js', '.css', '.less', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader', 'css-loader', 'less-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                },
            },
        ],
    },
    plugins:[
        new VueLoaderPlugin(),
    ]
}