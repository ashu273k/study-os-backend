import * as taskRepository from '../repositories/taskRepository.js';

export const getAllTasks = async(userId, filter = {}) => {
    const tasks =  await taskRepository.findAllByUserId(userId, filter);

    if (filter.completed !== undefined) {
        return tasks.filter(task => 
            filter.completed
                ? task.status === 'completed'
                : task.status !== 'completed'
        );
    }

    return tasks;
}

export const getTaskById = async (id, userId) => {
    return taskRepository.findById(id, userId);
}

export const createTask = async (userId, data) => {
    return taskRepository.createTask(userId, data);
}

export const deleteTask = async (id, userId) => {
    return taskRepository.deleteTask(id, userId)
}
