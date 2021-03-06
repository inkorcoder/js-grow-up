// конструктор веб воркеров - это такой же конструктор как и любой другой
// так как это не реализовано всеми браузерами
// то чтобы не получить ошибку - нам нужно сначала определить есть ли он
// он будет доступен (или недоступен) прямо на window
if (window.Worker) {

	// создаем через конструктор новый воркер, передаем в него путь к файлу воркера
	// это такой же Javascript-файл, почти ничем не отличающийся от нормального
	// но в нем есть ограничения в виде отстутствия работы с DOM
	// воркеры созданы для решения проблемы "заморозки" интерфейса
	// поэтому в нем должны производиться только сложные вычисления
	// напрмиер числа Фибоначчи
	// такой принцип не подразумевает сам по себе работу с DOM
	var worker = new Worker("worker.js");

	// допустим, у нас есть инпут, и мы хотим вычислить из него фисла Фибоначчи
	document.querySelector('#input1').onchange = function() {
		// работа с воркером сводится к тому, что основной поток и поток воркера
		// могут передавать и принимать данные друг другу
		// со стороны основного потока - это метод postMessage который вызывается
		// у объекта который мы создали (экземпляра)
		// данные могут передаваться практически любые
		worker.postMessage(this.value);
		console.log('Новые данные ушли в воркер');
	}

	// когда форкер отработает, он в свою очередь, так же отправить нам
	// результат в основной поток. Его мы можем поймать так же
	// как воркер поймал наши данные
	worker.onmessage = function(event) {
		// в event.data будет храниться ответ воркера
		console.log('Мы получили ответ от воркера: '+event.data);
	}
}

// сам воркер распологается где угодно в проекте, напрмиер с именем worker.js
// в нем у нас нет window, воркер имеет глобальную область видимости
// в нем не нужно указывать или создавать что-либо через конструкторы
// основной поток и интерпретатор сделают все сами
// для того чтобы принимать и отдавать данные - в отличии от основного потока
// у нас не методы а две глобальне функции
// postMessage и onmessage соответственно
onmessage = function(e) {
	console.log('Я воркер, принял данные');
	var result = 'Держи результат своего Фибоначчи: ' + fibonacci(e.data));
	console.log('Я воркер, отдала результаты в основной поток');
	// и отдаем назад
	postMessage(workerResult);
}