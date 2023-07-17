// // const events = require("events");
// // const event = new events.EventEmitter();
// // event.on("click", () => console.log("First event Created"));
// // event.emit("click");

// const password = require("password");

// // const events = require("events");
// // const event = new events.EventEmitter();
// // const first_event = function (n1, n2) {
// //   console.log(n2 * n1);
// // };
// // event.on("click", first_event);
// // event.emit("click", 30, 40);

// // const events = require("events");
// // const event = new events.EventEmitter();

// // const first_event = function (n1, n2) {
// //   console.log(n2 * n1);
// //   event.emit("click2");
// // };
// // const sec_event = function () {
// //   console.log("second event triggered");
// // };
// // event.on("click", sec_event);
// // event.on("click", first_event);

// // event.emit("click", 30, 40);

// function Student(first_name, last_name) {
//   this.first_name = first_name;
//   this.last_name = last_name;
// }

// Student.prototype.display_full_name = function () {
//   return `${this.first_name}${this.last_name}`;
// };

// const Student1 = new Student("abhimanyu", "singh");
// const Student2 = new Student("deepak", "puniya");

// console.log(Student1.display_full_name());
// console.log(Student2.display_full_name());

// ----------------------- OOPS CODING ----------------------

// class User {
//   #password;

//   constructor(name, userName, password) {
//     this.name = name;
//     this.userName = userName;
//     this.#password = password;
//   }
//   login(userName, password) {
//     if (userName === this.userName && password === this.#password) {
//       console.log("Login Successfully");
//     } else {
//       console.log("Authentication Failed");
//     }
//   }
//   setPassword(newPassword) {
//     this.#password = newPassword;
//   }
//   getPassword() {
//     return this.#password;
//   }
// }

// const obj1 = new User("anbhi", "asdf", "asdf@123");
// const obj2 = new User("anbhijdjsf", "dfsdasdf", "dsfasdf@123");

// obj1.login("anbhi", "asdf@123"); // Login Successfully
// obj2.login("anbhijdjsf", "dsfasdf@123"); // Login Successfully

// console.log(obj1.name); // anbhi
// console.log(obj1.getPassword()); // asdf@123

// obj1.setPassword("new Password");
// obj1.login("anbhi", "dsfasdf@123"); // Authentication Failed
// obj1.login("anbhijdjsf", "new Password"); // Login Successfully

console.log("hello guys");

console.log("cad");

console.log("car");
