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
export type UploadResponse = {
    uploadUrl: string;
    key: string;
};

// get pre-signed URL
async function getUploadUrl(file: File): Promise<UploadResponse> {

    // calls for API Gateway URL of upload-resume / transcript
    const res = await fetch("https://api-url.amazonaws.con/EXAMPLE", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
        }),
    });

    // if HTTP request unsuccessful, throw an error
    if (!res.ok) {
        throw new Error("Failed to Retrieve Upload URL.");
    }

    // returns https urls as JavaScript objects
    return res.json();

}

// upload to S3
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

async function uploadResumeToDatabase( key: string ): Promise<void> {
    const res = await fetch("https://api-url.amazonaws.com/EXAMPLE", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fileKey: key,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to Upload to Database.");
    }

}
async function uploadTranscriptToDatabase( key: string ): Promise<void> {
    const res = await fetch("https://api-url.amazonaws.com/EXAMPLE", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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

// what ResumeUploadPage && TranscriptUploadPage call
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
