// прототип
function Chocolate(){

	// по умолчанию в функции будет записываться одно свойство
	this.type = 'dark chocolate';

	// не возвращает ничего, потому что вызовется с ключевым словом new
	// и создатся новый контекст

};

// используя prototype определяем новые свойства
Chocolate.prototype.price = 10;
// и методы
// при этом так же контекст остается на прототипе, тоесть на функции Chocolate
// и будет у каждого экземпляра своим
Chocolate.prototype.getStick = function(){
	console.log("\n");
	console.log("Stick of "+this.name+"\n"+"type: "+this.type+"\n"+"price: "+this.price+"$");
	console.log("\n");
}

// создаем новый экземпляр
roshen = new Chocolate();
// записываем в него имя
roshen.name = "Roshen Chocolate";
roshen.getStick();

// смотрим, есть ли свойство name (true|true)
console.log("[name in]: "+("name" in roshen));
console.log("[hop name]: "+roshen.hasOwnProperty("name"));

// смотрим, есть ли свойство price (true|false)
console.log("[name in]: "+("price" in roshen));
console.log("[hop name]: "+roshen.hasOwnProperty("price"));

// смотрим, есть ли свойство type (true|true)
console.log("[name in]: "+("type" in roshen));
console.log("[hop name]: "+roshen.hasOwnProperty("type"));