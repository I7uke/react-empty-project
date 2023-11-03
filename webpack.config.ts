import * as webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import svgToMiniDataURI from 'mini-svg-data-uri';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import getBuildConfig from './config/getBuildConfig';
import getBuildRealPages from './config/getBuildRealPages';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const createMinifier = require("css-loader-minify-class");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BUILD_CONFIG = getBuildConfig(process.env.NODE_ENV === 'development');

const PAGES = getBuildRealPages({
    common: [BUILD_CONFIG.commonStylePath],
    faviconPath: BUILD_CONFIG.faviconPath,
    htmlTemplatePath: BUILD_CONFIG.htmlTemplatePath,
    outputPath: BUILD_CONFIG.outputPath,
    publicPath: BUILD_CONFIG.publicPath,
    realHtmlPagesFolderPath: BUILD_CONFIG.realHtmlPagesFolderPath
});

const config: webpack.Configuration = {
    mode: BUILD_CONFIG.mode,
    entry: PAGES.entry,
    devtool: BUILD_CONFIG.isDevelopment ? 'source-map' : false,
    cache: BUILD_CONFIG.isDevelopment? {
        type: 'filesystem',
        store: 'pack',
    }: false,
    module: {
        rules: [
            // Файлы ts и tsx
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheCompression: false,
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /(svg_ico).*\.svg(\?.*)?$/,
                issuer: /\.[jt]sx?$/,
                use: { loader: '@svgr/webpack', options: { icon: true } },
            },
            {
                test: /(svg_component).*\.svg(\?.*)?$/,
                issuer: /\.[jt]sx?$/,
                use: { loader: '@svgr/webpack' },
            },
            // Маленькие svg которые будут вставлены непосредственно в код
            {
                test: /(svg_base64).*\.svg(\?.*)?$/,
                type: 'asset/inline',
                generator: {
                    dataUrl(content: any) {
                        return svgToMiniDataURI(content.toString());
                    }
                },
                use: [
                    "svg-transform-loader"
                ]
            },
            // Большие по размеру svg которые будут помещены в папку сборки и загружаться по url
            {
                test: /(svg_url).*\.svg/,
                type: 'asset/resource',
                generator: {
                    filename: 'svg/[hash][ext][query]'
                }
            },
            // Для стилей scss
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            importLoaders: 1,
                            modules: {
                                ...(BUILD_CONFIG.isDevelopment ? {
                                    localIdentName: '[folder]_[name]_[local]__[hash:base64]',
                                } : {
                                    getLocalIdent: createMinifier(),
                                }),
                            },
                        }
                    },
                    "svg-transform-loader/encode-query",
                    "sass-loader",
                ],
            },
            // Для css, просто сжимаем файл и ничего больше не делаем
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },

            // Для всех больших картинок, кладем их в папку сборки
            {
                test: /(img_url).*\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext][query]'
                }
            },

            // Для всех маленьких картинок, конвертируем из в base64
            {
                test: /(img_base64).*\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/inline',
            },

            // Шрифты
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: BUILD_CONFIG.isDevelopment ? `[name]_[contenthash].css?t=${BUILD_CONFIG.dateBuildTimestamp}` : '[name]_[contenthash].css',
            ignoreOrder: true
        }),
        ...PAGES.htmlPages,
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(BUILD_CONFIG.dateBuildTimestamp),
        }),
        new webpack.ids.DeterministicModuleIdsPlugin({
            maxLength: 5,
        })
        // new BundleAnalyzerPlugin()
    ],
    output: {
        path: BUILD_CONFIG.outputPath,
        filename: BUILD_CONFIG.isDevelopment ? `[name]_[contenthash].bundle.js?t=${BUILD_CONFIG.dateBuildTimestamp}` : '[name]_[contenthash].bundle.js',
    },
    optimization: {
        runtimeChunk: 'single',
        moduleIds: false,
        innerGraph: true,
        removeAvailableModules: !BUILD_CONFIG.isDevelopment,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        providedExports: true,
        realContentHash: true,
        sideEffects: false,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        },
    },
};

if (BUILD_CONFIG.isDevelopment) {
    console.log("\x1b[33m", `
    ██████╗ ███████╗██╗   ██╗███████╗██╗      █████╗ ██████╗ ███╗   ███╗███████╗███╗  ██╗████████╗
    ██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██╔══██╗██╔══██╗████╗ ████║██╔════╝████╗ ██║╚══██╔══╝
    ██║  ██║█████╗  ╚██╗ ██╔╝█████╗  ██║     ██║  ██║██████╔╝██╔████╔██║█████╗  ██╔██╗██║   ██║   
    ██║  ██║██╔══╝   ╚████╔╝ ██╔══╝  ██║     ██║  ██║██╔═══╝ ██║╚██╔╝██║██╔══╝  ██║╚████║   ██║   
    ██████╔╝███████╗  ╚██╔╝  ███████╗███████╗╚█████╔╝██║     ██║ ╚═╝ ██║███████╗██║ ╚███║   ██║   
    ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚══════╝ ╚════╝ ╚═╝     ╚═╝     ╚═╝╚══════╝╚═╝  ╚══╝   ╚═╝ `);
} else {
    console.log("\x1b[31m", `
    ██████╗ ██████╗  █████╗ ██████╗ ██╗   ██╗ █████╗ ████████╗██╗ █████╗ ███╗  ██╗
    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║   ██║██╔══██╗╚══██╔══╝██║██╔══██╗████╗ ██║
    ██████╔╝██████╔╝██║  ██║██║  ██║██║   ██║██║  ╚═╝   ██║   ██║██║  ██║██╔██╗██║
    ██╔═══╝ ██╔══██╗██║  ██║██║  ██║██║   ██║██║  ██╗   ██║   ██║██║  ██║██║╚████║
    ██║     ██║  ██║╚█████╔╝██████╔╝╚██████╔╝╚█████╔╝   ██║   ██║╚█████╔╝██║ ╚███║
    ╚═╝     ╚═╝  ╚═╝ ╚════╝ ╚═════╝  ╚═════╝  ╚════╝    ╚═╝   ╚═╝ ╚════╝ ╚═╝  ╚══╝`);
}
console.log('\x1b[37m', BUILD_CONFIG.dateBuildHumanUnderstandable);
export default config;