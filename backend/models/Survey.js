const { getDB } = require("../config/db");

const Survey = {
  create: (userId, grade, interests, goals, studyHours, skillLevel, callback) => {
    const db = getDB();
    const query = `
      INSERT INTO surveys (user_id, grade, subjects, goals, study_hours, skill_level)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [
        userId,
        grade,
        JSON.stringify(interests),
        JSON.stringify(goals),
        studyHours,
        skillLevel
      ],
      callback
    );
  },
};

module.exports = Survey;
