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
