// call
// функция, к которой будем привязывать контекст
function getStick() {
	console.log("\n");
	console.log("Stick of "+this.name+"\n"+"type: "+this.type+"\n"+"price: "+this.price+"$");
	console.log("\n");
}

// два обхъекта с шоколадками
// 'Snickers'
var snickers = {
			name: "Snickers",
			type: "Chocolate",
			price: 30
		},
		// 'Nuts'
		// у этой шоколадки намеренно нет цены. Пока что
		nuts = {
			name: "Nuts",
			type: "chocolate with nuts"
		};

// вызываем функцию в контексте каждого из объектов.
// при вызове this будет указывать на объект шоколадки, в контексте которой она вызвана
// функция вызывается моментально
// аргументы в функцию передаются через запятую
// чтобы передать в нее аргументы, их нужно передать после контекста:
// getStick.call(snickers, arg1, arg2, arg..n);
// запоминается как `C`all : `C`omma, - запятая
getStick.call(snickers);
getStick.call(nuts);

// так же вызываем функцию в контексте этого объекта, и она так же вызывается моментально
// главное отличие с Call то, что аргументы передаются массивом
// чтобы передать в нее аргументы, их нужно передать после контекста:
// getStick.apply(snickers, [arg1, arg2, arg..n]);
// запоминается как `A`pply : `A`rray, - массив
getStick.apply(snickers);
getStick.apply(nuts);

// bind отличается от call и apply тем, что не вызывается сразу
// он только создает функцию-обертку с указанным контекстом, и она может быть
// вызвана в любое время любое количество раз
snickers.getStick = getStick.bind(snickers);
snickers.getStick();

// это вспомогательная функция, которая покажет как поймать аргументы
function getStick2() {
	// arguments - это массивоподобный объект! Его не получится просто так перебрать как массив
	// поэтому мы, зная что моментально можно вызвать метод массива в контексте объекта arguments
	// вызываем его. Результатом будет новый массив, поскольку slice() без аргументов
	// вернет полную копию массива
	var argsArray = [].slice.call(arguments);
	for (i = argsArray.length-1; i >= 0; i--){
		this['price'] = argsArray[i];
	}
	// выводим в консоль
	console.log("\n");
	console.log("Stick of "+this.name+"\n"+"type: "+this.type+"\n"+"price: "+this.price+"$");
	console.log("\n");
}

// теперь создадим метод у объекта, который будет оберткой для вспомогательной 
// фукции getStick2() и будет вызываться в контексте этого объекта
// так же - мы можем передать аргументы в функцию
nuts.getStick = getStick2.bind(nuts, 20);
nuts.getStick();

// карринг - это механизм, который позволяет фиксировать аргументы функции
// при этом создавая новую, и при повторном вызове
// фиксированные аргументы не нужно передавать снова.
// изначально у нас есть функция, которая переумножает два числа: `a` и `b`
times = function(a, b){
	return a * b;
}
console.log(times(5, 5)) // 25

// мы можем создеть функцию-обертку для умножения на 2
// мы передаем `null` в качестве контекста и 2 в качестве переменной `a`
// переменная `a` зафиксируется в контексте этой обертки
// теперь у нас есть функция, в которой уже есть первый агрумент
// чтобы умножить на 2 какое-то число - нужно вызвать эту функцию и
// передать в нее то число, которое нужно умножить на 2
var times2 = times.bind(null, 2);
console.log(times2(5)) // 10

// то же самое мы сделаем для умножения на 3
var times3 = times.bind(null, 3);
console.log(times3(5)) // 15

// в профиль - карринг выглядит как вызов функциии, которая возвращается
// предыдущей функцией
function multiply(a) {
	// возвращаем функции для каждого аргумента
	return function(b) {
		return function(c) {
			return function(d) {
				// благодоря замыканиям мы можем 'видеть' все переменные родительских функций
				// когда у нас есть все переменные, мы можем их умножить вместе и отдать результат
				console.log("final curry: ("+a+"*"+b+"*"+c+"*"+d+") "+(a*b*c*d));
				// так как мы уже не возвращаем функцию, то вызвать снова и передать еще одну
				// переменную мы уже не сможем
				return a*b*c*d;
			}
		}
	}
}
console.log(multiply(1)(2)(3)(4));

// возможный пример из жизни - создание юзера
// допустим, мы отправляем 4 ajax-запроса и получаем из каждого
// имя, фамилию, возраст и увлечения соответственно
function generateUser(firstName) {
	console.log('1st ajax: we have a name');
	// возвращаем функции для каждого аргумента
	return function(secondName) {
		console.log('2nd ajax: we have a second name');
		return function(age) {
			console.log('3rd ajax: we have an age');
			return function(hobbies) {
				// благодоря замыканиям мы можем 'видеть' все переменные родительских функций
				// когда у нас есть все переменные, мы можем отдать результат
				console.log("We have a user: "+firstName+", "+secondName+", "+age+", "+hobbies+", ");
				// так как мы уже не возвращаем функцию, то вызвать снова и передать еще одну
				// переменную мы уже не сможем
				return {
					name: firstName,
					secName: secondName,
					age: age,
					hobbies: hobbies.split(',')
				};
			}
		}
	}
}

// 1й запрос
setTimeout(()=> {
	var generateSecondName = generateUser("Vasya");
	// 2й запрос
	setTimeout(()=> {
		var generateAge = generateSecondName("Poopkin");
		// 3й запрос
		setTimeout(()=> {
			var generateHobbies = generateAge(18);
			// 4 запрос
			setTimeout(()=> {
				var user = generateHobbies('music, flowers, jsvascript');
				// тут мы уже имеем полного юзера со всеми юзерами
				console.log(user);
			}, 1000);
		}, 1000);
	}, 1000);
}, 1000);

// функция, которая вызывается единажды
function sumOfManyNumbers(firstNumber) {
	// она примет сразу аргумент для суммирования
	// и мы его запишем срау в переменную
	var sum = firstNumber;
	// вспомогательная функция, ссылку на которую мы
	// каждый раз должны вернуть после выполнения
	// чтобы каждый раз снова могли ее вызвать
	function subSum(anyAnotherNumber){
		// она прмиет уже какой-то другой аргумент и прибавиn к переменной
		sum += anyAnotherNumber;
		// ссылка, а не выщов: subSum();
		return subSum;
	}
	// эта функция нуна для того, чтобы показать результат
	// иначе мы получим просто ссылку на функцию
	subSum.toString = function() {
		return sum;
	}
	// ссылка, а не выщов: subSum();
	return subSum;
}
let sumOfTen = sumOfManyNumbers(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)
console.log(sumOfTen.toString());