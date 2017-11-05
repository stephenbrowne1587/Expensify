// const person = {
//   name: "The S man",
//   age: 300,
//   location: {
//     city: "Toronto",
//     temp: 7
//   }
// };
// // const name = person.name;
// // const age = person.age;
// const { name: firstName = "Fuck Face", age} = person;
// console.log(
//   `${firstName} is ${age} years old.` )

// const {city, temp: temperature} = person.location;

// if (city && temperature){
//   console.log(`It's ${temperature} in ${city}`)
// }

// Array destructuring

// const address = ["1299 S Juniper Street", "Toronto", "Ontario",
//  "M8W 1B2"];
//  const [, city, state = "Northwest Territories"] = address;
//  console.log(`You are in ${city} ${state}`);

 const item = ["Coffee (really hot)", "$2.00", "$244.50", "$2.75"];
 const [type, , mPrice] = item;

 console.log(`A medium ${type} costs ${mPrice}`)
 console.log(`A medium Coffee (hot) costs $2.50`)
