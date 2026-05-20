import { handler } from "./index.mjs";

const event = {
  pathParameters: {
    ID: "Computer Science"
  }
};

const result = await handler(event);

console.log(result);
console.log(JSON.parse(result.body));