
const ScheduledTask = require('../scheduled-task');
const JobModel = require('../../models/jobmodel'); // Import your Mongoose Job model
const path=require('path');
const { exec } = require('child_process');
    // Assuming the taskPath is static and known
    let taskPath = path.join(__dirname, '../../', 'taskFile.js'); // Ensure this is the correct relative path from where the process is started


function executeTaskFile(jobId) {
    return function() {
        const taskPath = path.join(__dirname, '../../', 'taskFile.js'); // Ensure correct path
        exec(`node ${taskPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${jobId + ' =============== ' +stdout}`);

            if(stderr){
                console.error(`stderr: ${stderr}`);
            }

            });
    }
}


function scheduleJobsFromDatabase() {
    // Retrieve unscheduled jobs from the database
    JobModel.find({ status :'running' }).maxTimeMS(30000).then(jobs => {
        if (jobs.length === 0) {
            console.log('No eligible jobs to schedule.');
            return;
        }
        console.log("jobs =============> ", jobs);
        jobs.forEach(job => {
            // console.log('single job ======================> ', job);
            try {
                const scheduledTask = new ScheduledTask(job.cron_expression, executeTaskFile(job._id), {scheduled:job.scheduled});
                job.scheduled = true; // Mark as scheduled
                job.save().then(() => {
                    console.log(`Job ${job._id} scheduled `);
                }).catch(err => {
                    console.error(`Failed to schedule job ${job._id} `, err);
                });

                scheduledTask.on('task-done', (result) => {
                    // console.log('Job execution result:', result);
                });
            } catch (err) {
                console.error('Error creating scheduled task or executing task file:', err);
            }
        });
    }).catch(err => {
        console.error('Error retrieving unscheduled jobs from the database:', err);
    });
}
// Periodically check the database for unscheduled jobs and schedule them
setInterval(scheduleJobsFromDatabase, 60000); // Adjust the interval as needed

// Initial scheduling when the daemon starts
scheduleJobsFromDatabase();

// const ScheduledTask = require('../scheduled-task');

// let scheduledTask;

// function register(message){
//     const script = require(message.path);
//     scheduledTask = new ScheduledTask(message.cron, script.task, message.options);
//     scheduledTask.on('task-done', (result) => {
//         process.send({ type: 'task-done', result});
//     });
//     process.send({ type: 'registred' });
// }

// process.on('message', (message) => {
//     switch(message.type){
//     case 'register':
//         return register(message);
//     }
// });