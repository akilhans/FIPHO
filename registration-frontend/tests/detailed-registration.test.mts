import assert from "node:assert/strict";
import test from "node:test";

import {
  invalidSubmissionMessage,
  orderParticipantsByTeam,
} from "../lib/detailed-registration.ts";

test("orders all participants delegation-by-delegation", () => {
  const leaders = [
    { id: "team-1-leader-1", delegation_index: 0 },
    { id: "team-2-leader-1", delegation_index: 1 },
    { id: "team-1-leader-2", delegation_index: 0 },
    { id: "team-2-leader-2", delegation_index: 1 },
  ];
  const students = [
    { id: "team-1-student-1", delegation_index: 0 },
    { id: "team-2-student-1", delegation_index: 1 },
    { id: "team-1-student-2", delegation_index: 0 },
    { id: "team-1-student-3", delegation_index: 0 },
    { id: "team-1-student-4", delegation_index: 0 },
    { id: "team-2-student-2", delegation_index: 1 },
    { id: "team-2-student-3", delegation_index: 1 },
    { id: "team-2-student-4", delegation_index: 1 },
  ];

  assert.deepEqual(
    orderParticipantsByTeam(leaders, students).map(({ field }) => field.id),
    [
      "team-1-leader-1",
      "team-1-leader-2",
      "team-1-student-1",
      "team-1-student-2",
      "team-1-student-3",
      "team-1-student-4",
      "team-2-leader-1",
      "team-2-leader-2",
      "team-2-student-1",
      "team-2-student-2",
      "team-2-student-3",
      "team-2-student-4",
    ]
  );
});

test("turns a nested invalid submission into a visible summary", () => {
  assert.equal(
    invalidSubmissionMessage({
      contestants: [{ date_of_birth: { message: "Select the date of birth." } }],
    }),
    "Please correct the highlighted fields before submitting. First issue: Select the date of birth."
  );
});
