import re
import json
import random

def generate_objectid():
    """Generira nasumični 24-znamenkasti hex string za MongoDB $oid"""
    return ''.join(random.choices('0123456789abcdef', k=24))

# učitaj log
with open("log.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

data = []
seen_emails = set()  # za provjeru duplikata

pattern = r"Diploma poslana:\s*(.*?)\s*\((.*?)\)\s*-\s*(.*)"

for line in lines:
    match = re.match(pattern, line.strip())
    if match:
        ime, email, kategorija = match.groups()
        email = email.strip()
        if email.lower() in seen_emails:
            continue  # preskoči ako je email već dodan
        seen_emails.add(email.lower())
        data.append({
            "_id": {"$oid": generate_objectid()},
            "ime": ime.strip(),
            "email": email,
            "kategorija": kategorija.strip()
        })

# spremi u JSON
with open("diplome.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print(f"Gotov JSON zapis u diplome.json, ukupno {len(data)} jedinstvenih zapisa.")
