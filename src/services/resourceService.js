import * as resourceRepository from '../repositories/resourceRepository.js'

const isValidHttpUrl = (value) => {
    try {
        const parsed = new URL(value)
        return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
        return false
    }
}

export const getAllResources = async (userId) => {
    return resourceRepository.findAllByUserId(userId)
}

export const createResource = async (userId, data) => {
    if (typeof data.url === 'string' && data.url.trim() !== '') {
        const normalizedUrl = data.url.trim()
        if (!isValidHttpUrl(normalizedUrl)) {
            throw new Error('INVALID_URL')
        }
        data.url = normalizedUrl
    }

    return resourceRepository.createResource(userId, data)
}

export const deleteResource = async (id, userId) => {
    return resourceRepository.deleteResource(id, userId)
}

