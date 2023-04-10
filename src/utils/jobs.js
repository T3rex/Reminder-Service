const cron = require('node-cron');
const emailService =  require('../services/email-service');
const sender = require('../config/email-config');

const setupJobs = () =>{
    cron.schedule('*/2 * * * *',async()=>{
        const response = await emailService.fetchPendingEmails();
        response.forEach(email =>{
            sender.sendMail({
                from: "ReminderService@airline.com",
                to: email.receipentEmail,
                subject:  email.subject,
                text:  email.content
            }, async (err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    await emailService.updateNotification(email.id,{status: "SUCCESS"});
                }
            })
        });
        console.log(response);
    });
}

module.exports = setupJobs;