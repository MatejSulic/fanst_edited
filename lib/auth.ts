import fs from "fs";

export const jwtPrivateKey = fs.readFileSync("./jwtRS256.key");
export const jwtPublicKey = fs.readFileSync("./jwtRS256.key.pub");
