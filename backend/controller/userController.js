const { getDB } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key_change_me";
const JWT_EXPIRES_IN = "7d";

// Helper to issue JWT and send as HTTP-only cookie
const sendAuthCookie = (res, user) => {
  const payload = { id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

const registerUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const db = getDB();

  // Check if user already exists
  db.query("SELECT id FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Hash error:", hashErr.message);
        return res.status(500).json({ error: "Server error" });
      }

      const insertQuery =
        "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";

      db.query(
        insertQuery,
        [firstName, lastName, email, hashedPassword],
        (insertErr, result) => {
          if (insertErr) {
            console.error("Database error:", insertErr.message);
            return res.status(500).json({ error: "Database error" });
          }

          const newUser = {
            id: result.insertId,
            firstname: firstName,
            lastname: lastName,
            email,
          };

          sendAuthCookie(res, newUser);

          // Trigger AI survey in background (don't wait for it)
          const { conductAISurvey, analyzeSurveyAndRecommend } = require("../services/aiSurveyService");
          const Survey = require("../models/Survey");
          const Recommendation = require("../models/Recommendation");
          
          // Run survey asynchronously - don't block registration response
          (async () => {
            try {
              const surveyData = await conductAISurvey({
                firstName: newUser.firstname,
                lastName: newUser.lastname,
                email: newUser.email,
              });

              Survey.create(
                newUser.id,
                surveyData.grade,
                surveyData.interests,
                surveyData.goals,
                surveyData.studyHours,
                surveyData.skillLevel,
                async (err) => {
                  if (err) {
                    console.error("Error saving survey:", err);
                    return;
                  }

                  try {
                    const recommendations = await analyzeSurveyAndRecommend(surveyData);
                    Recommendation.createForUser(newUser.id, recommendations, (recErr) => {
                      if (recErr) {
                        console.error("Error saving recommendations:", recErr);
                      } else {
                        console.log(`Survey and recommendations created for user ${newUser.id}`);
                      }
                    });
                  } catch (analysisError) {
                    console.error("Error analyzing survey:", analysisError);
                  }
                }
              );
            } catch (error) {
              console.error("Background survey error:", error);
            }
          })();

          return res
            .status(201)
            .json({ message: "User registered successfully", user: newUser });
        }
      );
    });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const db = getDB();

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    bcrypt.compare(password, user.password, (compareErr, isMatch) => {
      if (compareErr) {
        console.error("Compare error:", compareErr.message);
        return res.status(500).json({ error: "Server error" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      sendAuthCookie(res, user);

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      });
    });
  });
};

const getMe = (req, res) => {
  // `authMiddleware` puts decoded user on req.user
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json({ user: req.user });
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, getMe, logoutUser };
