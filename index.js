import { airlines, flights_jan_01_2008 } from "./db.js";

//array after filtering INVALID data from our database
const array = flights_jan_01_2008.filter((ele) => {
  return (
    ele !== null &&
    ele.hasOwnProperty("airline") &&
    ele.airline !== "" &&
    ele.airline != "abc" &&
    ele.time != "abc" &&
    ele.hasOwnProperty("time")
  );
});

const tableElement = document.getElementById("table");

//creating table dynamically

let createTable = `<table style="width:100%"><tr><th>Airline</th>`;
for (let i = 1; i <= 24; i++) {
  createTable += `<th>${i}</th>`;
}
createTable += `</tr>`;

for (const name in airlines) {
  createTable += `<tr><td>${airlines[name]}</td>`;
  for (let i = 1; i <= 24; i++) {
    createTable += `<td>${compute(name, i)}</td>`;
  }
  createTable += `</tr>`;
}

//This function calculates the number of flights in that particulat hour
function compute(x, k) {
  let tmpArray = array.filter(function (el) {
    return (
      el.airline == x &&
      parseInt(el.time.slice(0, 2)) >= k - 1 &&
      parseInt(el.time.slice(0, 2)) < k
    );
  });

  return tmpArray.length === 0 ? "-" : tmpArray.length;
}

tableElement.innerHTML = createTable;
