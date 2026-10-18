 "use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import model from "../../public/model.json";

const fields = [
  {key:"age", label:"Age", min:18, max:100, step:1, initial:54, help:"Years"},
  {key:"sex", label:"Sex code", min:0, max:1, step:1, initial:1, help:"0 or 1"},
  {key:"cp", label:"Chest pain type", min:0, max:3, step:1, initial:1, help:"Code 0–3"},
  {key:"trestbps", label:"Resting blood pressure", min:80, max:250, step:1, initial:130, help:"mm Hg"},
  {key:"chol", label:"Serum cholesterol", min:80, max:700, step:1, initial:240, help:"mg/dl"},
  {key:"fbs", label:"Fasting blood sugar indicator", min:0, max:1, step:1, initial:0, help:"0 or 1"},
  {key:"restecg", label:"Resting ECG category", min:0, max:2, step:1, initial:0, help:"Code 0–2"},
  {key:"thalach", label:"Maximum heart rate", min:50, max:230, step:1, initial:150, help:"Dataset value"},
  {key:"exang", label:"Exercise-induced angina", min:0, max:1, step:1, initial:0, help:"0 or 1"},
  {key:"oldpeak", label:"ST depression (oldpeak)", min:0, max:7, step:0.1, initial:1, help:"Dataset value"},
  {key:"slope", label:"Peak exercise ST slope", min:0, max:2, step:1, initial:1, help:"Code 0–2"},
  {key:"ca", label:"Major vessels category", min:0, max:4, step:1, initial:0, help:"Code 0–4"},
  {key:"thal", label:"Thal category", min:0, max:3, step:1, initial:2, help:"Code 0–3"},
] as const;
type FormState = Record<string, number>;
const defaults: FormState = Object.fromEntries(fields.map(f => [f.key, f.initial]));
function score(values: FormState) {
  let z = model.intercept;
  model.featureOrder.forEach((key, i) => { z += model.coefficients[i] * ((values[key] - model.means[i]) / model.scales[i]); });
  return 1 / (1 + Math.exp(-z));
}
export default function Prediction() {
  const [values, setValues] = useState<FormState>(defaults);
  const [submitted, setSubmitted] = useState(false);
  const probability = useMemo(() => score(values), [values]);
  const percent = Math.round(probability * 100);
  function update(key: string, value: string) { setValues(old => ({...old, [key]: Number(value)})); setSubmitted(false); }
  return <main className="siteShell predictionShell">
    <header className="topbar"><Link href="/" className="brand"><span className="brandMark">♥</span><span>Pulse<span className="brandAccent">Lens</span></span></Link><nav className="navLinks"><Link href="/">Overview</Link><Link className="navButton navButtonActive" href="/prediction">Prediction demo <span>↗</span></Link></nav></header>
    <section className="predictionIntro"><Link href="/" className="backLink">← Back to overview</Link><span className="pill"><span className="pulseDot"></span> INTERACTIVE DEMO</span><h1>Explore a sample<br/><em>health profile.</em></h1><p>Adjust the dataset fields below to see the educational model score update. Use sample values only.</p></section>
    <div className="medicalNotice"><strong>Important safety note</strong><p>This model is not clinically validated and must not be used to diagnose, rule out, or treat heart disease. The score is a model output for a dataset class—not a person's actual medical risk.</p></div>
    <div className="predictionGrid">
      <section className="formCard"><div className="cardHeader"><div><span className="eyebrow">STEP 01 / INPUTS</span><h2>Sample profile</h2><p>Feature codes follow the supplied CSV.</p></div><button className="resetButton" onClick={()=>{setValues(defaults);setSubmitted(false)}}>Reset values ↺</button></div>
        <div className="predictionFields">{fields.map(f=><label className="predictionField" key={f.key}><span>{f.label}</span><div className="fieldControl"><input type="number" min={f.min} max={f.max} step={f.step} value={values[f.key]} onChange={e=>update(f.key,e.target.value)}/><small>{f.help}</small></div></label>)}</div>
        <button className="ctaPrimary fullButton" onClick={()=>setSubmitted(true)}>Calculate model score <span>→</span></button>
      </section>
      <aside className="scoreCard"><span className="eyebrow">STEP 02 / MODEL OUTPUT</span><h2>Score overview</h2><p className="scoreDescription">Estimated probability assigned to class 1 by this Logistic Regression model.</p>
        <div className="scoreRing" style={{background:`conic-gradient(#0d9488 0deg, #0d9488 ${probability*360}deg, #e8eef4 ${probability*360}deg, #e8eef4 360deg)`}}><div className="scoreRingInner"><strong>{percent}%</strong><span>model score</span></div></div>
        <div className="classPill">{probability>=.5?"Positive class predicted":"Negative class predicted"}</div><div className="thresholdRow"><span>0%</span><span>Decision threshold: 50%</span><span>100%</span></div><div className="thresholdTrack"><span style={{width:`${percent}%`}}/></div>
        {submitted&&<div className="calculatedMessage"><strong>Score calculated.</strong><br/>The demo uses a 0.50 threshold. This output is not a medical assessment.</div>}
        <div className="metricGrid"><div><small>Test accuracy</small><strong>{(model.metrics.accuracy*100).toFixed(1)}%</strong></div><div><small>Test ROC-AUC</small><strong>{model.metrics.rocAuc.toFixed(3)}</strong></div><div><small>Test recall</small><strong>{(model.metrics.recall*100).toFixed(1)}%</strong></div></div>
        <p className="metricFootnote">Metrics are from one stratified 80/20 split. Duplicate rows may inflate performance; see the case study report.</p>
      </aside>
    </div>
    <footer className="footer"><Link href="/" className="brand footerBrand"><span className="brandMark">♥</span><span>Pulse<span className="brandAccent">Lens</span></span></Link><span>Educational prototype · Not for medical use</span><Link href="/">Return home ↑</Link></footer>
  </main>;
}
