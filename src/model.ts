import { topics, type Question } from "./content";
import { challengeQuestions } from "./challenges";
export type Attempt = {
  topic: string;
  answers: number[];
  score: number;
  total: number;
  date: string;
  advanced: boolean;
  bankVersion?: 2;
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
export function grade(q: Question[], answers: number[]) {
  return q.reduce((n, v, i) => n + (v.correct === answers[i] ? 1 : 0), 0);
}
// Prior releases used 0,1,0 for basic quizzes and 1,1,1 in Pro.
// Their scores remain valid and their progress is retained after the V2 shuffle.
export function correctAnswerIndex(attempt: Attempt, index: number, current: number) {
  if (attempt.bankVersion === 2) return current;
  return attempt.advanced ? 1 : (index % 2 ? 1 : 0);
}
export function wrongQuestionIndices(attempt: Attempt, questions: Question[]) {
  return questions
    .map((q, i) => correctAnswerIndex(attempt, i, q.correct) !== attempt.answers[i] ? i : -1)
    .filter((i) => i >= 0);
}
function validAttempt(value: unknown): value is Attempt {
  if (!value || typeof value !== "object") return false;
  const a = value as Partial<Attempt>;
  const topic = topics.find((t) => t.id === a.topic);
  if (!topic || typeof a.advanced !== "boolean") return false;
  if (a.bankVersion !== undefined && a.bankVersion !== 2) return false;
  if (!Array.isArray(a.answers) || a.answers.length !== 3 ||
      !a.answers.every((n) => Number.isInteger(n) && n >= -1 && n < 3)) return false;
  if (a.total !== 3 || !Number.isInteger(a.score) ||
      a.score < 0 || a.score > a.total) return false;
  if (typeof a.date !== "string" || !Number.isFinite(Date.parse(a.date))) return false;
  const questions = a.advanced ? challengeQuestions(topic) : topic.questions;
  const expected = questions.reduce(
    (sum, q, index) =>
      sum + (correctAnswerIndex(a as Attempt, index, q.correct) === a.answers![index] ? 1 : 0),
    0,
  );
  return a.score === expected;
}
export function load(raw: string | null): State {
  try {
    const s: unknown = JSON.parse(raw || "null");
    if (!s || typeof s !== "object") return { ...initial };
    const state = s as Partial<State>;
    return {
      name: typeof state.name === "string" ? state.name.slice(0, 60) : initial.name,
      pro: state.pro === true,
      lastTopic: topics.some((t) => t.id === state.lastTopic)
        ? state.lastTopic!
        : initial.lastTopic,
      attempts: Array.isArray(state.attempts)
        ? state.attempts.filter(validAttempt)
        : [],
    };
  } catch {
    return { ...initial };
  }
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
export function remainingSeconds(deadline: number, now: number) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
