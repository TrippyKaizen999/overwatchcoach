from fastapi import FastAPI
from pydantic import BaseModel
from coach.parser import parse_replay
from coach.llm_interface import get_coaching
from coach.memory import load_memory, save_memory

app = FastAPI()

class CoachRequest(BaseModel):
    tag: str
    replay_path: str

@app.post("/coach")
def coach(req: CoachRequest):
    summary = parse_replay(req.replay_path)
    memory = load_memory(req.tag)
    history = "\n".join([m["advice"] for m in memory[-3:]]) if memory else "No history yet."
    prompt = f"You are an Overwatch coach AI.\nReplay Summary:\n{summary}\n\nRecent Coaching:\n{history}\n\nGive personalized advice:"
    advice = get_coaching(prompt)
    memory.append({"summary": summary, "advice": advice})
    save_memory(req.tag, memory)
    return {"advice": advice}

@app.get("/ping")
def ping():
    return {"status": "ok"}


