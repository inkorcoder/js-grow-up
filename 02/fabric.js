// фабрика
var chocolateFabric = function(name, type, price){

	// создает новый временный объект, не привязывается к контексту функции
	var temp = {};

	// записывает свойства во временный объект
	temp.name = name;
	temp.type = type;
	temp.price = price;

	// а так же метод, который вернет всю информацию о шоколадке
	// в данном случае this указывает на объект temp, а не на функцию
	temp.getStick = function(){
		console.log("\n");
		console.log("Stick of "+this.name+"\n"+"type: "+this.type+"\n"+"price: "+this.price+"$");
		console.log("\n");
	}

	// и возвращает сам объект
	return temp;

}

var snickers = chocolateFabric('Snickers', 'with nuts', 20);
snickers.getStick();