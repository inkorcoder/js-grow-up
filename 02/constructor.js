// конструктор
function chocolateConstructor(name, type, price){

	// не создает временный объект, вместо этого свойства и методы вешаются на созданный функцией контекст
	this.name = name;
	this.type = type;
	this.price = price;

	// метод в данном случае ссылается на контекст функции, поэтому здесь this - это контекст функции
	this.getStick = function(){
		console.log("\n");
		console.log("Stick of "+this.name+"\n"+"type: "+this.type+"\n"+"price: "+this.price+"$");
		console.log("\n");
	}

	// и ей не нужно возвращать объект, потому что при вызове функции с ключевым словом new
	// создается новый контекст, и в нем описываются свойства и методы

}

var snickers = new chocolateConstructor('Snickers', 'dark chocolate', 15);
snickers.getStick();