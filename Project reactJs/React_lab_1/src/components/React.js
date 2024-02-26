import React from "react";
function HelloWorld() {
  return <div>Hello, World!</div>;
}
export default HelloWorld;
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}

const person = new Person("John", 25);
person.sayHello();
