from llama_cpp import Llama

llm = Llama(
    model_path="./models/dolphin-2.8-mistral-7b-v02-Q4_K_S.gguf",
    n_ctx=2048,
    n_threads=8  # Adjust based on your CPU cores
)

def get_coaching(prompt: str) -> str:
    response = llm(prompt, max_tokens=512, stop=["</s>"])
    return response["choices"][0]["text"].strip()
