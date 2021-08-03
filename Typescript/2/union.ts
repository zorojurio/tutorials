type CombinableNumber = number;
type CombinableUnion = number | string;
type conversionDescriptor = 'as-string' | 'as-number'

function combine(
    input1: CombinableUnion,
    input2: CombinableUnion,
    resultConversion: conversionDescriptor // allow only these 2 values
) {
    let result;
    if (resultConversion === 'as-number' ||( typeof input1 === 'number' && typeof input2 === 'number')){
        result = +input2 + +input1;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combinedAges = combine(25,28, 'as-number');
const combinedAges2 = combine('25','28', 'as-number');
const combinedNames = combine('chanuka', 'Chathuranga', 'as-string');
console.log(combinedAges);
console.log(combinedAges2);
console.log(combinedNames);
