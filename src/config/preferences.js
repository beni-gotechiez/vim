import notificationService from "../services/notification.js";

const NOTIFICATION_SERVICE_URL =
  process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5001";

const preferences = {
  email: {
    endpoint: `${NOTIFICATION_SERVICE_URL}/send-email`,
    action: (user, message) => {
      if (user.preferences.email && user.email) {
        notificationService.sendEmail(user.email, message);
      }
    },
  },
  sms: {
    endpoint: `${NOTIFICATION_SERVICE_URL}/send-sms`,
    action: (user, message) => {
      if (user.preferences.sms && user.telephone) {
        notificationService.sendSMS(user.telephone, message);
      }
    },
  },
};

export default preferences;
