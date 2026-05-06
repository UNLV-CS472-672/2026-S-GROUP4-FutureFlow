import 'dotenv/config';
import { normalizeJob, type TheirStackRawJob } from '../integrations/theirstack/normalizeJob.js';

const BASE_URL = process.env.THEIRSTACK_BASE_URL || 'https://api.theirstack.com';
const API_KEY = process.env.THEIRSTACK_API_KEY;

if (!API_KEY) {
    console.error('Error: THEIRSTACK_API_KEY must be set in the environment variables.');
    process.exit(1);
}

async function ingestJobs() {
    try {
        const response = await fetch(`${BASE_URL}/v1/jobs/search`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                posted_at_max_age_days: 7,
                job_country_code_or: ['US'],
                limit: 3,
                page: 0,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API call failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const rawJobs: TheirStackRawJob[] = data.data ?? data.jobs ?? data.results ?? [];

        console.log(`Fetched ${rawJobs.length} raw jobs from TheirStack API. \n`);

        let insertedCount = 0;
        let skippedCount = 0;
        let dupCount = 0;

        for (const rawJob of rawJobs) {
            try {

                const normalized = normalizeJob(rawJob);

                // function to add to db goes here, but for now we just log the normalized job
                /*const existingJob = await prisma.job.findUnique({
                    where: {
                        source_externalJobId: {
                            source: normalized.source,
                            externalJobId: normalized.externalJobId,
                        },
                    },
                });

                if (existingJob) {
                    dupCount++;

                    console.log(`Duplicate job skipped: ${normalized.title} at ${normalized.company} (externalJobId: ${normalized.externalJobId})`);
                    continue;
                }

                await prisma.job.create({
                    data: {...normalized, 
                    createdAt: new Date(normalized.createdAt),
                    updatedAt: new Date(normalized.updatedAt),
                    postedAt: normalized.postedAt ? new Date(normalized.postedAt) : undefined,}
                });*/

                console.log(`Inserted job: ${normalized.title} at ${normalized.company} (externalJobId: ${normalized.externalJobId})`);

                insertedCount++;
            } catch (error) {

                skippedCount++;
                console.error(`Skipped raw job ${String(rawJob.id)}: ${error}`);
            }
        }

        console.log(`\n Ingestion complete. Inserted: ${insertedCount}, Skipped: ${skippedCount}, Duplicates: ${dupCount}`);

    } catch (error) {

        console.error('Error during job ingestion:', error);

    } /*finally {
        await prisma.$disconnect();
    } */
}

ingestJobs();