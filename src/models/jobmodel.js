const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Mongoose schema for Jobs

const jobSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      cron_expression: {
        type: String,
        required:[true,"cron_expression is required"]
    },
      status: {
        type: String,
        enum: ['pending', 'running', 'failed', 'successful', 'stopped'],
        default: 'running'
      },
      scheduled: {
        type: Boolean,
        default:false
      },
      created_at: {
        type: Date,
        default: Date.now
      },
      isRecurring: {
          type: Boolean,
          default: false
      }
})

module.exports = mongoose.model('Job', jobSchema);