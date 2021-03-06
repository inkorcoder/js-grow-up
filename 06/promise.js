// промис - это объект, который может хранить свое состояние
// и призван упростить работу с колбеками
// по сути у него всего два колбека:
// [resolve] - успешно выполнился
// [reject] - произошла ошибка
// эти колбеки появляются сразу же при создании промиса
var promise = new Promise(function(resolve, reject) {
	// эта функция вызывается при создании объекта
	// тут мы можем выполнять любой асинхроный код
	// но должны вызвать один из колбеков по завершению
	// resolve или reject

	// представим что мы отправляем запрос и ответ придет через пол секуды
	setTimeout(() => {
		// представим что он успешно выполнлся
		// и вызовем resolve
		resolve("result");
	}, 500);
})
// создаем промис. Функция описанная выше выполняется и запрос уходит
// отличительной чертой промиса является метод then, в который мы передаем
// функцию, которая вызовется по завершению
promise.then(res => console.log(res));


// более реальный пример
// создадим объект шоколадки, его будем запрашивать с сервера
const result1 = {
	name: "Snickers",
	detail: "http://api.com/chocolates/snickers/detail",
	photo: 'http://api.com/image.jpg'
}
// и детальная информация про шоколадку
const result2 = {
	title: "Snickers",
	caption: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere nam ullam libero nemo",
	price: 20
}
// напишем функцию, которая эмулирует поведение ajax-запроса
function get(url) {
	// для отладки и вообще хоть какой-то индикации процесса
	console.log("getting from "+url+"...");
	// вернем промис, чтобы по завершению можно было вызвать .then()
	return new Promise(function(resolve) {
		// запрос ушел
		setTimeout(() => {
			// пришел ответ, представим что без ошибок
			// вызываем resolve
			// тернарный оператор здесь просто для определения
			// деталку получаем или нет
			// в реальности тут будет реально переданный адрес
			resolve(!url.match(/detail/) ? result1 : result2);
		}, 1000);
	})
}
// отправляем запрос на получение шоколадки
get('http://api.com/chocolates')
	// подписываемя на обещанный колбек по завершению
	.then(res => {
		// как только промис выполняется - создаем переменную
		// с адресом на деталку шоколадки
		var {detail} = res;
		// и возврщаем снова промис
		return get(detail)
	// и в нем будет метод .then(), на который тоже подпишемся
	// цепочка .then() может быть сколько угодно длинной
	}).then(res => {
		// когда приняли детальную информацию - отображаем в консоли
		var {title, caption, price} = res;
		console.log(`
			+--------------------------------------+
			| ${title}
			+--------------------------------------+
			| ${caption.substring(0,35)}
			| ${caption.substring(35,70)}
			| ${caption.substring(70,100)}
			+--------------------------------------+
			| price: ${price}$
			+--------------------------------------+
		`.replace(/\t/gim,''))
	})

// нельзя забывать про отлов ошибок
// у промиса есть для этого метод .catch()
// или же, в метод .then() вторым аргументом передать
// функцию для обработки ошибки