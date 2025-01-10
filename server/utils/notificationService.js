const axios = require("axios");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
// const { SLACK_WEBHOOK_URL } = require('../config/config');
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: "v3", auth: oauth2Client });
const createCalendarEvent = async (employee) => {
  const event = {
    summary: `Review for ${employee.name}`,
    description: "Employee review/probation meeting",
    start: {
      dateTime: new Date(employee.dateOfJoining).toISOString(),
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: new Date(
        new Date(employee.dateOfJoining).getTime() + 60 * 60 * 1000
      ).toISOString(),
      timeZone: "America/Los_Angeles",
    },
    attendees: [{ email: employee.email }],
  };
  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    console.log("Calendar event created:", response.data);
  } catch (error) {
    console.error("Error creating calendar event:", error);
  }
};
const sendNotification = async (message) => {
  try {
    await axios.post(process.env.SLACK_WEBHOOK_URL, { text: message });
  } catch (error) {
    console.error("Failed to send notification", error);
  }
};

module.exports = { sendNotification, createCalendarEvent };
