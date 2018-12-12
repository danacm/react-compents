const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob');
const pkg = require("./package.json");

const pkgDependencies = Object.keys(pkg.dependencies);
console.log("externals111:",pkgDependencies);
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const LIB_NAMES = [];
const PATHS = {
  dist:  resolveApp('dist')
};
//get file folder

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        //console.log(2, pathname, entry);
        entries[pathname] =  resolveApp(path.join(dirname, basename));
    }
    return entries;
}
const myEntries = getEntry('src/**/*.js','src\\');
module.exports = {
  entry: myEntries,
  externals:pkgDependencies,
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|mjs|jsx|ts|tsx)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0",
      //       options: { presets: ["react", "es2015","stage-0"] }
      //     }
      //   ]
      // }
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
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         chunks: "initial",
  //         minChunks: 2,
  //         maxInitialRequests: 5, // The default limit is too small to showcase the effect
  //         minSize: 0 // This is example is too small to create commons chunks
  //       },
  //       vendor: {
  //         test: /node_modules/,
  //         chunks: "initial",
  //         name: "vendor",
  //         priority: 10,
  //         enforce: true
  //       }
  //     }
  //   }
  // },
   plugins: [
    new CleanWebpackPlugin(['dist']), //清理dist文件夹
  //   new HtmlWebpackPlugin({
  //     template: path.join(__dirname, "src", "index.html")
  //   }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'package.json'),
        to: path.join(__dirname, 'dist'),
        transform: function(content) {
          var data = JSON.parse(content.toString());
          var result = {
            name: data.name,
            version: data.version,
            main: data.main,
            author:data.author,
            license:data.license,
            peerDependencies: data.peerDependencies
          };
          return new Buffer(JSON.stringify(result));
        }
      }
    ])
   ]
};
