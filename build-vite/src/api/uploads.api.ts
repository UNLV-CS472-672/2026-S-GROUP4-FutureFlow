/* SOURCE CODE TYPESCRIPT FILE FOR HANDLING API UPLOADS FOR:
        - ResumeUploadPage.tsx
        - TranscriptUploadPage.tsx
*/

/*
    type: Type
    var name: UploadResponse
*/
export type UploadResponse = {
    uploadUrl: string;
    fileUrl: string;
};

// get pre-signed URL
async function getUploadUrl(file: File): Promise<UploadResponse> {

    // calls for API Gateway URL
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

// what ResumeUploadPage && TranscriptUploadPage call
export async function uploadPDF( file: File ): Promise<UploadResponse> {

    const data = await getUploadUrl(file);
    await uploadToS3(data.uploadUrl, file);
    return data;

}
