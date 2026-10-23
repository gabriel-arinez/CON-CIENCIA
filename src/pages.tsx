import Science from "./components/Science";
import Quiz from "./components/Quiz";
import LessonVisual from "./components/LessonVisual";
import { challengeQuestions } from "./challenges";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  ChartNoAxesCombined,
  FlaskConical,
  Dna,
  Heart,
  Leaf,
  Sparkles,
  Check,
  Lock,
  Layers,
  Timer,
  RotateCcw,
  ChevronRight,
  Trophy,
  Target,
  Atom,
  CheckCircle2,
} from "lucide-react";
import { topics, units, sources } from "./content";
import { initial, progress, completed, weakTopics, wrongQuestionIndices, type State } from "./model";
import { Button } from "./components/ui/button";
type Update = (s: State | ((s: State) => State)) => void;
const icons = [Atom, Dna, Heart, Leaf];
function Bar({ value }: { value: number }) {
  return (
    <div
      className="bar"
      role="progressbar"
      aria-label="Avance"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
function UnitCard({ unit, s }: { unit: (typeof units)[number]; s: State }) {
  const Icon = icons[unit.id - 1];
  return (
    <Link to={`/cursos/${unit.id}`} className={`unit-card ${unit.color}`}>
      <div className="unit-art">
        <span className="pill">UNIDAD 0{unit.id}</span>
        <Science kind={unit.id - 1} />
      </div>
      <div className="unit-body">
        <div className="eyebrow">
          <Icon size={15} />
          {topics.filter((t) => t.unit === unit.id).length}{" "}
          {unit.id === 4 ? "tema" : "temas"} · A tu ritmo
        </div>
        <h3>{unit.title}</h3>
        <p>{unit.subtitle}</p>
        <div className="row small">
          <span>Tu progreso</span>
          <b>{progress(s, unit.id)}%</b>
        </div>
        <Bar value={progress(s, unit.id)} />
        <span className="card-link">
          Explorar unidad <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
function ToolLinks({ s }: { s: State }) {
  return (
    <div className="tools-grid">
      {[
        {
          id: "desafios",
          icon: Timer,
          title: "Desafíos avanzados",
          text: "Pon a prueba lo que sabes.",
        },
        {
          id: "flashcards",
          icon: Layers,
          title: "Flashcards",
          text: "Pequeñas tarjetas, grandes ideas.",
        },
        {
          id: "repaso",
          icon: Target,
          title: "Repaso personalizado",
          text: "Refuerza lo que necesitas.",
        },
      ].map((t) => (
        <Link className="tool" key={t.id} to={`/herramientas/${t.id}`}>
          <span className={`tool-icon ${t.id}`}>
            <t.icon size={23} />
          </span>
          <div>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
          </div>
          {s.pro ? (
            <ChevronRight size={16} />
          ) : (
            <span className="pro-tag">
              <Lock size={10} /> PRO
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
export function Dashboard({ s }: { s: State }) {
  const t = topics.find((t) => t.id === s.lastTopic)!;
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">TU ESPACIO PARA DESCUBRIR</span>
          <h1>
            ¡Hola, {s.name}! <span className="wave">✦</span>
          </h1>
          <p>Una nueva oportunidad para entender la vida.</p>
        </div>
        <span className="date-badge">
          <Leaf size={17} /> Aprende algo increíble hoy
        </span>
      </div>
      <div className="dashboard-top">
        <section className="hero">
          <div className="hero-copy">
            <span className="pill light">
              <span className="dot" /> TU PRÓXIMO DESCUBRIMIENTO
            </span>
            <h2>
              La vida es fascinante.
              <br />
              Entiéndela con ciencia.
            </h2>
            <p>
              Explora, conecta ideas y descubre todo lo que
              <br className="desktop" /> ocurre dentro y alrededor de ti.
            </p>
            <Button asChild>
              <Link to={`/leccion/${t.id}`}>
                Continuar aprendiendo <ArrowRight size={17} />
              </Link>
            </Button>
            <span className="hero-caption">
              Unidad {t.unit} · {t.title}
            </span>
          </div>
          <div className="hero-science">
            <Science />
            <span className="floating-label">
              <Atom size={16} /> Todo comienza en una célula
            </span>
          </div>
        </section>
        <section className="progress-summary">
          <span className="eyebrow">CADA PASO CUENTA</span>
          <h3>Tu viaje de aprendizaje</h3>
          <div
            className="progress-ring"
            style={{
              background: `conic-gradient(#9176cd ${progress(s) * 3.6}deg,#eeebf4 0)`,
            }}
          >
            <div>
              <strong>
                {progress(s)}
                <small>%</small>
              </strong>
              <span>completado</span>
            </div>
          </div>
          <p>
            <b>{topics.filter((t) => completed(s, t.id)).length}</b> de 15 temas
            completados
          </p>
          <Link to="/progreso">
            Ver mi progreso <ArrowRight size={15} />
          </Link>
        </section>
      </div>
      <div className="section-title">
        <div>
          <span className="eyebrow">EXPLORA A TU RITMO</span>
          <h2>Un mundo por descubrir</h2>
        </div>
        <Link to="/cursos">
          Ver todos los cursos <ArrowRight size={16} />
        </Link>
      </div>
      <div className="unit-grid">
        {units.map((u) => (
          <UnitCard key={u.id} unit={u} s={s} />
        ))}
      </div>
      <div className="section-title">
        <div>
          <span className="eyebrow">APRENDE A TU MANERA</span>
          <h2>Tu laboratorio de aprendizaje</h2>
        </div>
        <span className="pro-tag">
          <Sparkles size={12} /> CON-CIENCIA PRO
        </span>
      </div>
      <ToolLinks s={s} />
      {!s.pro && (
        <section className="pro-banner">
          <span className="sparkle-box">
            <Sparkles />
          </span>
          <div>
            <h3>Un impulso extra para tu curiosidad</h3>
            <p>Descubre más formas de aprender con CON-CIENCIA Pro.</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/plan">
              Explorar Pro <ArrowRight size={16} />
            </Link>
          </Button>
        </section>
      )}
      {s.attempts.length > 0 && (
        <section className="panel">
          <h2>Tu actividad reciente</h2>
          {s.attempts
            .slice(-3)
            .reverse()
            .map((a, i) => (
              <div className="list-row" key={i}>
                <CheckCircle2 size={20} />
                <div>
                  <b>{topics.find((t) => t.id === a.topic)?.title}</b>
                  <p>
                    {a.advanced ? "Desafío Pro" : "Cuestionario"} ·{" "}
                    {new Date(a.date).toLocaleDateString("es-BO")}
                  </p>
                </div>
                <b>
                  {a.score}/{a.total}
                </b>
              </div>
            ))}
        </section>
      )}
    </>
  );
}
export function Courses({ s }: { s: State }) {
  return (
    <>
      <Heading
        eyebrow="TU MAPA DE CONOCIMIENTO"
        title="Explora las unidades"
        text="Cuatro caminos para entender la vida. Todos incluidos en tu plan."
      />
      <div className="unit-grid">
        {units.map((u) => (
          <UnitCard key={u.id} unit={u} s={s} />
        ))}
      </div>
    </>
  );
}
function Heading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}
export function Unit({ s }: { s: State }) {
  const { id } = useParams();
  const u = units.find((u) => u.id === Number(id));
  if (!u) return <Missing />;
  return (
    <>
      <Link className="back" to="/cursos">
        <ArrowLeft size={16} /> Todas las unidades
      </Link>
      <section className={`unit-detail ${u.color}`}>
        <div>
          <span className="eyebrow">UNIDAD 0{u.id}</span>
          <h1>{u.title}</h1>
          <p>{u.description}</p>
          <Bar value={progress(s, u.id)} />
          <p>{progress(s, u.id)}% completado</p>
        </div>
        <Science kind={u.id - 1} />
      </section>
      <section className="panel">
        <h2>Tu ruta de aprendizaje</h2>
        {topics
          .filter((t) => t.unit === u.id)
          .map((t, i) => (
            <Link className="list-row" key={t.id} to={`/leccion/${t.id}`}>
              <span className={`number ${completed(s, t.id) ? "done" : ""}`}>
                {completed(s, t.id) ? (
                  <Check size={20} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              <div>
                <h3>{t.title}</h3>
                <p>Lectura guiada · 3 preguntas</p>
              </div>
              <ChevronRight size={20} />
            </Link>
          ))}
      </section>
    </>
  );
}
export function Lesson({ s, update }: { s: State; update: Update }) {
  const { id } = useParams();
  const t = topics.find((t) => t.id === id);
  const [quiz, setQuiz] = useState(false);
  useEffect(() => {
    if (t)
      update((v) => (v.lastTopic === t.id ? v : { ...v, lastTopic: t.id }));
  }, [t, update]);
  useEffect(() => setQuiz(false), [id]);
  if (!t) return <Missing />;
  return (
    <>
      <Link className="back" to={`/cursos/${t.unit}`}>
        <ArrowLeft size={16} /> Unidad {t.unit}
      </Link>
      <Heading
        eyebrow={`UNIDAD 0${t.unit} · LECCIÓN INTERACTIVA`}
        title={t.title}
        text={
          completed(s, t.id)
            ? "Tema aprobado. ¡Puedes seguir practicando!"
            : "Lee, conecta las ideas y comprueba lo aprendido."
        }
      />
      <div className="lesson-layout">
        <article className="lesson-content">
          {t.sections.map((sec, i) => (
            <section className="panel reading" key={sec.title}>
              <span className="eyebrow">0{i + 1} · EXPLORA</span>
              <h2>{sec.title}</h2>
              <p>{sec.text}</p>
            </section>
          ))}
          <LessonVisual topicId={t.id} />
          <section className="panel">
            <h3>Conecta las ideas</h3>
            <div className="flow">
              {t.flow.map((f, i) => (
                <div key={f}>
                  <span>{f}</span>
                  {i < 2 && <ArrowRight size={18} />}
                </div>
              ))}
            </div>
            <p className="small">
              Esquema conceptual simplificado de la lección.
            </p>
          </section>
          <section className="panel">
            <h2>¿Lo ponemos en práctica?</h2>
            <p>
              Responde 3 preguntas. Apruebas con 2 aciertos y puedes repetir
              cuantas veces quieras.
            </p>
            {!quiz ? (
              <Button onClick={() => setQuiz(true)}>
                Comenzar cuestionario <ArrowRight size={16} />
              </Button>
            ) : (
              <Quiz
                key={t.id}
                topic={t}
                questions={t.questions}
                update={update}
              />
            )}
          </section>
          <div className="lesson-nav">
            {topics[topics.indexOf(t) + 1] && (
              <Button asChild variant="outline">
                <Link to={`/leccion/${topics[topics.indexOf(t) + 1].id}`}>
                  Siguiente tema <ArrowRight size={16} />
                </Link>
              </Button>
            )}
          </div>
        </article>
        <aside>
          <section className="panel lesson-aside">
            <Science kind={t.unit - 1} />
            <h3>Aprende con conciencia</h3>
            <p>
              Lee a tu ritmo. Si algo no queda claro, vuelve a la explicación y
              prueba otra vez.
            </p>
            <div className="divider" />
            <b>Fuentes para profundizar</b>
            {sources
              .filter((_, i) => (t.unit < 3 ? i === 0 : i > 0))
              .map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
                  {s.title} ↗
                </a>
              ))}
          </section>
        </aside>
      </div>
    </>
  );
}
export function Progress({ s }: { s: State }) {
  return (
    <>
      <Heading
        eyebrow="PEQUEÑOS PASOS, GRANDES LOGROS"
        title="Así crece tu conocimiento"
        text="Un tema se completa al aprobar su cuestionario básico con al menos 2 de 3 aciertos."
      />
      <div className="stats-grid">
        {[
          { v: `${progress(s)}%`, l: "Avance general", i: ChartNoAxesCombined },
          {
            v: topics.filter((t) => completed(s, t.id)).length,
            l: "Temas completados",
            i: BookOpen,
          },
          { v: s.attempts.length, l: "Evaluaciones realizadas", i: Trophy },
        ].map((v) => (
          <section className="panel stat" key={v.l}>
            <v.i />
            <strong>{v.v}</strong>
            <span>{v.l}</span>
          </section>
        ))}
      </div>
      <section className="panel">
        <h2>Tu avance por unidad</h2>
        {units.map((u) => (
          <div className="progress-unit" key={u.id}>
            <Link to={`/cursos/${u.id}`}>
              {u.title}
              <b>{progress(s, u.id)}%</b>
            </Link>
            <Bar value={progress(s, u.id)} />
            <p className="small">
              {
                topics.filter((t) => t.unit === u.id && completed(s, t.id))
                  .length
              }{" "}
              de {topics.filter((t) => t.unit === u.id).length} temas aprobados
            </p>
          </div>
        ))}
      </section>
      <section className="panel">
        <h2>Resultados recientes</h2>
        {!s.attempts.length ? (
          <p>
            Aquí aparecerá tu primer logro.{" "}
            <Link to="/leccion/celula">Comienza con La célula →</Link>
          </p>
        ) : (
          s.attempts
            .slice(-5)
            .reverse()
            .map((a, i) => (
              <div className="list-row" key={i}>
                <CheckCircle2 />
                <div>
                  <b>{topics.find((t) => t.id === a.topic)?.title}</b>
                  <p>
                    {a.advanced ? "Desafío Pro" : "Evaluación básica"} ·{" "}
                    {new Date(a.date).toLocaleString("es-BO")}
                  </p>
                </div>
                <strong>
                  {a.score}/{a.total}
                </strong>
              </div>
            ))
        )}
      </section>
      <Button asChild>
        <Link to="/herramientas/estadisticas">
          <ChartNoAxesCombined size={17} /> Estadísticas detalladas{" "}
          {s.pro ? "" : "· Pro"}
        </Link>
      </Button>
    </>
  );
}
export function Profile({ s, update }: { s: State; update: Update }) {
  const [name, setName] = useState(s.name);
  const [notice, setNotice] = useState("");
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <Heading
        eyebrow="TU ESPACIO PERSONAL"
        title="Mi perfil"
        text="Tu curiosidad es el punto de partida."
      />
      <section className="panel profile">
        <div className="avatar big">{s.name.slice(0, 1).toUpperCase()}</div>
        <h2>{s.name}</h2>
        <span className="pill">
          {s.pro ? "Pro · modo demostración" : "Plan Gratuito"}
        </span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update((v) => ({ ...v, name: name.trim() || "Estudiante" }));
            setNotice("Nombre guardado.");
          }}
        >
          <label htmlFor="name">¿Cómo te llamas?</label>
          <input
            id="name"
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button>Guardar nombre</Button>
          <p role="status">{notice}</p>
        </form>
        <Link to="/plan" className="list-row">
          <Sparkles />
          <b>Mi plan</b>
          <ChevronRight />
        </Link>
        <p>
          {
            units.filter((u) =>
              topics.some((t) => t.unit === u.id && completed(s, t.id)),
            ).length
          }{" "}
          unidades con temas aprobados · {s.attempts.length} cuestionarios
          realizados
        </p>
        <Button asChild variant="outline">
          <Link to="/progreso">Consultar avance y resultados</Link>
        </Button>
      </section>
      <section className="panel">
        <h3>Datos de demostración</h3>
        <p>
          El perfil y el avance se guardan solo en este navegador. No se
          utilizan cuentas ni contraseñas.
        </p>
        {!confirm ? (
          <Button variant="outline" onClick={() => setConfirm(true)}>
            <RotateCcw size={16} /> Reiniciar recorrido
          </Button>
        ) : (
          <div role="alert">
            <p>
              Se eliminarán el nombre, los resultados y el acceso Pro de este
              navegador.
            </p>
            <Button
              onClick={() => {
                update({ ...initial, attempts: [] });
                setName(initial.name);
                setConfirm(false);
                setNotice("Recorrido reiniciado.");
              }}
            >
              Sí, borrar mis datos locales
            </Button>{" "}
            <Button variant="ghost" onClick={() => setConfirm(false)}>
              Cancelar
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
export function Plan({ s, update }: { s: State; update: Update }) {
  return (
    <>
      <Heading
        eyebrow="MÁS FORMAS DE DESCUBRIR"
        title="Un plan para tu curiosidad"
        text="El conocimiento esencial está abierto para todos."
      />
      <div className="plans">
        {[false, true].map((pro) => (
          <section
            key={String(pro)}
            className={`panel plan ${pro ? "featured" : ""}`}
          >
            <span className="pill">
              {pro ? "✦ APRENDE UN POCO MÁS" : "TODO LO ESENCIAL"}
            </span>
            <h2>{pro ? "CON-CIENCIA Pro" : "Gratuito"}</h2>
            <div className="price">
              Bs {pro ? "15" : "0"}
              <small>{pro ? "/ mes · referencial" : "/ siempre"}</small>
            </div>
            <p>
              {pro
                ? "Más herramientas para fortalecer tu aprendizaje."
                : "Tu viaje por la biología comienza aquí."}
            </p>
            <ul>
              {[
                "Las 4 unidades y los 15 temas",
                "Cuestionarios básicos ilimitados",
                "Perfil y seguimiento de progreso",
                ...(pro
                  ? [
                      "Desafíos avanzados con temporizador",
                      "Flashcards interactivas",
                      "Repaso según tus errores",
                      "Estadísticas e historial detallados",
                    ]
                  : []),
              ].map((f) => (
                <li key={f}>
                  <Check size={18} />
                  {f}
                </li>
              ))}
            </ul>
            {pro ? (
              <Button onClick={() => update((v) => ({ ...v, pro: !v.pro }))}>
                {s.pro
                  ? "Desactivar demostración Pro"
                  : "Activar demostración Pro"}
                <Sparkles size={16} />
              </Button>
            ) : (
              <span className="pill">
                {!s.pro ? "Tu plan actual" : "Siempre incluido"}
              </span>
            )}
          </section>
        ))}
      </div>
      <section className="demo-note">
        <FlaskConical />
        <div>
          <h3>Modo de demostración, sin pagos</h3>
          <p>
            Activa o desactiva Pro para explorar sus herramientas. El acceso es
            local, no crea una suscripción y conserva tu progreso al cambiar de
            plan.
          </p>
          <b>
            Estado actual: {s.pro ? "Pro de demostración activo" : "Gratuito"}
          </b>
        </div>
      </section>
      {s.pro && <ToolLinks s={s} />}
    </>
  );
}
export function Tools({ s, update }: { s: State; update: Update }) {
  const { tool } = useParams();
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [selected, setSelected] = useState("celula");
  const [started, setStarted] = useState(false);
  const t = topics.find((t) => t.id === selected)!;
  const known = ["desafios", "flashcards", "repaso", "estadisticas"];
  if (!known.includes(tool || "")) return <Missing />;
  if (!s.pro)
    return (
      <>
        <Heading
          eyebrow="CON-CIENCIA PRO"
          title="Dale más espacio a tu curiosidad"
        />
        <section className="panel locked">
          <Lock size={40} />
          <h2>Esta herramienta es exclusiva de Pro</h2>
          <p>
            Todos los temas y cuestionarios básicos siguen disponibles en el
            plan gratuito.
          </p>
          <Button asChild>
            <Link to="/plan">
              Explorar la demostración Pro <Sparkles size={16} />
            </Link>
          </Button>
        </section>
      </>
    );
  return (
    <>
      <Link to="/" className="back">
        <ArrowLeft size={16} /> Inicio
      </Link>
      <Heading
        eyebrow="PRO · MODO DEMOSTRACIÓN"
        title={
          {
            desafios: "Desafíos avanzados",
            flashcards: "Una idea, una tarjeta",
            repaso: "Tu repaso personalizado",
            estadisticas: "Tus estadísticas detalladas",
          }[tool!]!
        }
      />
      {tool === "flashcards" && (
        <>
          <p>
            15 conceptos esenciales. Pulsa la tarjeta para descubrir la
            respuesta.
          </p>
          <button
            className={`flashcard ${flip ? "flipped" : ""}`}
            onClick={() => setFlip((v) => !v)}
            aria-label="Girar tarjeta"
          >
            <span className="eyebrow">
              {topics[index].title} · {index + 1}/15
            </span>
            <Layers size={35} />
            <h2>
              {flip
                ? topics[index].questions[0].options[
                    topics[index].questions[0].correct
                  ]
                : topics[index].questions[0].prompt}
            </h2>
            <p>
              {flip
                ? topics[index].questions[0].explanation
                : "Pulsa para revelar la respuesta ↻"}
            </p>
          </button>
          <div className="flash-nav">
            <Button
              variant="outline"
              onClick={() => {
                setIndex((i) => (i + 14) % 15);
                setFlip(false);
              }}
            >
              Anterior
            </Button>
            <Button
              onClick={() => {
                setIndex((i) => (i + 1) % 15);
                setFlip(false);
              }}
            >
              Siguiente <ArrowRight size={16} />
            </Button>
          </div>
        </>
      )}
      {tool === "desafios" && (
        <section className="panel">
          <h2>Conecta, razona y supera el reto</h2>
          <p>
            3 preguntas de aplicación, 90 segundos y 100 puntos por acierto. Al
            agotarse el tiempo se registran tus respuestas.
          </p>
          <label htmlFor="challenge">Elige tu punto de partida</label>
          <select
            id="challenge"
            disabled={started}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {topics.map((t) => (
              <option value={t.id} key={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          {!started ? (
            <Button onClick={() => setStarted(true)}>
              Comenzar desafío <Timer size={17} />
            </Button>
          ) : (
            <>
              <Quiz
                key={selected}
                topic={t}
                advanced
                questions={challengeQuestions(t)}
                update={update}
              />
              <Button variant="ghost" onClick={() => setStarted(false)}>
                Elegir otro desafío
              </Button>
            </>
          )}
        </section>
      )}
      {tool === "repaso" && (
        <section className="panel">
          <h2>Volvamos a lo que más te ayudará</h2>
          <p>
            Estas recomendaciones usan los errores de tu último cuestionario
            básico de cada tema.
          </p>
          {weakTopics(s).length ? (
            weakTopics(s).map((t) => {
              const a = s.attempts
                .filter((a) => a.topic === t.id && !a.advanced)
                .at(-1)!;
              return (
                <div className="review-item" key={t.id}>
                  <h3>{t.title}</h3>
                  {wrongQuestionIndices(a, t.questions)
                    .map((i) => t.questions[i])
                    .map((q) => (
                      <p key={q.prompt}>
                        <b>{q.prompt}</b>
                        <br />
                        {q.explanation}
                      </p>
                    ))}
                  <Button asChild variant="outline">
                    <Link to={`/leccion/${t.id}`}>
                      Repasar tema <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              );
            })
          ) : (
            <p>
              {s.attempts.length
                ? "¡No tienes errores pendientes en tus últimos cuestionarios básicos!"
                : "Completa un cuestionario básico para obtener recomendaciones."}
            </p>
          )}
        </section>
      )}
      {tool === "estadisticas" && (
        <>
          <section className="panel">
            <h2>Rendimiento por tema</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Tema</th>
                    <th>Intentos</th>
                    <th>Aciertos</th>
                    <th>Errores</th>
                    <th>Mejor resultado básico</th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map((t) => {
                    const a = s.attempts.filter((a) => a.topic === t.id);
                    const basic = a.filter((v) => !v.advanced);
                    return (
                      <tr key={t.id}>
                        <td>{t.title}</td>
                        <td>{a.length}</td>
                        <td>{a.reduce((n, v) => n + v.score, 0)}</td>
                        <td>{a.reduce((n, v) => n + v.total - v.score, 0)}</td>
                        <td>
                          {basic.length
                            ? `${Math.round(Math.max(...basic.map((v) => v.score / v.total)) * 100)}%`
                            : "Sin intento"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="small">
              Los desafíos se atribuyen a su tema de partida e incluyen
              preguntas de los dos temas siguientes. Las respuestas sin marcar
              cuentan como errores.
            </p>
          </section>
          <section className="panel">
            <h2>Historial de intentos</h2>
            {s.attempts.length ? (
              s.attempts
                .slice()
                .reverse()
                .map((a, i) => (
                  <div className="list-row" key={i}>
                    <div>
                      <b>{topics.find((t) => t.id === a.topic)?.title}</b>
                      <p>
                        {new Date(a.date).toLocaleString("es-BO")} ·{" "}
                        {a.advanced ? "Desafío" : "Básico"}
                      </p>
                    </div>
                    <span>
                      {a.score} aciertos · {a.total - a.score} errores
                    </span>
                  </div>
                ))
            ) : (
              <p>Aún no tienes evaluaciones registradas.</p>
            )}
          </section>
        </>
      )}
    </>
  );
}
export function Missing() {
  return (
    <section className="panel">
      <h1>Esta ruta no existe</h1>
      <Button asChild>
        <Link to="/">Volver al inicio</Link>
      </Button>
    </section>
  );
}
