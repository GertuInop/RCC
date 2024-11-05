const pool = require('../db')

class EducationController {

    async getAllTypes(req, res) {
        try {
            const role = await pool.query(`SELECT * FROM types_of_education`);
            res.json(role.rows);
        } catch (error) {
            console.log(error);
        }
    }

    async createType(req, res) {
        const {type_name} = req.body;
        try {
            const role = await pool.query(`INSERT INTO types_of_education(type_name) VALUES ($1) RETURNING *`, [type_name]);
            res.json(role.rows);
            console.log('Created type ', type_name);
        } catch (error) {
            console.log('error ', error);
        }
    }
    async updateType(req, res) {
        const id = parseInt(req.params.id);
        const {type_name} = req.body;
        try {
            const role = await pool.query(`UPDATE types_of_education SET type_name = $1 WHERE id = $2 RETURNING *`, [type_name, id]);
            res.json(role.rows);
        } catch (error) {
            console.error('error', error);
        }
    }
    async deleteType(req, res) {
        const id = req.params.id;
        const role = await pool.query(`DELETE FROM types_of_education WHERE id = $1`, [id]);
        res.json(role.rows[0]);
    }
}

module.exports = new EducationController();