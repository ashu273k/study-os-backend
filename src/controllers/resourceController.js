import * as resourceService from "../services/resourceService.js";

export const getAllResources = async (req, res) => {
  try {
    const resources = await resourceService.getAllResources(req.user.userId);

    return res.status(200).json({
      success: true,
      data: resources,
    });
  } catch (error) {
    console.log("GetAllResources: ", error);
    res.status(500).json({
      success: false,
      data: "Failed to retrieve data",
    });
  }
};

export const createResource = async (req, res) => {
  try {
    const resource = await resourceService.createResource(
      req.user.userId,
      req.body,
    );
    res.status(201).json({ success: true, data: resource });
  } catch (error) {
    if (error.message === "INVALID_URL") {
      return res.status(400).json({
        success: false,
        message: "URL must be a valid http or https link",
      });
    }
    if (error.message === "LINK_REQUIRES_URL") {
      return res
        .status(400)
        .json({ success: false, message: "Link resources require a URL" });
    }
    if (error.message === "NOTE_REQUIRES_CONTENT") {
      return res
        .status(400)
        .json({ success: false, message: "Note resources require content" });
    }

    console.error("Create Resource error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks",
    });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const deleted = await resourceService.deleteResource(
      req.params.id,
      req.user.userId,
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resource successfully deleted",
    });
  } catch (error) {
    console.error("DeleteResource: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};
