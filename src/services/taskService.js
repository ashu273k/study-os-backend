const tasks = [
    { id: 1, title: 'Read chapter 3', subject: 'Math', completed: false },
    { id: 2, title: 'Write essay draft', subject: 'English', completed: true }
]

export const getAllTasks = (filter = {}) => {
    if (filter === undefined) {
        return tasks
    }

    return tasks.filter(task => task.completed === filter.completed);
}

export const getTaskById = (id) => {
    return tasks.find(task => task.id === id) ?? null
}

