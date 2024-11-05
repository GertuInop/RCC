const pool = require('../db')

class EventsController {

    async getAllEvents(req, res) {
        try {
            const event = await pool.query(`SELECT * FROM events`);
            res.json(event.rows);
        } catch (error) {
            console.log(error);
        }
    }

    async getEvent(req, res) {
        try {
            const id = parseInt(req.params.id);
            const event = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
            res.json(event.rows[0]);
        } catch (error) {
            console.log(error);
        }
    }

    async createEvent(req, res) {
        const creater_id = parseInt(req.params.user_id);
        const {title, description, address, date, time, link} = req.body;
        try {
            const event = await pool.query(`INSERT INTO events (title, description, address, date, time, img_link, creater_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [title, description, address, date, time, link, creater_id]);
            res.json(event.rows);
            console.log('Created role ', title);
        } catch (error) {
            console.log('error ', error);
        }
    }
    async updateEvent(req, res) {
        const id = parseInt(req.params.id);
        const {title, description, img_src} = req.body;
        try {
            const event = await pool.query(`UPDATE events SET title = $1, description = $2, img_src = $3 WHERE id = $4 RETURNING *`, [title, description, img_src, id]);
            res.json(event.rows);
        } catch (error) {
            console.error('error', error);
        }
    }
    async deleteEvent(req, res) {
        const id = req.params.id;
        const event = await pool.query(`DELETE FROM events WHERE id = $1`, [id]);
        res.json(event.rows[0]);
    }
}

module.exports = new EventsController();