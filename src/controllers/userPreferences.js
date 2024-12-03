import userService from "../services/users.js";
import notificationService from "../services/notification.js";
import preferences from "../config/preferences.js";

// Create new user preferences
async function createUserPreferences(req, res) {
  try {
    const data = req.body;

    const user = await userService.createUser(data);
    res.status(201).json({
      status: "success",
      message: "User preferences created successfully.",
      data: user,
    });
  } catch (error) {
    console.error("createUserPreferences: Error creating user preferences", {
      error,
    });
    res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Error creating user preferences",
    });
  }
}

// Edit existing user preferences
async function editUserPreferences(req, res) {
  try {
    const { userId, preferences, ...identifiers } = req.body;

    if (!userId && Object.keys(identifiers).length === 0) {
      return res.status(400).json({
        status: "error",
        message:
          "At least one identifier (userId, telephone, or email) is required.",
      });
    }

    const updatedUser = await userService.editUser(
      { id: userId, ...identifiers },
      preferences
    );

    res.status(200).json({
      status: "success",
      message: "User preferences updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("editUserPreferences: Error editing user preferences", {
      error,
    });
    res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Error editing user preferences",
    });
  }
}

async function sendNotification(req, res) {
  try {
    const { userId, message, ...identifiers } = req.body;

    // Fetch the user's notification preferences (email, SMS, etc.)
    const user = await userService.getUser({ id: userId, ...identifiers });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User preferences not found.",
      });
    }

    Object.values(preferences).forEach(({ action }) => action(user, message));

    res.status(202).json({
      status: "success",
      message: "Notification recived successfully.",
    });
  } catch (error) {
    console.error("sendNotification: Error sending notification", { error });
    res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Error sending notification",
    });
  }
}

export default {
  createUserPreferences,
  editUserPreferences,
  sendNotification,
};
