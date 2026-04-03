// Load environment variables from a .env file into process.env, allowing configuration of the script using environment variables
import 'dotenv/config'; 
import fs from 'fs/promises';

// Use the THEIRSTACK_BASE_URL environment variable or default to the TheirStack API base URL
const BASE_URL = process.env.THEIRSTACK_BASE_URL || 'https://api.theirstack.com';

// Get the API key from the environment variable
const API_KEY = process.env.THEIRSTACK_API_KEY; 

if (!BASE_URL || !API_KEY) {
    // Log an error if either the base URL or API key is missing
    console.error('Error: THEIRSTACK_BASE_URL and THEIRSTACK_API_KEY must be set in the environment variables.');
    process.exit(1); // Exit the script with an error code
}

async function saveDataToFile(jobs: unknown[]) {
    await fs.writeFile(
        'src/scripts/samples/rawJobSamples.json', 
        JSON.stringify(jobs, null, 2), 
        'utf-8');

    console.log(`\n Saved ${jobs.length} jobs to src/scripts/rawJobSamples.json`);
}

async function testApiPull() {
    try {
        // Make a GET request to the /v1/me endpoint of the TheirStack API to retrieve user information
        const response = await fetch(`${BASE_URL}/v1/jobs/search`, {
            method: 'POST', // Use POST method for the search endpoint
            headers: {
                'Authorization': `Bearer ${API_KEY}`, // Include the API key in the Authorization header
                'Content-Type': 'application/json', // Set the Content-Type header to application/json
            },
            body: JSON.stringify({
                // REQUIRED: TheirStack's job search endpoint requires a query parameter to specify the search term
                posted_at_max_age_days: 7, // Filter jobs posted within the last 7 days
                job_country_code_or: ['US'], // Filter jobs located in the United States
                
                // OPTIONAL: You can include additional parameters to refine the search results
                // keep small so credentials are not exhausted during testing
                limit: 1, // Limit the number of results to 1 for testing purposes
                page: 0, // Start from the first result
            }),
        });

        console.log('API Response Status:', response.status); // Log the HTTP status code of the response

        if (!response.ok) {

            // If the response is not successful (status code is not in the 200-299 range), log an error message
            console.error('Error fetching data from TheirStack API:', response.statusText);
            return; // Exit the function if the API call was unsuccessful
        }

        const data = JSON.parse(await response.text()); // Parse the response body as JSON

        // Log the retrieved data to the console for verification 
        console.log('Success! API Response Data:', JSON.stringify(data, null, 2)); 

        // Attempt to access the jobs array from the response using common keys, defaulting to an empty array if not found
        const jobs = data.data ?? data.results ?? data.jobs ?? []; 

        // Print the retrieved data in a readable format
        console.log('Retrieved Jobs: \n');

        if (Array.isArray(jobs) && jobs.length > 0) {
            jobs.forEach((job: any, index: number) => {
                const title = job.job_title ?? job.title ?? 'N/A'; // Use job_title if available, otherwise fallback to title
                const company = job.company_name ?? job.company ?? 'N/A'; // Use company_name if available, otherwise fallback to company
                const location = job.location ?? job.short_location ?? 'N/A'; // Use location if available, otherwise default to 'N/A'

                // Log the job title, company, and location in a readable format
                console.log(`${index + 1}. ${title} at ${company} (${location})`);
            });
        } else {
            console.log('No jobs found in the API response.');
        }

        // Log the total number of jobs returned in the response
        console.log('\n Total Jobs Returned:', jobs.length);

        await saveDataToFile(jobs); // Save the retrieved jobs data to a file for further analysis

    } catch (error) {
        console.error('Error during API call:', error); // Log any errors that occur during the API call
    }

}

// Execute the testApiPull function to perform the API call and log the results
testApiPull();
