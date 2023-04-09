const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;
const connectionUrl = "mongodb://127.0.0.1:27017";
const dbname = "db1";

mongoClient.connect(connectionUrl, (error, res) => {
  if (error) {
    return console.log("error has occured");
  }
  console.log("good");
  const db = res.db(dbname);

  for (let i = 1; i <= 2; i++) {
    db.collection("users").insertOne(
      {
        name: "ahmed" + i,
        age: 26,
      },
      (error, data) => {
        if (error) {
          console.log("Unable to insert Data");
        }
        console.log(data.insertedId);
      }
    );
  }

  db.collection("users").insertMany(
    [
      {
        name: "islam",
        age: 27,
      },
      {
        name: "adel",
        age: 27,
      },
      {
        name: "reem",
        age: 27,
      },
      {
        name: "tasneem",
        age: 27,
      },
      {
        name: "aya",
        age: 27,
      },
      {
        name: "Ali",
        age: 22,
      },
      {
        name: "Mohammed",
        age: 40,
      },
      {
        name: "sayed",
        age: 23,
      },
      {
        name: "ramy",
        age: 24,
      },
      {
        name: "eyad",
        age: 25,
      },
    ],
    (error, data) => {
      if (error) {
        console.log("Unable to insert data");
      }
    }
  );

  // Find Age 27
  db.collection("users")
    .find({ age: 27 })
    .toArray((error, users) => {
      if (error) {
        return console.log("error has occured");
      }
      console.log(users);
    });

  // Find age 27 with limit 3
  db.collection("users")
    .find({ age: 27 })
    .limit(3)
    .toArray((error, users) => {
      if (error) {
        return console.log("error has occured");
      }
      console.log(users);
    });

  // update name for first 4
  db.collection("users")
    .find({})
    .limit(4)
    .toArray((err, res1) => {
      if (err) {
        console.log(err);
      }
      console.log(res1);
      res1.forEach((element) => {
        db.collection("users")
          .updateOne({ _id: element._id }, { $set: { name: "Osama" } })
          .then((data1) => {
            console.log(data1.modifiedCount);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });

  // update name for first 4
  db.collection("users")
    .find({})
    .limit(4)
    .toArray((err, res1) => {
      res1.forEach((element) => {
        db.collection("users")
          .updateOne({ _id: element._id }, { $inc: { age: 4 } })
          .then((data1) => {
            console.log(data1.modifiedCount);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });

  // update all age add 10
  db.collection("users")
    .updateMany({}, { $inc: { age: 10 } })
    .then((data1) => {
      console.log(data1.modifiedCount);
    })
    .catch((error) => {
      console.log(error);
    });

  // delete user age 41
  db.collection("users")
    .deleteMany({ age: 41 })
    .then((data) => {
      console.log(data.deletedCount);
    })
    .catch((error) => {
      console.log(error);
    });
});

//////////////////////////////////////////////////////////////

// insertOne( Doc , options , callback )

// db.collection("users").insertOne(
//   {
//     name: "ahmed",
//     age: 26,
//   },
//   (error, data) => {
//     if (error) {
//       console.log("Unable to insert Data");
//     }
//     console.log(data.insertedId);
//   }
// );

////////////////////////////////////////////////////////////
// db.collection("users").insertMany(
//   [
//     {
//       name: "islam",
//       age: 20,
//     },
//     {
//       name: "adel",
//       age: 30,
//     },
//     {
//       name: "reem",
//       age: 24,
//     },
//     {
//       name: "tasneem",
//       age: 24,
//     },
//     {
//       name: "aya",
//       age: 25,
//     },
//   ],
//   (error, data) => {
//     if (error) {
//       console.log("Unable to insert data");
//     }
//     // console.log(data.insertedCount)
//   }
// );
// /////////////////////////////////////////////////////////////////////

// // findOne (query , options , callback )

// db.collection("users").findOne(
//   { _id: mongodb.ObjectId("642c94f0a64ed98952aa1efe") },
//   (error, user) => {
//     if (error) {
//       console.log("Unable to insert data");
//     }
//     console.log(user);
//   }
// );

// ///////////////////////////////////////////////////////////////////

// // to get data that match filter

// db.collection("users")
//   .find({ age: 24 })
//   .toArray((error, users) => {
//     if (error) {
//       return console.log("error has occured");
//     }
//     console.log(users);
//   });

// ///////////////////////////////////////////////////////////////////////
// // number
// db.collection("users")
//   .find({ age: 24 })
//   .count((error, users) => {
//     if (error) {
//       return console.log("error has occured");
//     }
//     console.log(users);
//   });

// db.collection("users")
//   .find({ age: 24 })
//   .limit(3)
//   .toArray((error, users) => {
//     if (error) {
//       return console.log("error has occured");
//     }
//     console.log(users);
//   });

// Update Operators
// $set => modify
// $inc => to add

// modifiedCount

// db.collection("users")
//   .updateOne(
//     { _id: mongodb.ObjectId("6432a576a24b90860949c044") },
//     { $set: { name: "Osama" }, $inc: { age: 4 } }
//   )
//   .then((data1) => {
//     console.log(data1.modifiedCount);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// db.collection("users")
//   .updateMany({}, { $inc: { age: 10 } })
//   .then((data1) => {
//     console.log(data1.modifiedCount);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// db.collection("users")
//   .deleteOne({ _id: mongodb.ObjectId("6432a57b1b864651d79b1ae9") })
//   .then((data) => {
//     console.log(data.deletedCount);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// db.collection("users")
//   .deleteMany({ age: 34 })
//   .then((data) => {
//     console.log(data.deletedCount);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
