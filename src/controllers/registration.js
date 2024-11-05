const pool = require('../db')

class RegistrationsController {

    async getAllRegistrations(req, res) {
        try {
            const registration = await pool.query(`SELECT * FROM event_registrations`);
            res.json(registration.rows);
        } catch (error) {
            console.log(error);
        }
    }

    async createRegistration(req, res) {
        const user_id = parseInt(req.params.user_id);
        console.log(user_id);
        const event_id = parseInt(req.params.event_id);
        console.log(event_id);
        const event_title = (await pool.query(`SELECT title FROM events WHERE id = $1`, [event_id])).rows[0].title;
        console.log(event_title);
        try {
            const registration = await pool.query(`INSERT INTO event_registrations(event_id, event_title, user_id) VALUES ($1, $2, $3) RETURNING *`, [event_id, event_title, user_id]);
            res.json(registration.rows);
        } catch (error) {
            console.log('error ', error);
        }
    }
    async updateRegistration(req, res) {
        const id = parseInt(req.params.id);
        const {event_id, event_title, user_id} = req.body;
        try {
            const registration = await pool.query(`UPDATE event_registrations SET event_id = $1, event_title = $2, user_id = $3 WHERE id = $4 RETURNING *`, [event_id, event_title, user_id, id]);
            res.json(registration.rows);
        } catch (error) {
            console.error('error', error);
        }
    }
    async deleteRegistration(req, res) {
        const id = req.params.id;
        const registration = await pool.query(`DELETE FROM event_registrations WHERE id = $1`, [id]);
        res.json(registration.rows[0]);
    }
}

module.exports = new RegistrationsController();