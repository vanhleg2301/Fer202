var people = [
  { name: "Jack", age: 50 },
  { name: "Michael", age: 9 },
  { name: "John", age: 40 },
  { name: "Ann", age: 19 },
  { name: "Elisabeth", age: 16 },
];

// // 1.1 in ra teen dau tien
// // cách 1
// var teen = people.find((person) => person.age >= 10 && person.age <= 20);
// console.log(teen);

// // cách 2
// function checkTeen() {
//   for (let i = 0; i < people.length; i++) {
//     if (people[i].age >= 10 && people[i].age <= 20) {
//       return people[i];
//       break;
//     }
//   }
// }
// console.log(checkTeen());

// //1.2 in ra tat ca teen
// var a = [];
// function checkTeen2() {
//   for (let i = 0; i < people.length; i++) {
//     if (people[i].age >= 10 && people[i].age <= 20) {
//       a.push(people[i]);
//     }
//   }
// }
// checkTeen2();
// console.log(a);

//1.3 check xem co phai teen ko
var a = [];
function checkTeen3() {
  for (let i = 0; i < people.length; i++) {
    if (people[i].age >= 10 && people[i].age <= 20) {
      a.push(people[i]);
    }
  }
}
checkTeen3();
console.log(a);
