var hobbyList = ['sports', 'cooking', 'fishing'];
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["STAFF"] = 1] = "STAFF";
    Role[Role["AUTHER"] = 2] = "AUTHER";
})(Role || (Role = {}));
var person = {
    name: "chanuka",
    age: 25,
    hobbies: hobbyList,
    role: Role.STAFF
};
console.log(typeof Role.ADMIN);
console.log(person);
