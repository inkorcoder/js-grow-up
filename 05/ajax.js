// request.open(method, URL, async[, user, password])
// [method] - GET или POST
// [URL] - адрес запроса, может быть не обязательно адресом сайта (ftp://, file://)
// [async] - отвечает за асинхронность, если установлено false - выполняется синхронно
// и замораживает интерфейс, если true - то работает в фоне. По умолчанию true.
// [user], [password] - имя и пароль пользователя, если обращаемся по ftp://

// За создание ноговго запроса отвечаетс конструктор XMLHttpRequest
// тут мы просто создаем новый объект запроса, не отправляем его
var request = new XMLHttpRequest();

// дальше мы настраиваем запрос, указываем метод, адрес и если нужно - флаг асинхронности
request.open('GET', 'temp.json');

// лишь только тут мы отправляем запрос и начинаем ждать ответ
request.send();

// теперь, у нас начинают отрабатывать колбеки, которые вызываются при смене состояния
// их мы можем поймать, повесив обработчик на onreadystatechange
request.onreadystatechange = function() {
	// важно! мы не ловим событие, как это принято в работе с DOM, мы просто читаем
	// значение свойство самого request объекта
	console.log(request.readyState)
	// readyState всегда имеет определенные значения:
	// 0 - начальное состояние
	// 1 - мы вызвали метод .open()
	// 2 - получены заголовки ответа
	// 3 - получаются какие-то данные
	// 4 - все данные полностью получены, запрос закрывается
}

// так же, у нас есть события, которые мы можем слушать и выполнять соответственно какие-то действия
// loadstart - запрос начался
// progress - запрос выполняется, тут мы получаем какие-то куски данных
// abort - вызовется, если мы сами закрыли запрос методом .abort()
// error - ошибка в ходе запроса
// load - вызывается, если запрос завершился только успешно
// loaded - вызывается если запрос завершился (удачно или неудачно)

// обработка только успешного выполнения
request.onload = function(){
	// выведет 200, поскольку это код "ОК" (все отлично отработало)
	console.log(request.status);
}

// обработка ошибки
request.onerror = function(){
	// выведет код ошибки, это не будет 200, это будет 5xx, 4xx, 3xx и т.д
	throw new Error('Запрос завершился ошибкой '+resuest.status);
}