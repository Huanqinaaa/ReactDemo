var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');

//clear files under build
var fs = require('fs');
var	buildPath='./build/';
var folder_exists = fs.existsSync(buildPath);
if(folder_exists == true)
{
   var dirList = fs.readdirSync(buildPath);
   dirList.forEach(function(fileName)
   {
       fs.unlinkSync(buildPath + fileName);
   });
   console.log("clearing " + buildPath);
};

module.exports = {
	entry: [
		'./index.jsx' // Your appʼs entry point
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
	//more configuration
	resolve: {
		extensions: ['', '.js', '.jsx']    //auto extend the suffix, we can not write the suffix when require 
	},
	//loading configuration
	module: {
		loaders: loaders
	},
	//plugins configuration
	plugins: [
		new webpack.DefinePlugin({
	      'process.env':{
	        'NODE_ENV': JSON.stringify('production')
	      }
	    }),
	    new CopyWebpackPlugin([
			{from: './index.html'}
		])
	]
};
