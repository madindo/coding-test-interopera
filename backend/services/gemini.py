import json
import re
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

# Grab API key securely
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")  # fallback included
model = ChatGoogleGenerativeAI(model="models/gemini-1.5-pro", google_api_key=GOOGLE_API_KEY)


def clean_json_response(text: str) -> str:
    """
    Removes markdown formatting (like ```json) and returns a clean JSON string.
    """
    if not text:
        return ""

    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.IGNORECASE | re.MULTILINE)

    match = re.search(r"\{.*\}", cleaned, re.DOTALL)
    if match:
        return match.group(0).strip()

    return cleaned.strip()


def generate_answer(question: str, data: dict) -> dict:
    """
    Uses LangChain with Gemini to answer a question based on provided data,
    returning a valid JSON object containing either 'id' or 'ids'.
    """

    # LangChain-style prompt with structured data and strict instructions
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant. You are given structured JSON data."),
        ("user", """
        Answer the user's question based strictly on the following JSON data.
        Only respond in valid JSON format.

        ### Question:
        {question}

        ### Data:
        {data}

        ### Response Format:
        - Single match: {{ "id": 1 }}
        - Multiple matches: {{ "ids": [1, 4, 5] }}

        Only return raw JSON. No markdown, no explanation.
        """)
    ])

    # Construct chain and invoke
    chain = prompt | model
    response = chain.invoke({
        "question": question,
        "data": json.dumps(data)
    })

    raw_text = response.content.strip()
    cleaned = clean_json_response(raw_text)

    try:
        parsed = json.loads(cleaned)
        if "id" in parsed or "ids" in parsed:
            return parsed
        else:
            return {"error": "Missing 'id' or 'ids' in response", "raw": raw_text}
    except json.JSONDecodeError as e:
        print("❌ JSON decoding failed:", e)
        return {"error": "Invalid AI response", "raw": raw_text}
