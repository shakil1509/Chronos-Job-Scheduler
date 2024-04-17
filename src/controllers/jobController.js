const Job=require('../models/jobmodel');
const chronos=require('../jobFunctionality/node-cron');
const { sendEmail, scheduledMessage, notScheduledMessage } = require('../utils/emailUtil');
const startBackgroundTask=require('../jobFunctionality/startBackgroundTask')

function executeTaskFile(jobId) {
    return function() {
        const taskPath = path.join(__dirname, '../', 'taskFile.js'); // Ensure correct path
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

exports.submitJob = async (req, res) => {
  try {
      // Extract user_id from the token using verifyToken middleware
      const user_id = req.user._id; // Assuming the user id is stored in _id field
      const email= req.user.email;
      console.log("user_id inside submit job",user_id)
      // Get job details from the request body
      const { cron_expression, isRecurring } = req.body;

      // Create a new job instance
      const job = new Job({
          user_id,
          cron_expression,
          isRecurring
      });

      // Save the job details to the database
      await job.save();

    //   startBackgroundTask(cron_expression, job._id.toString())
    chronos.schedule(cron_expression,executeTaskFile(job._id.toString()));
        // Send email notification upon successful scheduling
      const scheduledMessageText = scheduledMessage(job._id.toString());
      await sendEmail(email, 'Job Scheduled Successfully', scheduledMessageText);

      // Send success response
      res.status(201).json({ message: 'Job submitted successfully', job });
  } catch (error) {
      console.error('Error submitting job:', error);
              // Send email notification upon failure to schedule
              const notScheduledMessageText = notScheduledMessage();
              await sendEmail(email, 'Job Scheduling Failed', notScheduledMessageText);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getJobById=async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user._id; // Assuming the user ID is extracted from the token

  try {
      const job = await Job.findOne({ _id: jobId, user_id: userId });

      if (!job) {
          return res.status(404).json({ message: 'Job not found' });
      }

      return res.status(200).json({ job });
  } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

exports.getAllJobs=async (req, res) => {
  const userId = req.user._id; // Assuming the user ID is extracted from the token

  try {
      const jobs = await Job.find({ user_id: userId });

      if (jobs.length === 0) {
          return res.status(404).json({ message: 'No jobs found for this user' });
      }

      return res.status(200).json({ jobs });
  } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

exports.updateJob=async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user._id; // Assuming the user ID is extracted from the token
  const { cron_expression, isRecurring, max_attempts } = req.body;

  // Validate input parameters and user permissions
  // ...

  try {
      const job = await Job.findOneAndUpdate(
          { _id: jobId, user_id: userId },
          { cron_expression, isRecurring, max_attempts },
          { new: true }
      );

      if (!job) {
          return res.status(404).json({ message: 'Job not found' });
      }

      return res.status(200).json({ message: 'Job updated successfully', job });
  } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

exports.deleteJob=async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user._id; // Assuming the user ID is extracted from the token

 
  try {
      const job = await Job.findOneAndDelete({ _id: jobId, user_id: userId });

      if (!job) {
          return res.status(404).json({ message: 'Job not found' });
      }

      return res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

exports.stopJob=async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user._id; // Assuming the user ID is extracted from the token
  try {
    const job = await Job.findOneAndDelete({ _id: jobId, user_id: userId });

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(200).json({ message: 'Job stopped successfully' });
} catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
}
}


exports.test=async(req, res)=>{
  try {
    const job = await Job.find({ scheduled:false });

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(200).json({ job });
  } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
