from pydantic import BaseModel

class QuestionRequest(BaseModel):
    question: str

class AIResponse(BaseModel):
    answer: str
