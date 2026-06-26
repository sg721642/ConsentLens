from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.permissions import APPS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    apps: list[str]


@app.get("/")
def home():
    return {
        "message": "ConsentLens Backend Running"
    }


@app.post("/api/analyze")
def analyze(data: AnalyzeRequest):

    results = []

    for app in data.apps:

        permissions = APPS.get(
            app.lower(),
            ["Unknown Permissions"]
        )

        score = 100

        score -= len(permissions) * 15

        if score >= 80:
            risk = "LOW"

        elif score >= 60:
            risk = "MEDIUM"

        elif score >= 40:
            risk = "HIGH"

        else:
            risk = "CRITICAL"

        results.append(
            {
                "appName": app,
                "riskLevel": risk,
                "score": score,
                "summary": f"{app} requests access to {', '.join(permissions)}.",
                "dataCollected": permissions,
                "recommendedActions": [
                    "Review permissions",
                    "Disable unnecessary access"
                ]
            }
        )

    return {
        "results": results
    }