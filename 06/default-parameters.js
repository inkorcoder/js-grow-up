// параметры по умолчанию указываются сразу же при 
function loopThrough(start = 0, end = 10) {
	// если бы мы не знали этого, то могли бы пойти
	// старым проверенным путем типа:
	// var start = start || 0;
	// var end 	= end || 10;
	for (let i = start; i <= end; i++){
		console.log("Curent counter is: "+i);
	}
}

// проверим как работает функция, когда мы задаем параметры вручную
console.log("\nFirst loop [2...6]");
loopThrough(2, 6);

// и как она работает когда параметры не укзаываются.
console.log("\nSecond loop [0...10]");
loopThrough();
console.log('\n');