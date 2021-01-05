import mongoose from "mongoose";
import { Password } from "../services/password";

// an interface that describes the properties
// that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has entire collection user looks like or methods associates with the user model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc; //return any
}

//An interface that describes the properties
// that a single User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      //modify the json output
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; //remove password property form the object(js)
        delete ret.__v;
      },
    },
  }
);
//not using arrow function due to this being overwritten
//and use the done arg function for async await in moogose middleware
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

//custom function to build in a model mongoose
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
