const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const pkg = require("./package.json");

const pkgDependencies = Object.keys(pkg.dependencies);
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve("style-loader"),
    {
      loader: require.resolve("css-loader"),
      options: cssOptions
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve("postcss-loader"),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009"
            },
            stage: 3
          })
        ]
      }
    }
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};

const LIB_NAMES = [];
const PATHS = {
  dist: resolveApp("dist"),
  appExampleDist: resolveApp("example/dist"),
  exampleIndexHtml: resolveApp("example/index.html"),
  exampleIndex: resolveApp("example/SideNav/index")
};

module.exports = {
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
