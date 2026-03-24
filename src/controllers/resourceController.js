import * as resourceService from '../services/resourceService.js'

export const getAllResources = async (req, res) => {
    try {
        const resources = await resourceService.getAllResources(req.user.userId)
        if (!resources) {
            return res.status(404).json({
                success: false,
                data: "Resource not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: resources
        })
    } catch (error) {
        console.log("GetAllResources: ", error)
        res.status(500).json({
            success: false,
            data: "Failed to retrieve data"
        })
    }
}

export const createResource = async (req, res) => {
    try {
        const resource = await resourceService.createResource(req.user.userId, req.body)
        res.status(201).json({ success: true, data: resource });
    } catch (error) {
        if (error.message === 'INVALID_URL') {
            return res.status(400).json({
                success: false,
                message: 'URL must be a valid http or https link'
            })
        }

        console.error("Create Resource error: ", error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve tasks'
        });
    }
}

export const deleteResource = async (req, res) => {
     try {
            const deleted = await resourceService.deleteResource(req.params.id, req.user.userId)
    
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