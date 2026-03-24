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
  const { type, url, content } = data;

  if (type === 'link') {
    if (!url || url.trim() === '') {
      throw new Error('LINK_REQUIRES_URL');
    }
    if (!isValidHttpUrl(url.trim())) {
      throw new Error('INVALID_URL');
    }
    data.url = url.trim();
  }

  if (type === 'note' && (!content || content.trim() === '')) {
    throw new Error('NOTE_REQUIRES_CONTENT');
  }

  return resourceRepository.createResource(userId, data);
};

export const deleteResource = async (id, userId) => {
    return resourceRepository.deleteResource(id, userId)
}

