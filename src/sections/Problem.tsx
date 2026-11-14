import { problem } from "../content/fr";

export function Problem() {
  return (
    <section className="section problem" id="probleme" aria-labelledby="problem-title">
      <div className="wrap problem__grid">
        <div className="problem__copy">
          <h2 id="problem-title" data-split>{problem.title}</h2>
          <p className="lead" data-reveal>{problem.lead}</p>
        </div>
        <ul className="problem__points" data-stagger>
          {problem.points.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
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
        <figure className="photo photo--problem" data-reveal>
            <img src={`/photos/${problem.chat.photo.src}-${problem.chat.photo.w}-web.webp`} srcSet={`/photos/${problem.chat.photo.src}-${problem.chat.photo.w / 2}.webp ${problem.chat.photo.w / 2}w, /photos/${problem.chat.photo.src}-${problem.chat.photo.w}-web.webp ${problem.chat.photo.w}w`} sizes="(max-width: 860px) 90vw, 24vw" alt={problem.chat.photo.alt} width={problem.chat.photo.w} height={Math.round(problem.chat.photo.w / problem.chat.photo.ratio)} loading="lazy" decoding="async" />
            <figcaption>{problem.chat.photo.caption}</figcaption>
          </figure>
      </div>
    </section>
  );
}
