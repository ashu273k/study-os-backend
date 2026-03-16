import * as taskService from '../services/taskService.js'

export const getAllTasks = async (req, res) => {
    try {
        const filter = {};

        if (req.query.completed !== undefined) {
            filter.completed = req.query.completed === 'true';
        }

        const tasks = taskService.getAllTasks(filter);
        res.status(200).json({
            success: true,
            data: tasks
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve tasks'
        });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = taskService.getTaskById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: task
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve task'
        });
    }
}



/**
 * First, the consistent response shape — every response has success and either data or message. Your frontend can always rely on this shape. This is a professional habit.
Second, the try/catch on every handler. Services will eventually hit a database. Databases fail. Never let an unhandled error crash your server.
Third, the return on the 404 response. Without return, Express would try to send a second response after the if block, causing a "headers already sent" error.
 */