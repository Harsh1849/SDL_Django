import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
os.path.join(BASE_DIR, 'data.csv')