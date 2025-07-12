# backend.py
import os
import time
import requests
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ----------------------------------------------------------
# ===  USER SETTINGS  ======================================
WATCH_FOLDER   = r"E:\sulli\aianal"
MODEL_ENDPOINT = "http://localhost:5000/v1/chat/completions"
MODEL_NAME     = "gpt-4-all"
# ----------------------------------------------------------

# ---------- Your existing helper to talk to the LLM -------
def send_to_model(prompt: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": 300,
    }
    try:
        r = requests.post(MODEL_ENDPOINT, json=payload, timeout=60)
        if r.status_code == 200:
            return (
                r.json()
                .get("choices", [{}])[0]
                .get("message", {})
                .get("content", "")
                .strip()
            )
        return f"Model error {r.status_code}: {r.text}"
    except requests.RequestException as e:
        return f"Error contacting model: {e}"


def get_coaching_from_model(file_path: str) -> str:
    prompt = (
        "You are an Overwatch coach. A new game video has been recorded.\n"
        f"Please provide personalized coaching advice after reviewing the match video at:\n"
        f"{file_path}\n"
        "Focus on situational awareness, positioning, mechanical improvements, and strategy."
    )
    return send_to_model(prompt)


# ----------------------------------------------------------

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

# ===== pydantic schema for POST /get-advice ===============
class AdviceRequest(BaseModel):
    file_path: str


# ---------------------- ROUTES ----------------------------
@app.get("/files")
def list_files():
    """Return JSON list of media files in watch folder."""
    files = []
    try:
        for f in os.listdir(WATCH_FOLDER):
            if f.lower().endswith(
                (".mp4", ".wav", ".png", ".jpg", ".jpeg")
            ):
                files.append(f)
    except FileNotFoundError:
        pass
    return {"files": sorted(files)}


@app.post("/get-advice")
async def get_advice(req: AdviceRequest):
    """
    Given a file path (already on disk), call the LLM and return coaching advice.
    """
    file_path = req.file_path
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}"}

    advice = get_coaching_from_model(file_path)
    return {"advice": advice}


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    """
    Optional: upload a file directly, save to WATCH_FOLDER, then analyze it.
    """
    dst = os.path.join(WATCH_FOLDER, file.filename)
    with open(dst, "wb") as out:
        out.write(await file.read())

    # Simple decide: video/audio calls get_coaching_from_model; images can fall back to same.
    advice = get_coaching_from_model(dst)
    return {"advice": advice}


# ---------------------- MAIN ------------------------------
if __name__ == "__main__":
    import uvicorn

    # Run on 8000 so it matches Electron fetch URL.
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)

