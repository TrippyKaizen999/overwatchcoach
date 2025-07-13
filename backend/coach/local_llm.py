from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load the model and tokenizer once, when local_llm.py loads
model_name = "path_to_your_dolphin_2.8_model_folder"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16, device_map="auto")

def generate_text(prompt, max_length=200):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_length=max_length)
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return text
