import assert from "node:assert/strict";
import test from "node:test";

import {
  DOCUMENT_TYPES,
  IMAGE_TYPES,
  delegationCompositionErrors,
  describeSubmissionErrors,
  fileProblem,
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

test("describes every server error with the form's own labels", () => {
  const lines = describeSubmissionErrors({
    non_field_errors: ["Must confirm information accuracy and agree to rules."],
    delegations: [
      {
        team_leaders: [
          {},
          { passport_scan: ["This file is HEIC, which is not accepted. Please upload a JPEG, PNG or PDF file."] },
        ],
      },
      { contestants: [{ date_of_birth: ["Too old."], id_photo: ["This file is required."] }] },
    ],
  });

  assert.deepEqual(lines, [
    "Must confirm information accuracy and agree to rules.",
    "Delegation 1 · Leader 2 · Passport scan: This file is HEIC, which is not accepted. Please upload a JPEG, PNG or PDF file.",
    "Delegation 2 · Student 1 · Date of birth: Too old.",
    "Delegation 2 · Student 1 · ID photo: This file is required.",
  ]);
});

test("describes top-level and plain detail errors", () => {
  assert.deepEqual(
    describeSubmissionErrors({ detail: "Total uploaded file size must not exceed 550 MB." }),
    ["Total uploaded file size must not exceed 550 MB."]
  );
  assert.deepEqual(describeSubmissionErrors({ country: ["Invalid pk \"999\" - object does not exist."] }), [
    "Country: Invalid pk \"999\" - object does not exist.",
  ]);
  assert.deepEqual(describeSubmissionErrors(null), []);
});

test("flags files the server would reject, in the server's words", () => {
  assert.equal(fileProblem({ type: "application/pdf", size: 1000 }, DOCUMENT_TYPES), undefined);
  assert.equal(fileProblem({ type: "image/png", size: 1000 }, IMAGE_TYPES), undefined);
  assert.equal(
    fileProblem({ type: "image/heic", size: 1000 }, DOCUMENT_TYPES),
    "This file is HEIC, which is not accepted. Please upload a JPEG, PNG or PDF file. On iPhone or Mac, export or save the photo as JPEG first."
  );
  assert.equal(
    fileProblem({ type: "application/pdf", size: 1000 }, IMAGE_TYPES),
    "This file is PDF, which is not accepted. Please upload a JPEG or PNG file."
  );
  assert.equal(
    fileProblem({ type: "", size: 1000 }, IMAGE_TYPES),
    "This file is an unrecognised type, which is not accepted. Please upload a JPEG or PNG file."
  );
  assert.equal(
    fileProblem({ type: "application/pdf", size: 30 * 1024 * 1024 }, DOCUMENT_TYPES),
    "This file is 30.0 MB. Files must not exceed 25 MB."
  );
});
