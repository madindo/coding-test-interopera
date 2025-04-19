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
    Returns dummy data from a JSON file.

    This endpoint provides mock data which can be used for testing, frontend development,
    or to provide context to the AI endpoint.

    **Example usage:**
    - Fetch a list of users
    - Preview the structure of data available to the AI

    **Returns:**
    A JSON list containing dummy records (e.g., users or sample entries).
    """
    return DUMMY_DATA

@router.post("/ai")
async def ai_endpoint(payload: QuestionRequest):
    """
    Generates an AI-powered response to a user question.

    This endpoint accepts a question and uses an AI model to return a relevant answer,
    based on the loaded dummy data.

    **Request body:**
    - `question`: A string question (e.g., "Who is the top 3 best closed won project?")

    **Response:**
    - `answer`: AI-generated text based on the question and dummy data context, will return only the id of the response
    - { ids : [1,2,3] } - multiple
    - { id: 1 } - single

    **Error handling:**
    - Returns a 500 status code with error details if processing fails

    **Use cases:**
    - Chatbot functionality
    - Data-driven question answering
    - Prototyping AI services using static/mock data
    """
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