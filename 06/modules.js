// импорт в commonjs производится при помощи require();
var add = require('./modules/add');

// в ES6 импорт выглядит лаконичнее
// import { add } from './modules/add';

// в эквиваленте AMD
// requirejs(["modules/add"], function(add){  });

// проверим результат работы
console.log(add(1,2));