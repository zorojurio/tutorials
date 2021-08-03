function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result ' + num);
}
var combineValues;
combineValues = add;
printResult(combineValues(2, 1));
