import Link from "next/link";

const features = [
  { number: "01", tag: "EXPLORE", title: "Understand the dataset", text: "Review the 13 coded input features and learn how structured health data can be prepared for analysis." },
  { number: "02", tag: "MODEL", title: "See machine learning in action", text: "A Logistic Regression model turns a sample profile into an educational probability score." },
  { number: "03", tag: "INTERPRET", title: "Read results responsibly", text: "Explore model evaluation metrics while keeping data quality, limitations, and uncertainty in view." },
];

export default function Home() {
  return (
    <main className="siteShell">
      <header className="topbar">
        <Link href="/" className="brand"><span className="brandMark">♥</span><span>Pulse<span className="brandAccent">Lens</span></span></Link>
        <nav className="navLinks"><Link className="navActive" href="/">Overview</Link><Link className="navButton" href="/prediction">Try the demo <span>↗</span></Link></nav>
      </header>

      <section className="heroHome">
        <div className="heroCopy">
          <div className="pill"><span className="pulseDot"></span> DATA SCIENCE CASE STUDY</div>
          <h1>Finding patterns in<br /><em>heart health data.</em></h1>
          <p className="heroText">PulseLens is an educational machine-learning experience built around your heart.csv dataset. Explore the data story, test a sample profile, and learn what a model can—and cannot—tell us.</p>
          <div className="heroActions"><Link href="/prediction" className="ctaPrimary">Explore prediction <span>→</span></Link><a href="#project" className="ctaSecondary">How it works ↓</a></div>
          <div className="heroFootnote">A student project for learning and demonstration only.</div>
        </div>
        <div className="heroVisual" aria-label="Illustrative heart data visualization">
          <div className="visualOrb orbOne"></div><div className="visualOrb orbTwo"></div>
          <div className="visualCard">
            <div className="visualCardTop"><span className="miniHeart">♥</span><span className="liveLabel">MODEL SNAPSHOT</span><span className="tinyDots">•••</span></div>
            <div className="visualTitle">Heart data, made clearer.</div>
            <div className="chartBars"><span style={{height:"42%"}}></span><span style={{height:"65%"}}></span><span style={{height:"51%"}}></span><span style={{height:"82%"}}></span><span style={{height:"60%"}}></span><span style={{height:"92%"}}></span><span style={{height:"70%"}}></span><span style={{height:"78%"}}></span></div>
            <div className="chartLegend"><span><i className="legendTeal"></i>Feature patterns</span><span>Illustrative view</span></div>
            <div className="visualDivider"></div>
            <div className="visualStats"><div><strong>13</strong><small>input features</small></div><div><strong>2</strong><small>target classes</small></div><div><strong>80/20</strong><small>data split</small></div></div>
          </div>
          <div className="floatBadge"><span>✦</span><div><strong>Learn by exploring</strong><small>Interactive model demo</small></div></div>
        </div>
      </section>

      <section className="dataStrip">
        <div className="stripIntro"><span className="eyebrow">THE DATASET</span><strong>A closer look at the data</strong></div>
        <div className="stripMetric"><strong>1,025</strong><span>rows supplied</span></div>
        <div className="stripMetric"><strong>14</strong><span>columns total</span></div>
        <div className="stripMetric"><strong>0</strong><span>missing cells found</span></div>
        <div className="stripMetric warningMetric"><strong>723</strong><span>exact duplicate rows to review</span></div>
      </section>

      <section id="project" className="projectSection">
        <div className="sectionIntro"><div><span className="eyebrow">THE EXPERIENCE</span><h2>From raw rows to useful learning.</h2></div><p>Three simple steps take you from understanding the data to exploring a model output—with care around what the result means.</p></div>
        <div className="featureGrid">{features.map(item => <article className="featureCard" key={item.number}><div className="featureTop"><span className="featureNumber">{item.number}</span><span className="featureTag">{item.tag}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="featureArrow">↗</div></article>)}</div>
      </section>

      <section className="bottomCallout"><div><span className="eyebrow">READY TO EXPLORE?</span><h2>Try a sample profile.</h2><p>Change the input values and see how the model score responds.</p></div><Link href="/prediction" className="ctaLight">Open prediction demo <span>→</span></Link></section>
      <footer className="footer"><Link href="/" className="brand footerBrand"><span className="brandMark">♥</span><span>Pulse<span className="brandAccent">Lens</span></span></Link><span>Educational prototype · Not for medical use</span><a href="#project">About this project ↑</a></footer>
    </main>
  );
}
