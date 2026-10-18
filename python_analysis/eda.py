"""Basic data audit and EDA summary. Run: python python_analysis/eda.py"""
from pathlib import Path
import pandas as pd
ROOT = Path(__file__).resolve().parents[1]
df = pd.read_csv(ROOT / "data" / "heart.csv")
print("SHAPE:", df.shape)
print("\nCOLUMNS / TYPES:\n", df.dtypes)
print("\nMISSING VALUES:\n", df.isna().sum())
print("\nDUPLICATE ROWS:", df.duplicated().sum())
print("\nTARGET COUNTS:\n", df["target"].value_counts().sort_index())
print("\nNUMERIC SUMMARY:\n", df.describe().round(2).to_string())
print("\nTarget meaning in this dataset: 0 = lower likelihood/no disease label; 1 = disease label.")
print("This is a learning dataset; do not use for real diagnosis.")
