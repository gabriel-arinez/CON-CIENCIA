import { test } from "node:test";
import assert from "node:assert/strict";
import { topics, units } from "./content";
import {
  initial,
  load,
  grade,
  progress,
  completed,
  canUsePro,
  weakTopics,
  remainingSeconds,
  wrongQuestionIndices,
  type State,
} from "./model";
test("currículo exacto: 4 unidades, 15 temas y evaluaciones válidas", () => {
  assert.equal(units.length, 4);
  assert.equal(topics.length, 15);
  assert.deepEqual(
    units.map((u) => topics.filter((t) => t.unit === u.id).length),
    [6, 5, 3, 1],
  );
  assert.equal(new Set(topics.map((t) => t.id)).size, 15);
  for (const t of topics) {
    assert.equal(t.questions.length, 3);
    for (const q of [...t.questions, t.advanced]) {
      assert.ok(q.options[q.correct]);
      assert.equal(new Set(q.options).size, 3);
      assert.ok(q.explanation.length > 20);
    }
    assert.equal(
      grade(
        t.questions,
        t.questions.map((q) => q.correct),
      ),
      3,
    );
    assert.equal(
      grade(
        t.questions,
        t.questions.map((q) => (q.correct + 1) % 3),
      ),
      0,
    );
  }
});
const passed: State = {
  ...initial,
  attempts: [
    {
      topic: "celula",
      answers: [0, 1, 0],
      score: 2,
      total: 3,
      date: new Date().toISOString(),
      advanced: false,
    },
  ],
};
test("avance depende de aprobar y no aumenta al repetir", () => {
  assert.equal(progress(initial), 0);
  assert.equal(progress(passed), 7);
  assert.equal(progress(passed, 1), 17);
  assert.equal(completed(passed, "celula"), true);
  assert.equal(
    progress({ ...passed, attempts: [...passed.attempts, ...passed.attempts] }),
    7,
  );
  assert.equal(
    progress({
      ...passed,
      attempts: passed.attempts.map((a) => ({ ...a, score: 1 })),
    }),
    0,
  );
  assert.equal(
    progress({
      ...passed,
      attempts: passed.attempts.map((a) => ({ ...a, advanced: true })),
    }),
    0,
  );
});
test("persistencia tolera datos corruptos y conserva resultados", () => {
  assert.deepEqual(load("{bad"), initial);
  assert.deepEqual(load(null), initial);
  assert.deepEqual(load(JSON.stringify(passed)), passed);
  assert.equal(load('{"attempts":[null,{}],"pro":"yes"}').attempts.length, 0);
  assert.equal(load('{"pro":"yes"}').pro, false);
});
test("Pro puede desactivarse conservando avance y repaso", () => {
  const pro = { ...passed, pro: true };
  assert.equal(canUsePro(pro), true);
  const free = { ...pro, pro: false };
  assert.equal(canUsePro(free), false);
  assert.equal(progress(free), progress(pro));
  assert.equal(weakTopics(free)[0].id, "celula");
});

test("rechaza notas o respuestas manipuladas y preserva intentos V1", () => {
  assert.equal(load(JSON.stringify(passed)).attempts.length, 1);
  assert.equal(wrongQuestionIndices(passed.attempts[0], topics[0].questions).length, 1);
  const fake = { ...passed.attempts[0], score: 3 };
  assert.equal(load(JSON.stringify({ ...passed, attempts: [fake] })).attempts.length, 0);
  const noAnswer = { ...passed.attempts[0], answers: [0], score: 1 };
  assert.equal(load(JSON.stringify({ ...passed, attempts: [noAnswer] })).attempts.length, 0);
  const bankTwo = {
    ...passed.attempts[0],
    answers: topics[0].questions.map(q => q.correct),
    score: 3,
    bankVersion: 2,
  };
  assert.equal(load(JSON.stringify({ ...passed, attempts: [bankTwo] })).attempts.length, 1);
  const badNew = { ...bankTwo, answers: [0, 0, 0], score: 3 };
  if (badNew.answers.some((answer, i) => answer !== topics[0].questions[i].correct)) {
    assert.equal(load(JSON.stringify({ ...passed, attempts: [badNew] })).attempts.length, 0);
  }
});
test("temporizador respeta 90 segundos y vence al llegar a cero", () => {
  assert.equal(remainingSeconds(90000, 0), 90);
  assert.equal(remainingSeconds(90000, 250), 90);
  assert.equal(remainingSeconds(90000, 89500), 1);
  assert.equal(remainingSeconds(90000, 90000), 0);
  assert.equal(remainingSeconds(90000, 92000), 0);
});
