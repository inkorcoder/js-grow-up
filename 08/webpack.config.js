// так же как и в случае с Gulp мы импортируем нужные модули
const path = require('path');
const webpack = require('webpack');

// конфиг для webpack представляет собой объект
module.exports = {
	// так называемая "точка входа"
	// может указывать как на папку, так и на конкретный файл
	// если это папка, то внутри нее будет искаться файл index.js
	// если файл, то будет искаться он
	// это главный файл сборки, в нем уже подключаются другие модули
	// и потом они собираются
	// точек входа может быть несколько
	// в таком случае это будет не строка, а объект
	// и итоговые бандлы можно будет назвать так, как называются
	// свойства объекта
	/*
		entry: {
			polyfills: './src/polyfills.ts',
			vendor: './src/vendor.ts',
			app: './src/main.ts'
		},
	*/
	entry: "./app",
	// папка и файл для созранения собранного бандла
	output: {
		// path.resolve() - создает абсолютный путь
		// __dirname - это переменная, содержащая путь к папке,
		// откуда был вызван скрипт
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	// дальше мы описываем какие манипуляции с какими модулями выполнять
	module: {
		rules: [
			{
				// выбираем файлы по маске
				test: /\.jsx?$/,
				// так же мы можем добавить файлы и з папки "app"
				include: [
					path.resolve(__dirname, "app")
				],
				// лоадары - это специфическое понятие у webpack
				// их задача обрабатывать модули
				// в комплекте с ним поставляются лоадеры под любые нужды
				// а если нет, то их можно установить
				// в данном случае "babel-loader" мы ставим вручную
				loader: "babel-loader",
				// для лоадера "babel-loader" мы указываем пересет "es2015"
				// что заставит его компилировать код в ES5 вид
				options: {
					presets: ["es2015"]
				},
			},
			{
				// то же самое для *.html-файлов
				test: /\.html$/,
				use: [
					"htmllint-loader",
					{
						loader: "html-loader",
					}
				]
			},
			{
				// и SASS
				// если лоадаров несколько
				// они вызываются справа налево, тоесть от конечного до начального
				// перед названием лоадера может стоять знак восклицания
				// который указывает на то, что лоадер нужно запустить раньше
				test: /\.scss$/,
				use: [{
					// вызывается последним
					loader: "style-loader"
				}, {
					// вызывается вторым
					loader: "css-loader"
				}, {
					// вызывается первым
					loader: "sass-loader"
				}]
			}
		]
	},
	// вебпек умеет вставлять source-maps в бандл
	// он поддерживает несколько вариантов развития событий
	// каждый вариант будет / или не будет вызываться при:
	// - первом запуске
	// - пересозранении
	// - сборке
	// а так же, каждый из них влияет на скорость сборки
	// source-map вызывается и при сборке, и при первом запуске
	// и при сборке на продакшен, но он очень медленный
	// и требует много ресурсов
	devtool: "source-map",
	// домашняя папка для вебпека, относительно нее он будет
	// искать папки и работать с модулями
	context: __dirname,
	// целевое окружение, это влияет на загрузку модулей
	// и работу вебпека
	target: "web",
	// плагины позволяют дополнительно управлять процессом сборки
	// это может быть минификация, или что угодно
	// в данном случае ProvidePlugin загрузин там "Reac"
	// и его не обязательно будет где-то импортировать
	// похожая ситуация будет и для jQuery:
	// ProvidePlugin({ $: 'jquery' })
	plugins: [
		new webpack.ProvidePlugin({
			"React": "react",
		}),
	],
}