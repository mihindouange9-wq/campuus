import { problem } from "../content/fr";

export function Problem() {
  return (
    <section className="section problem" id="probleme" aria-labelledby="problem-title">
      <div className="wrap problem__grid">
        <div className="problem__copy">
          <h2 id="problem-title" data-reveal data-split>{problem.title}</h2>
          <p className="lead" data-reveal>{problem.lead}</p>
          <ul className="problem__points">
            {problem.points.map((p) => (
              <li key={p.title} data-reveal>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <figure className="chat" data-reveal aria-label="Une conversation de groupe où la question reste sans réponse">
          <figcaption className="chat__head">
            <span className="chat__name">{problem.chat.name}</span>
            <span className="chat__meta">{problem.chat.caption}</span>
          </figcaption>
          <ul className="chat__list" data-stagger>
            {problem.chat.messages.map((m, i) => (
              <li key={i} className={`chat__msg${m.me ? " chat__msg--me" : ""}`}>
                <span className="chat__from">{m.from}</span>
                <span className="chat__text">{m.text}</span>
                <span className="chat__at num">{m.at}</span>
                {m.me ? <span className="chat__unanswered" data-stamp>{problem.chat.note}</span> : null}
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}
