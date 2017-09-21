// динамический прототип
var ChockolatePrototype = function(name, type, price){

	// навешивает переменные, как и просто прототип
	this.name = name;
	this.type = type;
	this.price = price;

	// если при вызове конструктора метод не существует, то он будет добавлен в пространство протоиипа
	// тоесть если мы вызываем его первый раз - функция добавится, иначе услови е не сработает и проигрнорируется
	if (typeof this.getStick !== 'function'){

		// выводим в консоль оповещение, чтобы увидеть когда произошла запись
		console.log("creating 'getStick' method");
		// и чтобы убедиться - выставляем флажок чтобы увидеть когда был определен метод
		this.wasGetStickAccessible = false;

		// навешиваем сам метод
		ChockolatePrototype.prototype.getStick = function(){
			console.log("\n");
			console.log("Stick of "+this.name+"\n"+"type: "+this.type+"\n"+"price: "+this.price+"$");
			console.log("\n");
		};

	// если он уже существует (оесть это не первый вызов) - то ставим флажок в true
	} else {
		this.wasGetStickAccessible = true;
	}

	// не возвращает ничего, потому что создается новый контекст

}

var snickers = new ChockolatePrototype("Snickers", "Nuts", 30);
snickers.getStick();
console.log(snickers.wasGetStickAccessible); // false

var nuts = new ChockolatePrototype("Nuts", "Nuts", 10);
nuts.getStick();
console.log(nuts.wasGetStickAccessible); // true