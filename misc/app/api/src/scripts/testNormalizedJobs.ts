import fs from 'fs/promises';
import { normalizeJob, type TheirStackRawJob, type NormalizedJob } from '../integrations/theirstack/normalizeJob.js';

async function testNormalizeJobs() {
    try {

        const rawData = await fs.readFile('src/scripts/samples/rawJobSamples.json', 'utf-8');
        const rawJobs: TheirStackRawJob[] = JSON.parse(rawData);
        const normalizedJobs: NormalizedJob[] = [];
        
        let skippedCount = 0;

        for (const rawJob of rawJobs) {
            try {
                const normalized = normalizeJob(rawJob);
                normalizedJobs.push(normalized);
            } catch (error) {
                skippedCount++;
                console.error(`Skipped raw job ${String(rawJob.id)}: ${error}`);
            }
        }
    
        console.log(`Successfully normalized ${normalizedJobs.length} jobs.`);
        console.log(JSON.stringify(normalizedJobs, null, 2));
        console.log(`Skipped ${skippedCount} jobs due to validation errors.`);

        console.log(`\n Done. Normalized: ${normalizedJobs.length}, Skipped: ${skippedCount}`);
    } catch (error) {
        console.error('Error during normalization test:', error);
    }
}

testNormalizeJobs();