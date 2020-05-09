//webpack的配置文件

//由于webpack是基于node构建的，所以在webpack配置文件中任何合法的node代码都是支持的

const path = require('path');


// 导入自动生成HTMl文件的插件
var htmlWebpackPlugin = require('html-webpack-plugin');
/*
* 该插件的作用：1.自动在内存中根据指定的页面生成一个内存中的页面
*               2.自动把内存中打包好的js文件追加到页面中
 *
  * */

//通过node操作的模块中向外暴露出一个配置对象

module.exports = {
    //配置打包模式为：开发模式
    mode:"development",
    //配置入口文件
    entry:path.join(__dirname,'./src/index.js'),
    //指定你要打包到哪一个目录
    output:{
        path:path.join(__dirname,'./dist'),//打包的目录
        //打包的文件名
        filename:'main.js',
    },
    plugins:[ //所有的webpack插件，一般都要配置到这个节点上
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),//指定的模板路径

            filename:'index.html'//设置生成内存页面的名称
        })

    ],
    module:{ // 用来配置所有第三方loader模块的

        rules:[//模块匹配规则
            {test:/\.css$/,use:['style-loader','css-loader','postcss-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            { test: /\.(png|jpeg|jpg|gif|bmp|svg)$/, use: 'url-loader?limit=19642&name=[hash:10][name].[ext]'},

            //传参：?limit=19642-->图片大小，若图片的字节大于你设置的字节标准，则显示路径，
            //否者显示base64格式的

            //改图片被编译成了唯一的hash值，比方DNA,一共32位，继续传参设置自己的图片名字:name=[name].[ext]

            //为了防止图片名重复，在图片名的前面设置hash值10位 例如：name=[hash:10][name].[ext]

            {test:/\.(ttf|woff2|woff|eot)$/,use:['url-loader']},
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },





        ]
    }
};