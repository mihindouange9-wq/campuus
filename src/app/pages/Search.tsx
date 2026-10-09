import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { Avatar, AvailabilityTag, Button, ButtonLink, Empty, ErrorState, Field, Loading, Select } from "../../components/ui";
import { api, type SearchQuery, type SearchResult } from "../../services/api";
import { CHAPTERS, COUNTRIES, FIELDS, INSTITUTIONS, SUBJECTS, chapter, institution, subject } from "../../data/mock";
import { LEVELS } from "../../data/types";

const KEYS = ["q", "field", "subject", "chapter", "level", "country", "institution", "availability", "sort"] as const;

export function Component() {
  const [params, setParams] = useSearchParams();
  const get = (k: string) => params.get(k) ?? "";
  const [q, setQ] = useState(get("q"));
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => { document.title = "Trouver un étudiant — CAMPUUS"; }, []);
  useEffect(() => { setQ(get("q")); }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  const query: SearchQuery = useMemo(() => ({
    q: get("q") || undefined, field: get("field") || undefined, subjectId: get("subject") || undefined, chapterId: get("chapter") || undefined,
    level: get("level") || undefined, country: get("country") || undefined, institutionId: get("institution") || undefined, availability: get("availability") || undefined,
    sort: (get("sort") || "pertinence") as SearchQuery["sort"],
  }), [params]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let alive = true;
    setResults(null); setError(null);
    api().searchStudents(query).then((r) => { if (alive) setResults(r); }).catch(() => { if (alive) setError("La recherche a échoué. Vérifie ta connexion et réessaie."); });
    return () => { alive = false; };
  }, [query]);

  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) { if (v) next.set(k, v); else next.delete(k); }
    if ("subject" in patch) next.delete("chapter");
    setParams(next, { replace: true });
  };
  const submit = (e: FormEvent) => { e.preventDefault(); update({ q: q.trim() }); };
  const activeCount = KEYS.filter((k) => k !== "q" && k !== "sort" && get(k)).length;
  const chapters = CHAPTERS.filter((c) => !get("subject") || c.subjectId === get("subject"));
  const institutions = INSTITUTIONS.filter((i) => !get("country") || i.country === get("country"));

  return (
    <div className="screen">
      <div className="screen__head">
        <div>
          <h1>Trouver un étudiant</h1>
          <p>Cherche un chapitre précis : tu verras qui peut l'expliquer et quand.</p>
        </div>
      </div>

      <form className="searchbar" onSubmit={submit} role="search">
        <SearchIcon size={20} aria-hidden="true" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex. actualisation, jointures SQL, formation du contrat…" aria-label="Mots-clés" />
        <Button type="submit" size="sm">Chercher</Button>
      </form>

      <div className="filters__bar">
        <div className="chips" role="group" aria-label="Disponibilité">
          {[["", "Toutes disponibilités"], ["now", "Maintenant"], ["tonight", "Ce soir"], ["weekend", "Ce week-end"]].map(([v, l]) => (
            <button key={v} type="button" className={`chip${get("availability") === v ? " chip--on" : ""}`} aria-pressed={get("availability") === v} onClick={() => update({ availability: v })}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
          <button type="button" className={`chip${showFilters || activeCount ? " chip--on" : ""}`} aria-expanded={showFilters} aria-controls="filtres" onClick={() => setShowFilters((s) => !s)}>
            <SlidersHorizontal size={14} /> Filtres{activeCount ? ` (${activeCount})` : ""}
          </button>
          <label className="visually-hidden" htmlFor="sort">Trier</label>
          <Select id="sort" value={get("sort") || "pertinence"} onChange={(e) => update({ sort: e.target.value })} style={{ minHeight: 36, fontSize: "0.875rem" }}>
            <option value="pertinence">Pertinence</option>
            <option value="disponibilite">Disponibilité</option>
            <option value="proximite">Proximité</option>
            <option value="aides">Aides données</option>
          </Select>
        </div>
      </div>

      {showFilters || activeCount ? (
        <div className="filters" id="filtres">
          <Field id="f-field" label="Filière"><Select id="f-field" value={get("field")} onChange={(e) => update({ field: e.target.value })}><option value="">Toutes</option>{FIELDS.map((f) => <option key={f}>{f}</option>)}</Select></Field>
          <Field id="f-subject" label="Matière"><Select id="f-subject" value={get("subject")} onChange={(e) => update({ subject: e.target.value })}><option value="">Toutes</option>{SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</Select></Field>
          <Field id="f-chapter" label="Chapitre"><Select id="f-chapter" value={get("chapter")} onChange={(e) => update({ chapter: e.target.value })}><option value="">Tous</option>{chapters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select></Field>
          <Field id="f-level" label="Niveau"><Select id="f-level" value={get("level")} onChange={(e) => update({ level: e.target.value })}><option value="">Tous</option>{LEVELS.map((l) => <option key={l}>{l}</option>)}</Select></Field>
          <Field id="f-country" label="Pays"><Select id="f-country" value={get("country")} onChange={(e) => update({ country: e.target.value, institution: "" })}><option value="">Tous</option>{COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}</Select></Field>
          <Field id="f-inst" label="Établissement"><Select id="f-inst" value={get("institution")} onChange={(e) => update({ institution: e.target.value })}><option value="">Tous</option>{institutions.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}</Select></Field>
          {activeCount ? <div style={{ alignSelf: "end" }}><Button variant="ghost" size="sm" onClick={() => update({ field: "", subject: "", chapter: "", level: "", country: "", institution: "", availability: "" })}>Effacer les filtres</Button></div> : null}
        </div>
      ) : null}

      {error ? <ErrorState text={error} retry={() => update({})} /> : results === null ? <Loading label="Recherche en cours…" rows={4} /> : results.length === 0 ? (
        <Empty title="Personne ne correspond encore à cette recherche." text="Élargis la recherche : enlève un filtre, essaie la matière plutôt que le chapitre, ou ouvre à d'autres pays. Le réseau grandit avec chaque inscription." action={<ButtonLink to="/app/groupes" variant="secondary" size="sm">Voir les groupes d'étude</ButtonLink>} />
      ) : (
        <>
          <p className="filters__count" aria-live="polite">{results.length} étudiant{results.length > 1 ? "s" : ""}{get("q") ? ` pour « ${get("q")} »` : ""}</p>
          <ul className="students">
            {results.map(({ student: s, matchedChapters, sameInstitution, sameCountry }) => (
              <li key={s.id}>
                <Link to={`/app/etudiants/${s.id}`} className="student-row">
                  <Avatar student={s} size={44} />
                  <span className="student-row__who">
                    <span className="student-row__name">{s.showName ? s.name : s.pseudo} <small>{s.field} · {s.level}{s.showInstitution ? ` · ${institution(s.institutionId).name}, ${institution(s.institutionId).city}` : " · établissement masqué"}</small></span>
                    <span className="student-row__meta">{s.bio}</span>
                    <span className="student-row__chapters">{(matchedChapters.length ? matchedChapters : s.masters.slice(0, 3)).map((m) => <span key={m}>{chapter(m).name} · {subject(chapter(m).subjectId).name}</span>)}</span>
                  </span>
                  <span className="student-row__right">
                    <AvailabilityTag value={s.availability} short />
                    <span className="student-row__why">{sameInstitution ? "ton établissement" : sameCountry ? "ton pays" : "autre pays"} · {s.helped} aides (démo)</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
