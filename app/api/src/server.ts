/* This file is the server entry point; which boots the server [i.e starts the BE server, chooses the port, etc]
Note: Uses the Express app created in app.ts*/

import "dotenv/config"; // Load environment variables from a .env file into process.env, allowing configuration of the server using environment variables
import { createApp } from "./app"; // import the createApp function from the app module, which sets up and configures the Express application

const app = createApp(); // Create an instance of the Express app by calling the createApp function, which returns a configured Express application ready to handle requests
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000; // Use the PORT environment variable or default to 3000

// Start the server and listen on the specified port, logging a message to the console when the server is running
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log a message when the server starts successfully
});