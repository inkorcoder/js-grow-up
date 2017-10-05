// объявляем объект шоколадки
let snickers = {
	name: "Snickers",
	// помимо имени у него должен быть метод,
	// который обяжет шоколадку заговорить а нами
	// мы знаем что, внутри объекта метод ссылается не на свой this
	// а на this как на объект, в на котором вызывается
	sayHi: function(){
		var i = 0;
		var interval = setInterval(function(){
			// а вот вложенная функция уже получит свой контекст
			// и как только шоколадка захочет представиться
			// она внезапно забудет как ее зовут
			console.log("Snickers says: Hi, i'm a "+this.name)
			i > 2 ? clearInterval(interval) : ++i;
		}, 1000);
	}
}
snickers.sayHi();

// теперь очередт "умной" шоколадки
let nuts = {
	name: "Nuts",
	// такой же метод
	sayHi: function(){
		var i = 0;
		// за исключением того, что теперь мы используем стрелочную функцию
		// мы знаем, что она наследует контекст родителя, а это нам и нужно
		// шоколадка не забудет как ее звать, потому что контекст не потеряется
		var interval = setInterval(()=> {
			console.log("Nuts says: Hi, i'm a "+this.name)
			i > 2 ? clearInterval(interval) : ++i;
		}, 1000);
	}
}
nuts.sayHi();

// создадим массив для демонстрации еще одного примера использования
var fruits = [
	{name: 'banana', price: 3},
	{name: 'apple', price: 6},
	{name: 'melon', price: 2},
	{name: 'watermelon', price: 4},
	{name: 'lime', price: 7},
	{name: 'orange', price: 5}
]
// у массива есть метод .filter(), который принимает функцию
// к котоаря в свою очередь должна вернуть true или false
// что укажет методу .filter() попадает ли элемент в новый массив или нет
var filteredFruits2 = fruits.filter(function(f){
	// должна вернуть true или false
	return f.price > 4 ? true : false
});
// apple, lime, orange
console.log(filteredFruits2)

// НО! Мы знаем, что стрелочная функция призвана упростить рутинные задачи
// поэтому используя ее мы можем заменить код выше всего одной строчкой
// {f} - сокращенно от {f}ruit
var filteredFruits1 = fruits.filter(f => f.price > 4);
// apple, lime, orange
console.log(filteredFruits1)