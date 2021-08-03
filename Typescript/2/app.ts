let hobbyList: string[] = ['sports', 'cooking', 'fishing'];

enum Role {
    ADMIN,
    STAFF,
    AUTHER
}
const person: {
    name: string;
    age: number;
    hobbies: string[],
    role: number
} = {
    name: "chanuka",
    age: 25,
    hobbies: hobbyList,
    role: Role.STAFF
};


console.log(typeof Role.ADMIN); // type number
console.log(person);


