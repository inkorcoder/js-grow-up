/*
	helpers
*/
// get binary from decimal
function bin(number){
	return (number >>> 0).toString(2);
};
// get binary from string
Number.prototype.toBin = function(){
	return bin(this);
};
// display 32-bit string
String.prototype.fixBin = function(){
	function addZeros(num) {
		let string = "";
		while (num > 0) {
			string += "0"; num--
		}
		return string;
	}
	return this.length < 32 ? addZeros(32 - this.length)+this : this;
};
// debugging. comparing two numbers and difference
function debug(a, b, c) {
	console.log(
		bin(a).fixBin()+"\n"+
		(b !== null ? bin(b).fixBin()+"\n" : '')+
		bin(c).fixBin()+" ["+bin(c)+"] => ["+c+"]"
	)
}

/*
	примеры
*/
// AND
function BinAnd(a, b) {
	console.log("binary AND [a & b]");
	debug(a, b, a & b);
	console.log("\n");
}
// OR
function BinOr(a, b) {
	console.log("binary OR [a | b]");
	debug(a, b, a | b);
	console.log("\n");
}
// XOR
function BinXor(a, b) {
	console.log("binary XOR [a ^ b]");
	debug(a, b, a ^ b);
	console.log("\n");
}
// NOT
function BinNot(a) {
	console.log("binary NOT [~a]");
	debug(a, null, ~a);
	console.log("\n");
}
// LEFT SHIFT
function BinShiftLeft(a, b) {
	console.log("binary LEFT SHIFT [a << b]");
	debug(a, b, a << b);
	console.log("\n");
}
// RIGHT SHIFT
function BinShiftRight(a, b) {
	console.log("binary RIGHT SHIFT [a >> b]");
	debug(a, b, a >> b);
	console.log("\n");
}
// RIGHT SHIFT WITH ZERO
function BinShiftZero(a, b) {
	console.log("binary RIGHT SHIFT ZERO [a >>> b]");
	debug(a, b, a >>> b);
	console.log("\n");
}

BinAnd(5, 12);
BinOr(5, 12);
BinXor(5, 12);
BinNot(5);
BinShiftLeft(5, 12);
BinShiftRight(5, 12);
BinShiftZero(12, 2);