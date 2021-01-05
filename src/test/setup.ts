//Using {} also only imports specific components from the module
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

// to tell typescript there is a global property call signin
declare global {
  namespace NodeJS {
    interface Global {
      //a function that will return a promise
      signin(): Promise<string[]>; // Promise as type array of string /resolve value
    }
  }
}

let mongo: any;
//define hook func to run before all test is execute
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri(); // get url to connect to it
  //console.log("mongoUri", mongoUri);
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// run before each of the test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections(); // get all the collections exist

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

//after all test complete run this to stop mongo server and disconnect
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

//global scope function
global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
