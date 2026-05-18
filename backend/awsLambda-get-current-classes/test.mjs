//test file for get current classes function 

import { handler } from "./getCurrentClasses.mjs";

const event = {
    pathParameters: {
        ID: "1"
    }
};



const result = await handler (event);

console.log("Lambda Response: ")
console.log(result)
//check for a connection 

console.log("\nParsed body:");
console.log(JSON.parse(result.body))
//print the users current classes

