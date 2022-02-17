//Installing and setting up Mongoose:
const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => (err ? console.log(err) : console.log("connected to database"))
);

app.listen(process.env.PORT, (err) =>
  err
    ? console.error(err)
    : console.log(`server is running on ${process.env.PORT}`)
);

let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);
let person = new Person({
  name: "Raouaa Thamri",
  age: 26,
  favoriteFoods: ["candy", "sandwich"],
});

console.log(person);

//Create and Save a Record of a Model

var createAndSavePerson = function (done) {
  let Rihab = new Person({
    name: "Rihab",
    age: 26,
    favoriteFoods: ["icecream"],
  });

  Rihab.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

//Create Many Records with model.create()

let arrayOfPeople = [
  {
    name: "Oumayma",
    age: 25,
    favoriteFoods: ["fried chicken", "Pizza", "chips"],
  },
  { name: "Ahmed", age: 24, favoriteFoods: ["watermelon", "mango"] },
  { name: "Malek", age: 29, favoriteFoods: ["Spaghetty"] },
];

var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, (error, createdPeople) => {
    if (error) {
      console.log(error);
    } else {
      done(null, createdPeople);
    }
  });
};
//Using model.find()
var findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, (error, arrayOfResults) => {
    if (error) {
      console.log(error);
    } else {
      done(null, arrayOfResults);
    }
  });
};

//Using model.findOne()
var findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: { $all: [food] } }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      done(null, result);
    }
  });
};

//Using model.findById()
var findPersonById = function (personId, done) {
  Person.findById(personId, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      done(null, result);
    }
  });
};

//Performing Classic Updates
var findEditThenSave = function (personId, done) {
  var foodToAdd = "hamburger";

  Person.findById(personId, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      result.favoriteFoods.push(foodToAdd);
      result.save((error, updatedResult) => {
        if (error) {
          console.log(error);
        } else {
          done(null, updatedResult);
        }
      });
    }
  });
};

//Performing New Updates
var findAndUpdate = function (personName, done) {
  var ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (error, updatedRecord) => {
      if (error) {
        console.log(error);
      } else {
        done(null, updatedRecord);
      }
    }
  );
};

//Delete
var removeById = function (personId, done) {
  Person.findByIdAndRemove(personId, (error, deletedRecord) => {
    if (error) {
      console.log(error);
    } else {
      done(null, deletedRecord);
    }
  });
};

// Delete with model.remove()
var removeManyPeople = function (done) {
  var nameToRemove = "Moez";
  Person.remove({ name: nameToRemove }, (error, JSONStatus) => {
    if (error) {
      console.log(error);
    } else {
      done(null, JSONStatus);
    }
  });
};

//Searching Query Helpers
var queryChain = function (done) {
  var foodToSearch = "Spaghetty";

  Person.find({ favoriteFoods: { $all: [foodToSearch] } })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((error, filteredResults) => {
      if (error) {
        console.log(error);
      } else {
        done(null, filteredResults);
      }
    });
};
