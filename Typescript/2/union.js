function combine(input1, input2, resultConversion // allow only these 2 values
) {
    var result;
    if (resultConversion === 'as-number' || (typeof input1 === 'number' && typeof input2 === 'number')) {
        result = +input2 + +input1;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var combinedAges = combine(25, 28, 'as-number');
var combinedAges2 = combine('25', '28', 'as-number');
var combinedNames = combine('chanuka', 'Chathuranga', 'as-string');
console.log(combinedAges);
console.log(combinedAges2);
console.log(combinedNames);
