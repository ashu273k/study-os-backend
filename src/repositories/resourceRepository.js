import { query } from '../config/database.js'

export const findAllByUserId = async (userId) => {
    const result = await query(
        `SELECT * FROM resources
         WHERE user_id = $1
         ORDER BY created_at DESC`,
         [userId]
    );
    return result.rows;
}

export const createResource = async (userId, { title, type, content, url }) => {
    const result = await query(
        `INSERT INTO resources (user_id, title, type, content, url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [userId, title, type, content, url]
    );

    return result.rows[0]

}

export const deleteResource = async (id, userId) => {
    const result = await query(
        `DELETE FROM resources
        WHERE id = $1 AND user_id = $2
        RETURNING *`,
        [id, userId]
    )
    return result.rows[0] ?? null;
}