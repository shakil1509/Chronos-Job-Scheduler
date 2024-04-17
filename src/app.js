const express=require('express');
const app=express();
const mongodbcon=require('../src/connections/mongoDbCon');
const userRoutes=require('../src/routes/userRoutes');
const jobRoutes=require('../src/routes/jobRoutes');
const config=require('../src/configs/config');
const jobScheduler=require('./jobFunctionality/node-cron');
const daemon=require('../src/jobFunctionality/background-scheduled-task/daemon');
const requestLoggerMiddleware = require('./middlewares/requestLogger.middleware');
const morganMiddleware= require('./middlewares/morgan.middleware');
const { logger } = require('./utils/loggers.util');
const PORT_NUMBER=config.PORT_NUMBER;


app.use(express.json());

app.use(morganMiddleware);
app.use(requestLoggerMiddleware);

global.runningJobs = {};

app.get('/',(req,res)=>{
    return res.status(200).send("Hello World!")
})

app.use('/users',userRoutes);
app.use('/jobs',jobRoutes);

// jobScheduler.schedule('* * * * * *',()=>{
//     console.log("runningJobs---->",runningJobs)
// })
app.listen(PORT_NUMBER, () => {
    console.log(`server is listening to PORT no ${PORT_NUMBER}`);
});



module.exports=app;