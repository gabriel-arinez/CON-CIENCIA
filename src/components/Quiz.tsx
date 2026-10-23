import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Timer, Check, Trophy, RotateCcw, ArrowRight } from "lucide-react";
import { type Topic, type Question } from "../content";
import { grade, type State, type Attempt } from "../model";
import { Button } from "./ui/button";
type Update = (s: State | ((s: State) => State)) => void;
export default function Quiz({
  topic,
  questions,
  update,
  advanced = false,
}: {
  topic: Topic;
  questions: Question[];
  update: Update;
  advanced?: boolean;
}) {
  const [answers, setAnswers] = useState<number[]>(() =>
    questions.map(() => -1),
  );
  const [result, setResult] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(advanced ? 90 : 0);
  const [run, setRun] = useState(0);
  const saved = useRef(false);
  const submit = () => {
    if (saved.current) return;
    saved.current = true;
    const score = grade(questions, answers);
    setResult(score);
    const a: Attempt = {
      topic: topic.id,
      answers: [...answers],
      score,
      total: questions.length,
      date: new Date().toISOString(),
      advanced,
    };
    update((s) => ({ ...s, attempts: [...s.attempts, a] }));
  };
  useEffect(() => {
    if (!advanced || result !== null) return;
    const deadline = Date.now() + 90000;
    const timer = window.setInterval(
      () =>
        setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000))),
      250,
    );
    return () => clearInterval(timer);
  }, [advanced, result, run]);
  useEffect(() => {
    if (advanced && remaining === 0 && result === null) submit();
  });
  return (
    <div className="quiz">
      {advanced && (
        <div className="timer" role="timer">
          <Timer size={18} />
          {remaining}s · {questions.length} preguntas · {questions.length * 100}{" "}
          puntos posibles
        </div>
      )}
      {questions.map((q, i) => (
        <fieldset key={i} disabled={result !== null}>
          <legend>
            {i + 1}. {q.prompt}
          </legend>
          {q.options.map((o, j) => (
            <label
              className={`answer ${answers[i] === j ? "selected" : ""} ${result !== null && j === q.correct ? "correct" : ""} ${result !== null && answers[i] === j && j !== q.correct ? "incorrect" : ""}`}
              key={o}
            >
              <input
                type="radio"
                name={`${topic.id}-${i}`}
                checked={answers[i] === j}
                onChange={() =>
                  setAnswers((a) => a.map((v, k) => (k === i ? j : v)))
                }
              />
              <span>{o}</span>
              {result !== null && j === q.correct && <Check size={17} />}
            </label>
          ))}
          {result !== null && (
            <p className="feedback">
              {answers[i] === q.correct ? "✓ Correcto. " : "↳ Repasemos. "}
              {q.explanation}
            </p>
          )}
        </fieldset>
      ))}
      {result === null ? (
        <Button disabled={answers.includes(-1)} onClick={submit}>
          Comprobar respuestas <Check size={17} />
        </Button>
      ) : (
        <div className="result" role="status">
          <Trophy size={30} />
          <h3>
            {result / questions.length >= 2 / 3
              ? "¡Buen trabajo!"
              : "Cada intento te ayuda a aprender"}
          </h3>
          <strong>
            {result} / {questions.length} ·{" "}
            {Math.round((result / questions.length) * 100)}%
            {advanced ? ` · ${result * 100} puntos` : ""}
          </strong>
          <p>
            {advanced
              ? "Desafío registrado en tu historial."
              : result / questions.length >= 2 / 3
                ? "Tema aprobado. Tu progreso ya se actualizó."
                : "Revisa las explicaciones y vuelve a intentarlo. Tu resultado quedó guardado."}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              saved.current = false;
              setResult(null);
              setAnswers(questions.map(() => -1));
              setRemaining(advanced ? 90 : 0);
              setRun((n) => n + 1);
            }}
          >
            <RotateCcw size={16} /> Repetir evaluación
          </Button>
          <Button asChild variant="ghost">
            <Link to="/progreso">
              Ver mi progreso <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
