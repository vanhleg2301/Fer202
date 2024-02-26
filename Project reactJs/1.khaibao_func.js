// let greet = (name, time) => {
//   console.log(`Hi ${name} and ${time}`);
// };
// greet("Vanh", "123");

// let bp = (number) => number * number;
// console.log(bp(6));

// let chan_le = (a) => {
//   if (a % 2 == 0) {
//     console.log(`so chan: ${a}`);
//   } else {
//     console.log(`so le: ${a}`);
//   }
// };
// chan_le(0);

// cachs 2
// function chan_le(a) {
//   if (a % 2 == 0) {
//     console.log(`so chan: ${a}`);
//   } else {
//     console.log(`so le: ${a}`);
//   }
// }
// chan_le(0);

let greet = (name, time = "morning") => {
  console.log(`hello ${name} in ${time}`);
};

greet("vanh");

function greet1(name, time) {
  console.log("hello " + name);
}

greet1();

let square = (num) => {
  return num * num;
};

console.log(square(3));

// let - chỉ cho phép truy cập trong phạm vi khai báo
// arrow function
let person = {
  name: "vanh",
  age: "20",
  greet: function () {
    console.log(`${this.name}+${this.age}`);
  },
};

console.log(person.greet());

// kiem tra so nguyen to
function prime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      // phép tính % trả về 2 giá trị 0 là chia hết, 1 là có số dư
      return false;
    }
    return true;
  }
}

const numberCheck = 12;

if (prime(numberCheck)) {
  console.log("so nguyen to");
} else {
  console.log("ko phai so nguyen to");
}
