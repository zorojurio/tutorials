function addAndHandler(n1: number, n2: number, cb: (result: number) => void) {
    const result = n1 + n2;
    cb(result);
}


addAndHandler(10, 5,  (num) => {
    console.log(num);
});
