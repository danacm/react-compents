const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const pkg = require("./package.json");

const pkgDependencies = Object.keys(pkg.dependencies);
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const LIB_NAMES = [];
const PATHS = {
  dist: resolveApp("dist"),
  appExampleDist: resolveApp("example/dist"),
  exampleIndexHtml: resolveApp("example/index.html"),
  exampleIndex: resolveApp("example/SideNav/index.js")
};

module.exports = {
  devtool:'eval-source-map',
  entry: PATHS.exampleIndex,
  output: {
    path: PATHS.appExampleDist,
    filename: "example.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader:
              "babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0",
            options: {
              presets: ["react", "es2015", "stage-0"],
              plugins: [
                [
                  "import",
                  {
                    libraryName: "antd",
                    style: "css"
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        //antd样式处理
        test: /\.css$/,
        exclude: /src/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }

          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: PATHS.exampleIndexHtml
    })
  ],
  devServer: {
    port: 4000,
    open: true,
    quiet: true, //控制台中输出打包的信息
    noInfo: false,
    inline: true, //开启页面自动刷新
    lazy: false, //不启动懒加载
    progress: true //显示打包的进度
  }
};
