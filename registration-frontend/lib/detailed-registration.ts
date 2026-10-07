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

// Mirrors registration-backend/core/validators.py so a bad file is caught the
// moment it is chosen, with the same wording the server would use.
export const MAX_FILE_BYTES = 25 * 1024 * 1024;
export const IMAGE_TYPES = ["image/jpeg", "image/png"];
export const DOCUMENT_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const TYPE_NAMES: Record<string, string> = {
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "application/pdf": "PDF",
  "image/heic": "HEIC",
  "image/heif": "HEIF",
  "image/webp": "WebP",
  "image/gif": "GIF",
  "image/tiff": "TIFF",
  "image/bmp": "BMP",
  "image/avif": "AVIF",
  "application/msword": "Word",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Word",
};
const APPLE_PHOTO_TYPES = new Set(["image/heic", "image/heif"]);

function allowedPhrase(allowedTypes: string[]) {
  const names = allowedTypes.map((type) => TYPE_NAMES[type] ?? type);
  return names.length === 1
    ? names[0]
    : `${names.slice(0, -1).join(", ")} or ${names[names.length - 1]}`;
}

export function fileProblem(
  file: { type: string; size: number },
  allowedTypes: string[]
): string | undefined {
  if (file.size > MAX_FILE_BYTES) {
    return `This file is ${(file.size / (1024 * 1024)).toFixed(1)} MB. Files must not exceed ${
      MAX_FILE_BYTES / (1024 * 1024)
    } MB.`;
  }
  if (!allowedTypes.includes(file.type)) {
    const uploaded = TYPE_NAMES[file.type] ?? (file.type || "an unrecognised type");
    let message = `This file is ${uploaded}, which is not accepted. Please upload a ${allowedPhrase(
      allowedTypes
    )} file.`;
    if (APPLE_PHOTO_TYPES.has(file.type)) {
      message += " On iPhone or Mac, export or save the photo as JPEG first.";
    }
    return message;
  }
  return undefined;
}

const FIELD_LABELS: Record<string, string> = {
  country: "Country",
  number_of_teams: "Number of participating teams",
  official_delegation_name: "Official delegation name",
  position: "Delegation order",
  team_leaders: "Team leaders",
  contestants: "Students",
  full_name: "Full name",
  badge_name: "Badge name",
  date_of_birth: "Date of birth",
  gender: "Gender",
  passport_number: "Passport number",
  passport_expiry_date: "Passport expiry date",
  email: "Email",
  phone_number: "Phone number",
  role: "Leader role",
  competition_subject: "Competition subject",
  t_shirt_size: "T-shirt size",
  food_type: "Food type",
  dietary_requirements: "Dietary requirements",
  special_requirements: "Special requirements",
  passport_scan: "Passport scan",
  id_photo: "ID photo",
  consent_form: "Photography consent form",
  commitment_form: "Commitment form",
  parental_consent_form: "Parental consent form",
  confirm_information: "Confirmation",
  agree_rules: "Rules agreement",
};

const INDEXED_LABELS: Record<string, string> = {
  delegations: "Delegation",
  team_leaders: "Leader",
  contestants: "Student",
};

function describePath(path: (string | number)[]) {
  const parts: string[] = [];
  for (let i = 0; i < path.length; i += 1) {
    const token = path[i];
    const next = path[i + 1];
    if (typeof token === "string" && INDEXED_LABELS[token] && typeof next === "number") {
      // Same numbering as the form: "Delegation 1 · Leader 2".
      parts.push(`${INDEXED_LABELS[token]} ${next + 1}`);
      i += 1;
    } else if (typeof token === "number") {
      parts.push(`#${token + 1}`);
    } else {
      parts.push(FIELD_LABELS[token] ?? token.replace(/_/g, " "));
    }
  }
  return parts.join(" · ");
}

/**
 * Every reason the server gave for rejecting a submission, one line each,
 * labelled the way the form labels delegations, leaders and students.
 */
export function describeSubmissionErrors(value: unknown): string[] {
  const lines: string[] = [];
  const walk = (node: unknown, path: (string | number)[]) => {
    if (typeof node === "string") {
      const where = describePath(path);
      lines.push(where ? `${where}: ${node}` : node);
    } else if (Array.isArray(node)) {
      node.forEach((item, index) => {
        if (typeof item === "string") walk(item, path);
        else if (item && typeof item === "object" && Object.keys(item).length) {
          walk(item, [...path, index]);
        }
      });
    } else if (node && typeof node === "object") {
      for (const [key, nested] of Object.entries(node)) {
        walk(nested, key === "non_field_errors" || key === "detail" ? path : [...path, key]);
      }
    }
  };
  walk(value, []);
  return lines;
}
