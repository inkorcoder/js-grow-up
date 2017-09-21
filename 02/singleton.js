// синглтон
// описывается в самовызывающейся функции (Immediate Invoked Function)
var Singleton = (function () {

	// в области видимости создается переменная, которая и будет экземпляром
	var instance;

	// функция для создания экземпляра
	function createInstance() {
		var object = new Object("I am the instance");
		return object;
	}

	// мы возвращаем объект с методом для создания экземпляра, так же тут могут быть и другие методы
	return {
		getInstance: function () {
			// суть Lazy Load в том, что если эеземпляра нет, то он создается и возвращается
			if (!instance) {
				instance = createInstance();
			}
			// если он есть, то он просто возвращается
			return instance;
		}
	};

})();

var instance1 = Singleton.getInstance(); // 1
var instance2 = Singleton.getInstance(); // 2

console.log("\n");
console.log("Один и тот же экземпляр: " + (instance1 === instance2));
console.log("\n");