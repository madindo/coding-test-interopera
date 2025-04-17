from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from models import QuestionRequest, AIResponse
from services.gemini import generate_answer
import json

router = APIRouter(prefix="/api", tags=["AI"])

# Load dummy data
with open("data/dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@router.get("/data")
def get_data():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA

@router.post("/ai")
async def ai_endpoint(payload: QuestionRequest):
    try:
        answer = generate_answer(payload.question, DUMMY_DATA)
        return answer
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"error": str(e)}
        )