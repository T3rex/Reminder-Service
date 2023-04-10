const {NotificationTicket} = require('../models/index');
const { Op } = require("sequelize");


class TicketRepository {

    async getAll(){
        try {
            const tickets = await NotificationTicket.findAll();
            return tickets;
        } catch (error) {
            throw error
        }
    }

    async create(data){
        try {
            const ticket = await NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getPending(filter){
        try {
            const pendingTicket = await NotificationTicket.findAll({
               where: {
                    [Op.and]: [
                        { 
                            notificationTime: {
                                [Op.lte]: new Date()
                            }
                        },
                        { status: filter.status }
                    ]
                }
            });
            console.log(pendingTicket);
            return pendingTicket;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(ticketId,data){
        try {
            const ticket =  await  NotificationTicket.findByPk(ticketId);
            if(data.status){
                ticket.status = data.status;
            }
            await ticket.save();
            return ticket;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = TicketRepository;