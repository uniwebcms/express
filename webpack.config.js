const path = require('path');

module.exports = (_, argv) => {
    return {
        entry: path.resolve(__dirname, 'src', 'index.js'),
        resolve: {
            extensions: ['.jsx', '.js', '.json']
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve('dist'),
            clean: true,
            publicPath: '/dist/',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        resolve: {
            alias: {
                react: path.resolve(__dirname, './node_modules/react'),
                'react-dom': path.resolve(__dirname, './node_modules/react-dom')
            }
        },
        externals: {
            react: 'react',
            'react-dom': 'react-dom'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.(css)$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                                // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                                importLoaders: 1,
                                // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
                                modules: { auto: true }
                            }
                        }
                    ]
                },
                {
                    test: /\.((sa|sc)ss)$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                                // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                                importLoaders: 1,
                                // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
                                modules: { auto: true }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // Prefer `dart-sass`
                                // eslint-disable-next-line global-require
                                implementation: require('sass')
                            }
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                svgoConfig: {
                                    plugins: [
                                        {
                                            removeViewBox: false
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|webp)$/i,
                    use: [
                        {
                            loader: 'file-loader'
                        }
                    ]
                }
            ]
        },
        watchOptions: {
            ignored: ['**/node_modules']
        }
    };
};
