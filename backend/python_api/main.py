from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer, LabelEncoder
from sklearn.ensemble import RandomForestClassifier

app = FastAPI()

# Load CSV & train model (same as Flask example)
df = pd.read_csv('Survey_data.csv')
df['interests'] = df['interests'].apply(lambda x: eval(x))
df['recommended_courses'] = df['recommended_courses'].apply(lambda x: eval(x))

mlb_interests = MultiLabelBinarizer()
interests_encoded = mlb_interests.fit_transform(df['interests'])

le_goals = LabelEncoder()
df['goals_encoded'] = le_goals.fit_transform(df['goals'])

le_skill = LabelEncoder()
df['skill_level_encoded'] = le_skill.fit_transform(df['skill_level'])

mlb_courses = MultiLabelBinarizer()
y = mlb_courses.fit_transform(df['recommended_courses'])

X = pd.concat([df[['grade','goals_encoded','skill_level_encoded','study_hours']], 
               pd.DataFrame(interests_encoded, columns=mlb_interests.classes_)], axis=1)

model = RandomForestClassifier()
model.fit(X, y)

# ------------------- API ------------------- #
class StudentInput(BaseModel):
    grade: int
    goals: str
    skill_level: str
    study_hours: int
    interests: List[str]

@app.post("/api/recommend")
def recommend(data: StudentInput):
    goals_encoded = le_goals.transform([data.goals])[0]
    skill_encoded = le_skill.transform([data.skill_level])[0]
    interests_vector = [1 if i in data.interests else 0 for i in mlb_interests.classes_]
    features = [data.grade, goals_encoded, skill_encoded, data.study_hours] + interests_vector
    recommended = mlb_courses.inverse_transform(model.predict([features]))[0]
    return {"recommended_courses": recommended.tolist()}
