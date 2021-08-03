function add(num1: number, num2: number): number {
    if (typeof num1 !== 'number' || typeof num2 !== 'number'){
        throw new Error("Incorrect Input!");
    }
    return num1 + num2;
}


const num1 = 7;
const num2 = 2.5;

const result = add(num1, num2);
console.log(result)
