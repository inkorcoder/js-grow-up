// класс описывается с помощью ключевого слова `class`
class Chocolate {
	// самая главная его часть - это конструстор
	// его задача создать объект с указанными свойствами
	constructor(name, type, price) {
		this.name = name;
		this.type = type;
		this.price = price;
		// прямо из конструктора мы уже можем вызывать методы этого класса
		// в контексте новосозданного объекта
		this.sayHi();
	}
	sayHi() {
		// мы уже знаем про шаблонные строки, поэтому задача не сложная
		console.log(`
			Hi! I'm a ${this.name}
			type: ${this.type}
			price: ${this.price}`
		.replace(/^\t{2}/gim, ''))
	}
}
// создадим шокошалку экземпляр этого класса
let snickers = new Chocolate("Snickers", "dark", 20);


// наследование классов выполняется путем расширения
// класса-родителя новыми свойствами и методами
class Nuts extends Chocolate {
	// в нем так же есть свой конструктор
	constructor(name, type, price) {
		// но теперь в нем есть объект `super` - это класса-родитель
		// чтобы все сработало как нужно - нам следует вызвать сначала
		// конструктор родителя
		super(name, type, price);
		// а уже после этого обавлять новые свойства и методы
		this.isInherited = true;
	}
	// новый метод
	getPrice() {
		console.log(`\tHi again! My price is ${this.price}\n`);
	}
}
let nuts = new Nuts("Nuts", "with nuts", 20);
nuts.getPrice();


// так же, мы можем создавать статические свойства и методы
// для этого нужно использовать ключевое слово `static`
// статические свойства не меняются от объекта к объекту
// а хранятся в самом классе
// самый простой пример - счетчик созданных экземпляров
// class ChocolateConstructor {
// 	public static createdCount = 0;
// 	constructor() {
// 		this.createdCount++;
// 	}
// }