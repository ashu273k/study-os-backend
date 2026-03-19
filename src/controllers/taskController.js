import * as taskService from '../services/taskService.js'

// Temporary — will be replaced by real auth middleware in Stage 3
const TEST_USER_ID = 'e258a24d-0bcc-4c23-8d01-3ad01a008da5';

export const getAllTasks = async (req, res) => {
    try {
        const filter = {};

        if (req.query.completed !== undefined) {
            filter.completed = req.query.completed === 'true';
        }

        const tasks = await taskService.getAllTasks(TEST_USER_ID, filter);
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
        const task = await taskService.getTaskById(req.params.id, TEST_USER_ID);

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
        const task = await taskService.createTask(TEST_USER_ID, req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        console.error('createTask error:', error);
        res.status(500).json({ success: false, message: 'Failed to create task' });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deleted = await taskService.deleteTask(req.params.id, TEST_USER_ID)

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

/**
 * First, the consistent response shape — every response has success and either data or message. Your frontend can always rely on this shape. This is a professional habit.
Second, the try/catch on every handler. Services will eventually hit a database. Databases fail. Never let an unhandled error crash your server.
Third, the return on the 404 response. Without return, Express would try to send a second response after the if block, causing a "headers already sent" error.
 */