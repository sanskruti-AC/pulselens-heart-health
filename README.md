# Heart Disease Dataset — Machine Learning Case Study

A beginner-friendly final project you can open in VS Code. It includes a Next.js web interface that can be deployed to Vercel, the original CSV, Python EDA/model comparison scripts, and a written case study.

## What is included
- `data/heart.csv` — supplied dataset (1,025 rows, 14 columns).
- `python_analysis/eda.py` — dataset audit and exploratory summary.
- `python_analysis/train_models.py` — compares Logistic Regression, Decision Tree, Random Forest and RBF SVM.
- `public/model.json` — Logistic Regression parameters and holdout metrics used by the browser app.
- `app/` — responsive Next.js user interface and educational prediction form.
- `docs/case_study.md` — report content for your submission.
- `docs/model_comparison.csv` — created after you run the model comparison script.

## Dataset audit from the supplied CSV
- Rows: 1025
- Columns: 14 (13 input features + `target`)
- Missing values: 0
- Exact duplicate rows: 723
- Target 0: 499 rows (48.7%)
- Target 1: 526 rows (51.3%)

Important: the dataset contains 723 exact duplicate rows. The scripts report this rather than silently dropping rows. For a rigorous study, investigate duplicate provenance and repeat evaluation after deduplication as a sensitivity analysis.

## Requirements
- Node.js 18.17+ (Node 20 LTS recommended)
- Python 3.10+
- VS Code
- Internet connection for npm install

## Part A — Run the web app in VS Code
1. Extract this ZIP folder.
2. Open VS Code → **File → Open Folder** → choose `heart_disease_case_study`.
3. Open **Terminal → New Terminal**.
4. Install Node dependencies:
   ```bash
   npm install
   ```
5. Start the local site:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000` in your browser. Keep the terminal running while testing.
7. Change the sample values and press **Calculate educational model score**.

If `npm` is not recognized, install Node.js LTS, close and reopen VS Code, and retry.

## Part B — Run the Python case study
Open a second terminal in VS Code and create a virtual environment:

### Windows PowerShell
```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install pandas scikit-learn
python python_analysis/eda.py
python python_analysis/train_models.py
```

If PowerShell blocks activation, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in that terminal, then activate again. You can also use Command Prompt activation: `.venv\Scripts\activate.bat`.

The comparison script writes `docs/model_comparison.csv`. Do not assume a model is best before running and reviewing the results.

## Part C — Deploy to Vercel
The Next.js website is designed for Vercel. The Python training scripts are for local analysis; they do not need to run on Vercel because the browser app uses the exported Logistic Regression coefficients in `public/model.json`.

### Recommended GitHub + Vercel path
1. Create a GitHub account if you do not already have one.
2. In VS Code, open Source Control, initialize a Git repository, and commit the project.
3. Create a new empty repository on GitHub.
4. In the terminal, run (replace the placeholder with your repository URL):
   ```bash
   git init
   git add .
   git commit -m "Add heart disease case study"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPOSITORY_URL
   git push -u origin main
   ```
5. Sign in to Vercel and choose **Add New → Project**.
6. Import the GitHub repository.
7. Framework preset should be **Next.js**. Use:
   - Build command: `npm run build`
   - Output directory: leave the default/blank for Next.js
   - Install command: `npm install`
8. Click **Deploy** and wait for the build to finish.
9. Open the generated deployment URL and test the form.
10. Future GitHub pushes normally trigger a new deployment automatically.

You can also deploy with the Vercel CLI:
```bash
npm install -g vercel
vercel
```
Follow the CLI prompts, then use `vercel --prod` for a production deployment.

## How the browser prediction works
The training pipeline standardizes the 13 input features using `StandardScaler`, then applies Logistic Regression. `public/model.json` stores feature order, training means/scales, coefficients, intercept and one holdout evaluation. The client computes the logistic probability locally. The web app does not send health inputs to a server.

## Limitations and responsible use
- This is a learning demonstration, not a medical product, diagnostic tool or substitute for a clinician.
- Dataset labels and feature coding depend on the dataset source; confirm the source documentation before making claims.
- The CSV has substantial exact duplication. A random row-level split can put duplicated records in both train and test sets and inflate metrics. Investigate the source and evaluate deduplicated/group-aware splits.
- One split does not prove generalization. Use cross-validation, calibration, subgroup/fairness checks, external validation and clinically appropriate review before any real-world use.
- The 0.50 threshold is a demonstration choice, not a medical decision threshold.


## Redesigned interface (PulseLens)
The current version uses a distinct two-page PulseLens design:
- `/` — overview page with dataset summary, project steps and call to action.
- `/prediction` — interactive form and Logistic Regression score panel.
It uses the same `data/heart.csv` and exported model parameters in `public/model.json`. The interface is inspired by the general idea of a healthcare data landing page, but uses different branding, copy, colors, layout details and components.
