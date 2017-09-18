console.log('\n');

// самый простой способ создать объект
var myObj = {};

// то же самое можно занписать так
var myObj2 = Object.create(Object.prototype);

// так же, свойствам объекта можно указать геттер и сеттер
var cat = Object.create(Object.prototype, {
	voice: {
		// геттер (отдает значение свойства)
		get: function () {
			return 'myawww'
		},
		// сеттер (устанавливает новое значение)
		set: function(newValue){
			console.log('voice changed to '+newValue)
		}
	}
});
console.dir("[cat] "+cat.voice); // получаем свойство (get)
console.dir("[cat] "+(cat.voice = 'wofff')); // устанавливаем свойство (set)
console.log('\n');

// то же самое можно проделать с Object.defineProperty() (дескриптор)
var dog = {};
Object.defineProperty(dog, "name", {
	value: "Maya", // значение свойства
	writable: true, // можно переписать
	configurable: true, // его можно будет удалить и переопределить
	enumerable: true // виден в цикле for..in
});
console.dir("[dog] "+(dog.name));
console.log('\n');

// а теперь сделаем так, чтобы свойство нельзя было переписать, тоесть оно станет константой (неизменяемым)
Object.defineProperty(dog, "name", {
	value: "Constant", // значение свойства
	writable: false, // можно переписать
	configurable: false, // его можно будет удалить и переопределить
	enumerable: true // виден в цикле for..in
});
console.dir("[dog] "+(dog.name)); // Maya
// попробуем установить новое значение
dog.name = "Maya";
console.dir("[dog] "+(dog.name)); // казалось бы, должно быть Maya, но свойство теперь неизменяемое
console.log('\n');