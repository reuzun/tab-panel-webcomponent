const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/tab-panel.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "tab-panel.js",
        clean: true
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: {
                        properties: {
                            regex: /.*/,
                            reserved: ["connectedCallback"]
                        }
                    }
                }
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /.*/,
                loader: 'string-replace-loader',
                options: {
                    search: /(?<=`)[\s\n<>a-zA-Z0-9:{};.(),\/="$%-]*(?=`;)/g,
                    replace(match, p1, offset, string) {
                        const val = match.replace(/\n/g, "")
                            .replace(/\s/g, "")
                            .replace(/div(?!:)/g, "div ")
                            .replace(/slot/g, "slot ")
                            .replace(/flex-col(?!-)/g, "flex-col ")
                            .replace(/flex-row(?!-)/g, "flex-row ")
                            .replace(/,/g, ", ");
                        return val
                    },
                }
            }
        ]
    }
};