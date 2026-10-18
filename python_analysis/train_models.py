"""Compare baseline classifiers on heart.csv. Run: python python_analysis/train_models.py"""
from pathlib import Path
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, classification_report

ROOT = Path(__file__).resolve().parents[1]
df = pd.read_csv(ROOT / "data" / "heart.csv")
X, y = df.drop(columns="target"), df["target"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
models = {
    "Logistic Regression": make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)),
    "Decision Tree": DecisionTreeClassifier(max_depth=5, random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=300, random_state=42, class_weight="balanced"),
    "RBF SVM": make_pipeline(StandardScaler(), SVC(probability=True, random_state=42)),
}
rows = []
for name, model in models.items():
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    prob = model.predict_proba(X_test)[:, 1]
    rows.append({
        "model": name,
        "accuracy": accuracy_score(y_test, pred),
        "precision": precision_score(y_test, pred, zero_division=0),
        "recall": recall_score(y_test, pred, zero_division=0),
        "f1": f1_score(y_test, pred, zero_division=0),
        "roc_auc": roc_auc_score(y_test, prob),
    })
    print(f"\\n{name}\\n{classification_report(y_test, pred, zero_division=0)}")
results = pd.DataFrame(rows).sort_values("roc_auc", ascending=False)
print("\\nMODEL COMPARISON")
print(results.to_string(index=False, float_format=lambda x: f"{x:.3f}"))
results.to_csv(ROOT / "docs" / "model_comparison.csv", index=False)
