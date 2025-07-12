import os
import json

def memory_path(tag: str) -> str:
    safe_tag = tag.replace("#", "_")
    return os.path.expanduser(f"~/.mycoach/{safe_tag}.json")

def load_memory(tag: str) -> list:
    path = memory_path(tag)
    if not os.path.exists(path):
        return []
    with open(path, "r") as f:
        return json.load(f)

def save_memory(tag: str, memory: list):
    os.makedirs(os.path.dirname(memory_path(tag)), exist_ok=True)
    with open(memory_path(tag), "w") as f:
        json.dump(memory, f, indent=2)
