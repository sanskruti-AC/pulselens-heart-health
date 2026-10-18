# Case Study: Machine Learning-Based Heart Disease Dataset Exploration

## 1. Title
**Exploratory Analysis and Classification of Heart Disease Labels Using Machine Learning**

## 2. Abstract
This case study examines a structured heart-health dataset containing 1025 rows, 13 input features and one binary target column. The goal is to understand the data, prepare it for machine learning, compare classification approaches and present a transparent educational prediction interface. Logistic Regression is used by the web demo because its parameters can be exported in a compact format and evaluated in the browser. Decision Tree, Random Forest and RBF Support Vector Machine are included in the Python comparison workflow. This project is intended for education and is not suitable for medical diagnosis.

## 3. Problem statement
Heart-related datasets can contain multiple clinical measurements whose combined relationship with a recorded target label is not straightforward to inspect manually. The project uses exploratory data analysis and supervised classification to investigate whether the supplied features can distinguish the dataset's two target classes and to communicate model output responsibly.

## 4. Objectives
1. Inspect the dataset structure, feature types, missing values, duplicate rows and target balance.
2. Summarize distributions and explore how selected attributes vary across target classes.
3. Train and compare several classification algorithms using a reproducible holdout split.
4. Evaluate models with accuracy, precision, recall, F1-score and ROC-AUC.
5. Build a responsive web interface that demonstrates model scoring and clearly explains limitations.

## 5. Dataset description
The supplied file is `heart.csv`. It has **1025 records and 14 columns**. The target distribution is **class 0: 499 (48.7%)** and **class 1: 526 (51.3%)**. There are **0 missing cells** and **723 exact duplicate rows**.

### Feature dictionary (confirm coding against the original dataset source)
| Column | General meaning |
|---|---|
| `age` | Age in years |
| `sex` | Encoded sex category (0/1) |
| `cp` | Encoded chest-pain category |
| `trestbps` | Resting blood pressure |
| `chol` | Serum cholesterol |
| `fbs` | Encoded fasting blood sugar indicator |
| `restecg` | Encoded resting ECG result |
| `thalach` | Maximum heart rate achieved |
| `exang` | Encoded exercise-induced angina indicator |
| `oldpeak` | ST depression value |
| `slope` | Encoded slope category |
| `ca` | Encoded number of major vessels |
| `thal` | Encoded thalassemia-related category |
| `target` | Binary label: 0 or 1 as encoded by the dataset |

Do not infer the meaning of a target label beyond the source documentation. In this prototype, class 1 is described as the positive dataset class, not a definitive diagnosis.

## 6. Methodology
1. **Data collection:** Load the provided CSV with pandas.
2. **Data audit:** Check dimensions, column types, missing values, duplicates, target distribution and summary statistics.
3. **Preprocessing:** Use the 13 feature columns and target as the label. A stratified 80/20 train/test split with `random_state=42` preserves approximate target proportions. Standardize features for Logistic Regression and SVM using a pipeline to prevent the scaler from learning from test data.
4. **Model training:** Compare Logistic Regression, Decision Tree, Random Forest and RBF SVM.
5. **Evaluation:** Calculate accuracy, precision, recall, F1-score and ROC-AUC. Inspect classification reports rather than relying on accuracy alone.
6. **Deployment:** Export the fitted Logistic Regression scaling parameters and coefficients to JSON, then use the same logistic equation in the Next.js client interface.
7. **Responsible interpretation:** Present predictions as educational scores only.

## 7. Exploratory findings from initial audit
- The dataset contains 1025 records and 13 candidate predictors.
- No missing values are present in the uploaded CSV.
- The exact duplicate count is 723, which is a major data-quality concern.
- The target classes are fairly balanced in row counts, but duplicate records may distort the effective distribution and evaluation.
- Feature scales differ, so standardization is used for Logistic Regression and SVM.
- These are descriptive findings only; they do not establish causal relationships or medical risk factors.

## 8. Model evaluation
The web demo's Logistic Regression model uses a stratified 80/20 split and a fixed random seed. Its holdout metrics from the supplied CSV are:

| Metric | Value |
|---|---:|
| Accuracy | 0.810 |
| Precision | 0.762 |
| Recall | 0.914 |
| F1-score | 0.831 |
| ROC-AUC | 0.930 |

These are initial reproducibility numbers, not independent clinical validation. Because there are 723 duplicate rows, a random split may place identical rows in both training and test sets and overstate performance. Run `python python_analysis/train_models.py` for the comparison table. For a stronger study, compare the same models on a deduplicated dataset and document the change in metrics.

## 9. System design
**Input:** 13 numeric/coded features entered by the user.  
**Processing:** Standardize each value using the training-set mean and scale; calculate `z = intercept + sum(coefficient_i × standardized_feature_i)`; convert to probability with `p = 1 / (1 + exp(-z))`.  
**Output:** Score for class 1 and threshold-based class label at 0.50.  
**Interface:** Next.js/React, responsive form and metric summary.  
**Deployment:** Vercel builds and hosts the Next.js frontend; the static JSON model parameters are bundled with the site.

## 10. Expected outcomes
- A reproducible data audit and EDA summary.
- A model comparison table generated by the included Python script.
- A working web application that demonstrates model scoring.
- A written explanation of model evaluation and dataset limitations.
- A clear deployment process suitable for a student project.

## 11. Limitations
- The data source and collection methodology should be cited from the original source before formal submission.
- Many exact duplicates can create data leakage in a row-wise random split.
- The labels may not represent a calibrated probability of disease for a new individual.
- Dataset population, measurement protocols, feature coding and class definitions may differ from a real clinical setting.
- No external validation, calibration, prospective evaluation or clinician review has been performed.
- The deployed score is not medical advice and should not guide diagnosis or treatment.

## 12. Future scope
1. Verify the original dataset provenance and license.
2. Conduct deduplication sensitivity analysis and use robust cross-validation.
3. Add calibration plots, confusion matrices and subgroup evaluation.
4. Add explainability with SHAP or coefficient interpretation in a clearly non-clinical research context.
5. Obtain independent external validation and expert governance before considering any clinical application.

## 13. Conclusion
This case study demonstrates the end-to-end workflow of auditing a dataset, comparing classifiers, evaluating predictions and deploying a small interactive web application. The most important finding is not a medical conclusion but a methodological one: dataset quality and evaluation design matter. The high duplicate count must be investigated before treating the reported metrics as reliable. The app is a student learning prototype only.

## 14. How to reproduce
Follow the setup and deployment instructions in the root `README.md`. Run `python python_analysis/eda.py`, then `python python_analysis/train_models.py`, then `npm install` and `npm run dev`.
