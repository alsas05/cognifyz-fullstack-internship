const { Worker } = require("bullmq");

const connection = {
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null
};

const worker = new Worker(
    "taskflow-jobs",
    async(job) => {

        console.log("=================================");
        console.log(`Background job started: ${job.name}`);
        console.log("Job data:", job.data);

        // Simulate background processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(`Background job completed: ${job.name}`);
        console.log("=================================");

        return {
            success: true,
            processedAt: new Date().toISOString()
        };
    }, {
        connection
    }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully.`);
});

worker.on("failed", (job, error) => {
    console.error(`Job ${job?.id} failed:`, error.message);
});

worker.on("error", (error) => {
    console.error("Worker error:", error.message);
});

console.log("TaskFlow background worker is running.");