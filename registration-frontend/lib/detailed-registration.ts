type DelegationField = {
  delegation_index: number;
};

export const MAX_TEAM_LEADERS = 2;
export const MAX_STUDENTS = 5;

export function delegationCompositionErrors(
  leaderCount: number,
  studentCount: number
) {
  return [
    ...(leaderCount > MAX_TEAM_LEADERS
      ? [
          {
            field: "team_leaders" as const,
            message: "Each delegation may have up to 2 team leaders.",
          },
        ]
      : []),
    ...(studentCount > MAX_STUDENTS
      ? [
          {
            field: "contestants" as const,
            message: "Each delegation may have up to 5 students.",
          },
        ]
      : []),
  ];
}

export function orderParticipantsByTeam<
  TLeader extends DelegationField,
  TStudent extends DelegationField,
>(leaders: TLeader[], students: TStudent[]) {
  return [
    ...leaders.map((field, index) => ({ kind: "leader" as const, field, index })),
    ...students.map((field, index) => ({ kind: "student" as const, field, index })),
  ].sort((left, right) => {
    const delegationOrder =
      left.field.delegation_index - right.field.delegation_index;
    if (delegationOrder) return delegationOrder;
    if (left.kind !== right.kind) return left.kind === "leader" ? -1 : 1;
    return left.index - right.index;
  });
}

export function firstErrorMessage(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return undefined;

  const message = (value as { message?: unknown }).message;
  if (typeof message === "string") return message;

  for (const [key, nestedValue] of Object.entries(value)) {
    if (key === "ref") continue;
    const nestedMessage = firstErrorMessage(nestedValue);
    if (nestedMessage) return nestedMessage;
  }

  return undefined;
}

type ParticipantErrorOrder = {
  kind: "leader" | "student";
  index: number;
};

export function invalidSubmissionMessage(
  errors: unknown,
  participantOrder: ParticipantErrorOrder[] = []
) {
  let firstError: string | undefined;
  if (errors && typeof errors === "object" && participantOrder.length) {
    const {
      team_leaders: leaderErrors,
      contestants: studentErrors,
      ...nonParticipantErrors
    } = errors as Record<string, unknown>;
    firstError = firstErrorMessage(nonParticipantErrors);
    for (const participant of participantOrder) {
      if (firstError) break;
      const participantErrors = participant.kind === "leader"
        ? leaderErrors
        : studentErrors;
      if (Array.isArray(participantErrors)) {
        firstError = firstErrorMessage(participantErrors[participant.index]);
      }
    }
    firstError ??=
      firstErrorMessage(leaderErrors) ?? firstErrorMessage(studentErrors);
  } else {
    firstError = firstErrorMessage(errors);
  }
  return firstError
    ? `Please correct the highlighted fields before submitting. First issue: ${firstError}`
    : "Please correct the highlighted fields before submitting.";
}
