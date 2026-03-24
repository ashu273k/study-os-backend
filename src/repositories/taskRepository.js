import { query } from '../config/database.js'


export const findAllByUserId = async (userId, filter = {}) => {
      let sql = 'SELECT * FROM tasks WHERE user_id = $1';
    const params = [userId]

    if (filter.completed !== undefined) {
        params.push('completed');
        sql += filter.completed
            ? ` AND status = $${params.length}`
            : ` AND status != $${params.length}`;
    }

    sql += ` ORDER BY created_at DESC`;
    const result = await query(sql, params)

    return result.rows;
};

export const findById = async (id, userId) => {
    const result = await query(
        `SELECT * FROM tasks
        WHERE id = $1 AND user_id = $2`,
        [id, userId]
    );
    return result.rows[0] ?? null;
}

export const createTask = async (userId, { title, description, subject, due_date }) => {
    const result = await query(
        `INSERT INTO tasks (user_id, title, description, subject, due_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [userId, title, description, subject, due_date]
    );
    return result.rows[0]
}

export const deleteTask = async(id, userId) => {
    const result = await query(
        `DELETE FROM tasks 
        WHERE id = $1 AND user_id = $2
        RETURNING *`, [id, userId]
    );
    return result.rows[0] ?? null;
}

export const updateTask = async (id, userId, fields) => {
    const allowed = ['title', 'description', 'subject', 'due_date', 'status'];
    const updates = Object.keys(fields).filter(k => allowed.includes(k));

    if (updates.length === 0) return null;

    const setClauses = updates.map((key, i) => `${key} = $${i+3}`)
    const values = updates.map(k => fields[k]);

    const result = await query(
        `UPDATE tasks
        SET ${setClauses.join(', ')}, updated_at = NOW()
        WHERE id = $1 AND user_id = $2
        RETURNING *`,
        [id, userId, ...values]
    )
    
    return result.rows[0] ?? null;
}