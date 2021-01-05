import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

//callback implementation(scrypt) to promise implementation
const scryptAsync = promisify(scrypt);

export class Password {
  //give this class 2 static method (static is method without creating instance of a class )
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    //console.log(`${buf.toString("hex")}.${salt}`);
    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storePassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storePassword.split("."); // destructuring data from array
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
