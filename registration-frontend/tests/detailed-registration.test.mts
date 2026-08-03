import assert from "node:assert/strict";
import test from "node:test";

import {
  delegationCompositionErrors,
  invalidSubmissionMessage,
  orderParticipantsByTeam,
} from "../lib/detailed-registration.ts";

test("accepts supported delegation compositions", () => {
  assert.deepEqual(delegationCompositionErrors(0, 0), []);
  assert.deepEqual(delegationCompositionErrors(1, 0), []);
  assert.deepEqual(delegationCompositionErrors(2, 5), []);
});

test("rejects delegation compositions outside the limits", () => {
  assert.deepEqual(delegationCompositionErrors(3, 0), [
    {
      field: "team_leaders",
      message: "Each delegation may have up to 2 team leaders.",
    },
  ]);
  assert.deepEqual(delegationCompositionErrors(0, 6), [
    {
      field: "contestants",
      message: "Each delegation may have up to 5 students.",
    },
  ]);
});

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
    { id: "team-1-student-5", delegation_index: 0 },
    { id: "team-2-student-2", delegation_index: 1 },
    { id: "team-2-student-3", delegation_index: 1 },
    { id: "team-2-student-4", delegation_index: 1 },
    { id: "team-2-student-5", delegation_index: 1 },
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
      "team-1-student-5",
      "team-2-leader-1",
      "team-2-leader-2",
      "team-2-student-1",
      "team-2-student-2",
      "team-2-student-3",
      "team-2-student-4",
      "team-2-student-5",
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

test("reports participant errors in delegation-first order", () => {
  assert.equal(
    invalidSubmissionMessage(
      {
        team_leaders: [
          undefined,
          { full_name: { message: "Delegation 2 leader." } },
        ],
        contestants: [{ full_name: { message: "Delegation 1 student." } }],
      },
      [
        { kind: "student", index: 0 },
        { kind: "leader", index: 1 },
      ]
    ),
    "Please correct the highlighted fields before submitting. First issue: Delegation 1 student."
  );
});
