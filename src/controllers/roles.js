const pool = require('../db')

class RoleController {

    async getAllRoles(req, res) {
        try {
            const role = await pool.query(`SELECT * FROM roles`);
            res.json(role.rows);
        } catch (error) {
            console.log(error);
        }
    }

    async createRole(req, res) {
        const {role_name} = req.body;
        try {
            const role = await pool.query(`INSERT INTO roles (role_name) VALUES ($1) RETURNING *`, [role_name]);
            res.json(role.rows);
            console.log('Created role ', role_name);
        } catch (error) {
            console.log('error ', error);
        }
    }
    async updateRole(req, res) {
        const id = parseInt(req.params.id);
        const {role_name} = req.body;
        try {
            const role = await pool.query(`UPDATE roles SET role_name = $1 WHERE id = $2 RETURNING *`, [role_name, id]);
            res.json(role.rows);
        } catch (error) {
            console.error('error', error);
        }
    }
    async deleteRole(req, res) {
        const id = req.params.id;
        const role = await pool.query(`DELETE FROM roles WHERE id = $1`, [id]);
        res.json(role.rows[0]);
    }
}

module.exports = new RoleController();