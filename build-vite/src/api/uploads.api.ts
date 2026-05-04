import { useAuth } from "../App";
/* SOURCE CODE TYPESCRIPT FILE FOR HANDLING API UPLOADS FOR:
        - ResumeUploadPage.tsx
        - TranscriptUploadPage.tsx
*/

/*
    type: Type
    var name: UploadResponse
    description: The response object containing the pre-signed URL and the key for the uploaded file
    - uploadUrl: string - the pre-signed URL for uploading the file to S3
    - key: string - the key for the uploaded file in S3, used to access the file after upload
*/
const { tokens } = useAuth();
const token = tokens?.idToken; // Assuming you have the token available from your auth context
export type UploadResponse = {
    uploadUrl: string;
    key: string;
};
const UPLOAD_FILE_API_URL = import.meta.env.VITE_UPLOAD_FILE
const STORE_TRANSCRIPT_KEY_API_URL = import.meta.env.VITE_STORE_TRANSCRIPT_KEY
const STORE_RESUME_KEY_API_URL = import.meta.env.VITE_STORE_RESUME_KEY

/*
    type: Function
    name: getUploadUrl
    Description: This function takes a file and returns the uploadUrl and key
    Input: file - the file to be uploaded
    Output: Promise<UploadResponse> - a promise resolving to the upload response object
*/
async function getUploadUrl(file: File): Promise<UploadResponse> {

    // calls for API Gateway URL of upload-resume / transcript
    const res = await fetch(UPLOAD_FILE_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Lambda verifies this and extracts sub using the API Gateway
        },
        body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
        }),
    });

    // If HTTP request unsuccessful, throw an error
    if (!res.ok) {
        throw new Error("Failed to Retrieve Upload URL.");
    }

    // Returns https urls as JavaScript objects
    return res.json();

}

/*
    type: Function
    name: uploadToS3
    Description: This function uploads a file to S3 using the provided upload URL
    Input: uploadUrl - the pre-signed URL for uploading the file to S3
           file - the file to be uploaded
    Output: Promise<void> - a promise resolving when the upload is complete
*/
async function uploadToS3( uploadUrl: string, file: File ): Promise<void> {

    const res = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to Upload to S3.");
    }

}

/*
    type: Function
    name: uploadResumeToDatabase
    Description: This function uploads the key of the uploaded resume to the database
    Input: key - the key for the uploaded file in S3, used to access the file after upload
    Output: Promise<void> - a promise resolving when the upload is complete
*/
async function uploadResumeToDatabase(key: string ): Promise<void> {
    const res = await fetch(STORE_RESUME_KEY_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Lambda verifies this and extracts sub using the API Gateway
        },
        body: JSON.stringify({
            fileKey: key,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to Upload to Database.");
    }

}

// Same function as uploadResumeToDatabase but for transcripts instead of resumes.
async function uploadTranscriptToDatabase( key: string ): Promise<void> {
    const res = await fetch(STORE_TRANSCRIPT_KEY_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Lambda verifies this and extracts sub using the API Gateway
        },
        body: JSON.stringify({
            fileKey: key,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to Upload to Database.");
    }

}

//Create two functions that will call the parsing lambdas. They will need to be looked up. Then, attach them into the 
//upload functions below. 

// Export functions that the frontend will call.
// It consolidates the above functions into one. 
export async function uploadResume( file: File ): Promise<UploadResponse> {

    const data = await getUploadUrl(file);
    await uploadToS3(data.uploadUrl, file);
    await uploadResumeToDatabase(data.key);
    return data;

}

export async function uploadTranscript( file: File ): Promise<UploadResponse> {

    const data = await getUploadUrl(file);
    await uploadToS3(data.uploadUrl, file);
    await uploadTranscriptToDatabase(data.key);
    return data;
}
