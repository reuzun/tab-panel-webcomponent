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
                    search: /\`[\s\\n\na-zA-Z<>:{;}\/="-1-9]*\`/g,
                    replace(match, p1, offset, string) {
                        // console.log(`Replace "${match}" in file "${this.resource}".`)
                        const val = match.replace(/\n/g, "")
                            .replace(/\s/g, "")
                            .replace(/div/g, "div ")
                            .replace(/slot/g, "slot ");
                        return val
                    },
                }
            }
        ]
    }
};