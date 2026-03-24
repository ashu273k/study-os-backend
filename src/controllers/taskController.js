import * as taskService from '../services/taskService.js'


export const getAllTasks = async (req, res) => {
    try {
        const filter = {};

        if (req.query.completed !== undefined) {
            filter.completed = req.query.completed === 'true';
        }

        const tasks = await taskService.getAllTasks(req.user.userId, filter);
        res.status(200).json({
            success: true,
            data: tasks
        })
    } catch (error) {
        console.error('getAllTasks error: ', error)
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve tasks'
        });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id, req.user.userId);

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

export const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.user.userId, req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        console.error('createTask error:', error);
        res.status(500).json({ success: false, message: 'Failed to create task' });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deleted = await taskService.deleteTask(req.params.id, req.user.userId)

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            })
        }

        res.status(202).json({
            success: true,
            message: 'Task successfully deleted'
        })
    } catch(error) {
        console.error('DeleteTask: ', error)
        res.status(500).json({
            success: false,
            message: 'Failed to delete'
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const updated = await taskService.updateTask(
            req.params.id,
            req.user.userId,
            req.body
        )

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, data: updated})
    } catch (error) {
        if (error.message === 'INVALID_STATUS') {
            return res.status(400).json({
                success: false,
                message: 'Status must be pending, in_progress, or completed'
            })
        }
        console.error('UpdateTask error: ', error)
        res.status(500).json({success: false, message: 'Failed to update task'})
    }
}
/**
 * First, the consistent response shape — every response has success and either data or message. Your frontend can always rely on this shape. This is a professional habit.
Second, the try/catch on every handler. Services will eventually hit a database. Databases fail. Never let an unhandled error crash your server.
Third, the return on the 404 response. Without return, Express would try to send a second response after the if block, causing a "headers already sent" error.
 */