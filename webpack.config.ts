/**
 * Webpack configuration file
 */
import * as webpack from 'webpack';

import { resolve } from 'path';

const config: webpack.Configuration = {
    entry: resolve('src/index.tsx'),
    output: {
        path: resolve('assets'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /tsx?$/,
                include: resolve('src'),
                use: 'ts-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
};

// tslint:disable-next-line:no-default-export
export default config;
