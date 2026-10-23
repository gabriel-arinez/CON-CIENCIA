import { test } from "node:test";
import assert from "node:assert/strict";
import { topics } from "./content";
import { challengeQuestions } from "./challenges";
import { grade, load, type Attempt } from "./model";

test("todas las lecciones tienen tres retos avanzados del mismo tema", () => {
  assert.equal(topics.length, 15);
  for (const t of topics) {
    const questions=challengeQuestions(t);
    assert.equal(questions.length, 3, t.id);
    assert.equal(new Set(questions.map((q) => q.prompt)).size, 3, t.id);
    for (const q of questions) {
      assert.equal(q.options.length, 3);
      assert.ok(q.options[q.correct]);
      assert.ok(q.explanation.length > 20);
    }
    assert.equal(grade(questions, questions.map((q) => q.correct)), 3);
    assert.equal(grade(questions, questions.map((q) => (q.correct+1)%3)), 0);
    const attempt: Attempt={
      topic:t.id, answers:questions.map(q=>q.correct), score:3,
      total:3, date:"2026-10-23T00:00:00.000Z", advanced:true, bankVersion:2,
    };
    assert.equal(load(JSON.stringify({ attempts:[attempt] })).attempts.length,1);
  }
});
test("respuestas correctas distribuidas: sin patrones globales fijos", () => {
  const pattern=topics[0].questions.map(q=>q.correct).join(",");
  assert.ok(topics.some(t=>t.questions.map(q=>q.correct).join(",") !== pattern));
  const positions=new Set(topics.flatMap(t=>t.questions.map(q=>q.correct)));
  assert.deepEqual([...positions].sort(), [0,1,2]);
  const advancedPositions=new Set(topics.flatMap(t=>challengeQuestions(t).map(q=>q.correct)));
  assert.deepEqual([...advancedPositions].sort(), [0,1,2]);
});
