const sender =  require('../config/email-config');
const TicketRepository = require('../repository/ticket-repository');

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailbody) => {
       try {
        const response = await sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailbody
    })
    } catch (error) {
        console.log(error);
    }

  //  console.log(response);
}

const fetchPendingEmails = async() =>{
    try {
      
        const response = await repo.getPending({status: "PENDING"});
        //console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createNotification = async (data)=>{
    try {
        const response = await repo.create(data); 
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateNotification = async (ticketId,data)=>{
    try {
        const response =  await repo.update(ticketId,data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateNotification
}