import { topics, type Question } from "./content";
export type Attempt = {
  topic: string;
  answers: number[];
  score: number;
  total: number;
  date: string;
  advanced: boolean;
};
export type State = {
  name: string;
  pro: boolean;
  attempts: Attempt[];
  lastTopic: string;
};
export const initial: State = {
  name: "Estudiante",
  pro: false,
  attempts: [],
  lastTopic: "celula",
};
export const KEY = "con-ciencia-v1";
export function load(raw: string | null): State {
  try {
    const s = JSON.parse(raw || "null");
    if (!s || typeof s !== "object") return { ...initial };
    return {
      name: typeof s.name === "string" ? s.name.slice(0, 60) : initial.name,
      pro: s.pro === true,
      lastTopic: topics.some((t) => t.id === s.lastTopic)
        ? s.lastTopic
        : "celula",
      attempts: Array.isArray(s.attempts)
        ? s.attempts.filter(
            (a: Attempt) =>
              a &&
              topics.some((t) => t.id === a.topic) &&
              Array.isArray(a.answers) &&
              a.answers.every((n) => Number.isInteger(n) && n >= -1 && n < 3) &&
              Number.isInteger(a.score) &&
              Number.isInteger(a.total) &&
              a.total > 0 &&
              a.score >= 0 &&
              a.score <= a.total &&
              typeof a.advanced === "boolean" &&
              typeof a.date === "string" &&
              Number.isFinite(Date.parse(a.date)),
          )
        : [],
    };
  } catch {
    return { ...initial };
  }
}
export function grade(q: Question[], answers: number[]) {
  return q.reduce((n, v, i) => n + (v.correct === answers[i] ? 1 : 0), 0);
}
export function completed(s: State, id: string) {
  return s.attempts.some(
    (a) => a.topic === id && !a.advanced && a.score / a.total >= 2 / 3,
  );
}
export function progress(s: State, unit?: number) {
  const list = topics.filter((t) => !unit || t.unit === unit);
  return Math.round(
    (list.filter((t) => completed(s, t.id)).length / list.length) * 100,
  );
}
export function canUsePro(s: State) {
  return s.pro;
}
export function weakTopics(s: State) {
  return topics.filter((t) => {
    const a = s.attempts.filter((a) => a.topic === t.id && !a.advanced).at(-1);
    return a && a.score < a.total;
  });
}
