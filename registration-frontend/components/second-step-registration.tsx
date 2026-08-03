"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { type FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowRight,
  Download,
  ShieldCheck,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { BrandLockup } from "@/components/brand-lockup";
import {
  firstErrorMessage,
  invalidSubmissionMessage,
  orderParticipantsByTeam,
} from "@/lib/detailed-registration";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const apiBaseUrl =
  (process.env.NEXT_PUBLIC_API_URL || "https://api-fipho.olympcenter.uz").replace(/\/+$/, "");

const leaderRoleOptions = [
  "Head of Delegation",
  "Team Leader",
  "Deputy Team Leader",
  "Observer",
  "Coordinator",
];

const requiredFormLinks = [
  {
    href: "/forms/student-commitment-form.pdf",
    label: "Student Commitment Form",
  },
  {
    href: "/forms/student-photography-form.pdf",
    label: "Student Photography, Audio and Video Consent Form",
  },
  {
    href: "/forms/team-leader-photography-form.pdf",
    label: "Team Leader Photography, Audio and Video Consent Form",
  },
];

const subjectOptions = ["Physics"];
const genderOptions = ["Female", "Male"];
const shirtSizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const foodTypeOptions = [
  "Standard",
  "Halal",
  "Vegetarian",
  "Vegan",
  "Kosher",
  "Gluten-Free",
  "Other",
];
const TEAM_LEADERS_PER_DELEGATION = 2;
const CONTESTANTS_PER_DELEGATION = 4;
const MAX_PARTICIPATING_TEAMS = 10;
const CONTESTANT_ELIGIBILITY_CUTOFF = "2006-05-01";
const CONTESTANT_MINIMUM_DATE = "2006-05-02";
const CONTESTANT_ELIGIBILITY_MESSAGE =
  "Contestants must be under 20 on May 1, 2026 and must not be enrolled in a university or another higher education institution.";

const requiredFileSchema = z
  .any()
  .refine(
    (value) => value instanceof FileList && value.length > 0,
    "This file is required."
  );

const leaderSchema = z.object({
  delegation_index: z.number().int().min(0).max(MAX_PARTICIPATING_TEAMS - 1),
  full_name: z.string().min(3, "Enter the leader's full name."),
  badge_name: z.string().min(2, "Enter the badge name."),
  date_of_birth: z.string().min(1, "Select the date of birth."),
  gender: z.string().min(1, "Select a gender."),
  passport_number: z.string().min(3, "Enter the passport number."),
  email: z.string().email("Enter a valid email address."),
  phone_number: z.string().min(7, "Enter a valid phone number."),
  role: z.string().min(1, "Select a leader role."),
  t_shirt_size: z.string().min(1, "Select a T-shirt size."),
  food_type: z.string().min(1, "Select a food type."),
  dietary_requirements: z.string().optional(),
  passport_scan: requiredFileSchema,
  id_photo: requiredFileSchema,
  consent_form: requiredFileSchema,
});

const contestantSchema = z
  .object({
    delegation_index: z.number().int().min(0).max(MAX_PARTICIPATING_TEAMS - 1),
    full_name: z.string().min(3, "Enter the contestant's full name."),
    badge_name: z.string().min(2, "Enter the badge name."),
    date_of_birth: z.string().min(1, "Select the date of birth."),
    gender: z.string().min(1, "Select a gender."),
    competition_subject: z.string().min(1, "Select a subject."),
    passport_number: z.string().min(3, "Enter the passport number."),
    passport_expiry_date: z.string().min(1, "Select the passport expiry date."),
    t_shirt_size: z.string().min(1, "Select a T-shirt size."),
    food_type: z.string().min(1, "Select a food type."),
    dietary_requirements: z.string().optional(),
    special_requirements: z.string().optional(),
    passport_scan: requiredFileSchema,
    id_photo: requiredFileSchema,
    commitment_form: requiredFileSchema,
    consent_form: requiredFileSchema,
  })
  .superRefine((value, ctx) => {
    if (value.date_of_birth && value.date_of_birth <= CONTESTANT_ELIGIBILITY_CUTOFF) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["date_of_birth"],
        message: CONTESTANT_ELIGIBILITY_MESSAGE,
      });
    }
  });

const delegationSchema = z.object({
  official_delegation_name: z
    .string()
    .min(3, "Enter the official delegation name."),
});

const formSchema = z
  .object({
    country: z.string().min(1, "Select a country."),
    number_of_teams: z
      .number()
      .int()
      .min(1)
      .max(MAX_PARTICIPATING_TEAMS),
    delegations: z
      .array(delegationSchema)
      .min(1)
      .max(MAX_PARTICIPATING_TEAMS),
    team_leaders: z.array(leaderSchema),
    contestants: z.array(contestantSchema),
    confirm_information: z.boolean().refine((value) => value, {
      message: "You must confirm that the information is accurate.",
    }),
    agree_rules: z.boolean().refine((value) => value, {
      message: "You must agree to the registration rules.",
    }),
  })
  .superRefine((values, ctx) => {
    if (values.delegations.length !== values.number_of_teams) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["number_of_teams"],
        message: "The team count must match the delegation groups.",
      });
    }
    values.delegations.forEach((_, delegationIndex) => {
      if (
        values.team_leaders.filter(
          (leader) => leader.delegation_index === delegationIndex
        ).length !== TEAM_LEADERS_PER_DELEGATION
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["team_leaders"],
          message: "Each delegation must have exactly 2 team leaders.",
        });
      }
      if (
        values.contestants.filter(
          (contestant) => contestant.delegation_index === delegationIndex
        ).length !== CONTESTANTS_PER_DELEGATION
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["contestants"],
          message: "Each delegation must have exactly 4 contestants.",
        });
      }
    });
  });

type SecondStepRegistrationFormValues = z.infer<typeof formSchema>;

type CountryOption = {
  id: number;
  name: string;
};

type SecondStepRegistrationProps = {
  displayClassName?: string;
  sansClassName?: string;
};

function emptyLeader(delegationIndex = 0) {
  return {
    delegation_index: delegationIndex,
    full_name: "",
    badge_name: "",
    date_of_birth: "",
    gender: "",
    passport_number: "",
    email: "",
    phone_number: "",
    role: "",
    t_shirt_size: "",
    food_type: "",
    dietary_requirements: "",
    passport_scan: undefined,
    id_photo: undefined,
    consent_form: undefined,
  };
}

function emptyContestant(delegationIndex = 0) {
  return {
    delegation_index: delegationIndex,
    full_name: "",
    badge_name: "",
    date_of_birth: "",
    gender: "",
    competition_subject: "Physics",
    passport_number: "",
    passport_expiry_date: "",
    t_shirt_size: "",
    food_type: "",
    dietary_requirements: "",
    special_requirements: "",
    passport_scan: undefined,
    id_photo: undefined,
    commitment_form: undefined,
    consent_form: undefined,
  };
}

function appendFileIfPresent(
  formData: FormData,
  key: string,
  fileList?: FileList | null
) {
  const file = fileList?.[0];
  if (file) {
    formData.append(key, file);
  }
}

async function downloadFormAsset(href: string) {
  const response = await fetch(href);
  if (!response.ok) {
    throw new Error(`Failed to download ${href}`);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const filename = href.split("/").pop() || "form.pdf";
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

function SectionTitle({
  eyebrow,
  title,
  description,
  displayClassName,
}: {
  eyebrow: string;
  title: string;
  description: string;
  displayClassName?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[#b7790a]">
        {eyebrow}
      </div>
      <div
        className={cn(
          "text-2xl text-[#0a4174] sm:text-3xl",
          displayClassName
        )}
      >
        {title}
      </div>
      <p className="max-w-2xl text-sm leading-6 text-[#52677a] sm:text-base">
        {description}
      </p>
    </div>
  );
}

function FileUploadField({
  id,
  label,
  accept,
  hint,
  onChange,
  error,
}: {
  id: string;
  label: string;
  accept: string;
  hint: string;
  onChange: (files: FileList | null) => void;
  error?: string;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer flex-col gap-2 rounded-2xl border border-dashed bg-[#f5f9fd] px-4 py-4 transition hover:bg-[#edf5fb]",
        error
          ? "border-red-400 bg-[#fff4f2] hover:border-red-500"
          : "border-[#afc9df] hover:border-[#0a4174]"
      )}
    >
      <span className="text-sm font-medium text-[#173a5b]">{label}</span>
      <span className="text-xs leading-5 text-[#60778b]">{hint}</span>
      <input
        id={id}
        type="file"
        accept={accept}
        className="text-sm text-[#52677a] file:mr-3 file:rounded-full file:border-0 file:bg-[#0a4174] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        onChange={(event) => onChange(event.target.files)}
      />
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
    </label>
  );
}

export default function SecondStepRegistration({
  displayClassName,
  sansClassName,
}: SecondStepRegistrationProps) {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const submissionErrorRef = useRef<HTMLDivElement>(null);

  const form = useForm<SecondStepRegistrationFormValues>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    defaultValues: {
      country: "",
      number_of_teams: 1,
      delegations: [{ official_delegation_name: "" }],
      team_leaders: Array.from(
        { length: TEAM_LEADERS_PER_DELEGATION },
        () => emptyLeader()
      ),
      contestants: Array.from(
        { length: CONTESTANTS_PER_DELEGATION },
        () => emptyContestant()
      ),
      confirm_information: false,
      agree_rules: false,
    },
  });

  const teamLeaderFields = useFieldArray({
    control: form.control,
    name: "team_leaders",
  });
  const contestantFields = useFieldArray({
    control: form.control,
    name: "contestants",
  });
  const delegationFields = useFieldArray({
    control: form.control,
    name: "delegations",
  });
  const groupedParticipantFields = orderParticipantsByTeam(
    teamLeaderFields.fields,
    contestantFields.fields
  );

  function showSubmissionError(message: string) {
    setSubmissionError(message);
    requestAnimationFrame(() => submissionErrorRef.current?.focus());
  }

  function setDelegationCount(nextCount: number) {
    const currentCount = delegationFields.fields.length;
    form.setValue("number_of_teams", nextCount, { shouldValidate: true });

    if (nextCount > currentCount) {
      for (let index = currentCount; index < nextCount; index += 1) {
        delegationFields.append(
          { official_delegation_name: "" },
          { shouldFocus: false }
        );
        for (let count = 0; count < TEAM_LEADERS_PER_DELEGATION; count += 1) {
          teamLeaderFields.append(emptyLeader(index), {
            shouldFocus: false,
          });
        }
        for (let count = 0; count < CONTESTANTS_PER_DELEGATION; count += 1) {
          contestantFields.append(emptyContestant(index), {
            shouldFocus: false,
          });
        }
      }
      return;
    }

    const leaderIndexes = form
      .getValues("team_leaders")
      .map((leader, index) => ({ leader, index }))
      .filter(({ leader }) => leader.delegation_index >= nextCount)
      .map(({ index }) => index);
    const contestantIndexes = form
      .getValues("contestants")
      .map((contestant, index) => ({ contestant, index }))
      .filter(({ contestant }) => contestant.delegation_index >= nextCount)
      .map(({ index }) => index);
    if (leaderIndexes.length) teamLeaderFields.remove(leaderIndexes);
    if (contestantIndexes.length) contestantFields.remove(contestantIndexes);
    delegationFields.remove(
      Array.from(
        { length: currentCount - nextCount },
        (_, offset) => currentCount - 1 - offset
      )
    );
  }

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/countries/`, {
          headers: {
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();
        const countryList = Array.isArray(data)
          ? data
          : data?.data || data?.results || [];
        setCountries(countryList);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load countries.");
        setCountries([]);
      } finally {
        setIsLoadingCountries(false);
      }
    }

    fetchCountries();
  }, []);

  function onInvalid(errors: FieldErrors<SecondStepRegistrationFormValues>) {
    showSubmissionError(invalidSubmissionMessage(errors));
  }

  async function onSubmit(values: SecondStepRegistrationFormValues) {
    setSubmissionError(null);
    const formData = new FormData();
    formData.append("country", values.country);
    formData.append("number_of_teams", String(values.number_of_teams));
    formData.append("confirm_information", "true");
    formData.append("agree_rules", "true");

    values.delegations.forEach((delegation, delegationIndex) => {
      const delegationPrefix = `delegations[${delegationIndex}]`;
      formData.append(
        `${delegationPrefix}[official_delegation_name]`,
        delegation.official_delegation_name.trim()
      );
      formData.append(`${delegationPrefix}[position]`, String(delegationIndex + 1));

      values.team_leaders
        .filter((leader) => leader.delegation_index === delegationIndex)
        .forEach((leader, index) => {
      const leaderPrefix = `${delegationPrefix}[team_leaders][${index}]`;
      formData.append(`${leaderPrefix}[full_name]`, leader.full_name);
      formData.append(`${leaderPrefix}[badge_name]`, leader.badge_name);
      formData.append(
        `${leaderPrefix}[date_of_birth]`,
        leader.date_of_birth
      );
      formData.append(`${leaderPrefix}[gender]`, leader.gender);
      formData.append(
        `${leaderPrefix}[passport_number]`,
        leader.passport_number
      );
      formData.append(`${leaderPrefix}[email]`, leader.email);
      formData.append(
        `${leaderPrefix}[phone_number]`,
        leader.phone_number
      );
      formData.append(`${leaderPrefix}[role]`, leader.role);
      formData.append(
        `${leaderPrefix}[t_shirt_size]`,
        leader.t_shirt_size
      );
      formData.append(`${leaderPrefix}[food_type]`, leader.food_type);
      formData.append(
        `${leaderPrefix}[dietary_requirements]`,
        leader.dietary_requirements || ""
      );
      appendFileIfPresent(
        formData,
        `${leaderPrefix}[passport_scan]`,
        leader.passport_scan
      );
      appendFileIfPresent(
        formData,
        `${leaderPrefix}[id_photo]`,
        leader.id_photo
      );
      appendFileIfPresent(
        formData,
        `${leaderPrefix}[consent_form]`,
        leader.consent_form
      );
    });

      values.contestants
        .filter((contestant) => contestant.delegation_index === delegationIndex)
        .forEach((contestant, index) => {
      const contestantPrefix = `${delegationPrefix}[contestants][${index}]`;
      formData.append(`${contestantPrefix}[full_name]`, contestant.full_name);
      formData.append(
        `${contestantPrefix}[badge_name]`,
        contestant.badge_name
      );
      formData.append(
        `${contestantPrefix}[date_of_birth]`,
        contestant.date_of_birth
      );
      formData.append(`${contestantPrefix}[gender]`, contestant.gender);
      formData.append(
        `${contestantPrefix}[competition_subject]`,
        contestant.competition_subject
      );
      formData.append(
        `${contestantPrefix}[passport_number]`,
        contestant.passport_number
      );
      formData.append(
        `${contestantPrefix}[passport_expiry_date]`,
        contestant.passport_expiry_date
      );
      formData.append(
        `${contestantPrefix}[t_shirt_size]`,
        contestant.t_shirt_size
      );
      formData.append(
        `${contestantPrefix}[food_type]`,
        contestant.food_type
      );
      formData.append(
        `${contestantPrefix}[dietary_requirements]`,
        contestant.dietary_requirements || ""
      );
      formData.append(
        `${contestantPrefix}[special_requirements]`,
        contestant.special_requirements || ""
      );
      appendFileIfPresent(
        formData,
        `${contestantPrefix}[passport_scan]`,
        contestant.passport_scan
      );
      appendFileIfPresent(
        formData,
        `${contestantPrefix}[id_photo]`,
        contestant.id_photo
      );
      appendFileIfPresent(
        formData,
        `${contestantPrefix}[commitment_form]`,
        contestant.commitment_form
      );
      appendFileIfPresent(
        formData,
        `${contestantPrefix}[consent_form]`,
        contestant.consent_form
      );
    });
    });

    try {
      const response = await fetch(`${apiBaseUrl}/api/detailed-registrations/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const detail = firstErrorMessage(errorData) ||
          "Failed to submit the Detailed Registration.";
        throw new Error(detail);
      }

      toast.success(
        "Detailed Registration submitted successfully. The organizing team can now review your delegation details."
      );
      form.reset({
        country: "",
        number_of_teams: 1,
        delegations: [{ official_delegation_name: "" }],
        team_leaders: Array.from(
          { length: TEAM_LEADERS_PER_DELEGATION },
          () => emptyLeader()
        ),
        contestants: Array.from(
          { length: CONTESTANTS_PER_DELEGATION },
          () => emptyContestant()
        ),
        confirm_information: false,
        agree_rules: false,
      });
    } catch (error) {
      console.error(error);
      const message = error instanceof Error
        ? error.message
        : "An unexpected error occurred while submitting.";
      showSubmissionError(message);
      toast.error(message);
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-[#f3f7fb] text-[#173a5b]",
        sansClassName
      )}
    >
      <Toaster position="top-right" />

      <div className="relative overflow-hidden bg-[#0a4174] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(224,181,85,0.17),transparent_24%),linear-gradient(180deg,#0a4174_0%,#08365f_100%)]" />
        <div className="absolute -right-36 -top-44 h-[34rem] w-[34rem] rounded-full border border-white/10" />
        <div className="absolute -right-20 -top-28 h-[25rem] w-[25rem] rounded-full border border-[#e0b555]/30" />
        <div className="absolute -bottom-48 -left-40 h-[32rem] w-[32rem] rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between border-b border-white/15 py-5">
            <BrandLockup
              priority
              className="rounded-xl border-white/15 bg-white px-3 py-2 shadow-none [&_img]:h-12"
            />
            <a
              href="https://fipho.uz"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-[#e0b555] hover:text-[#e0b555]"
            >
              Visit fipho.uz
            </a>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-14 sm:py-16 lg:py-20"
          >
            <div className="max-w-4xl space-y-7">
              <div className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#e0b555]">
                <ShieldCheck className="h-4 w-4" />
                Al-Ferghani International Physics Olympiad · 2026
              </div>

              <div className="space-y-4">
                <h1
                  className={cn(
                    "max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl",
                    displayClassName
                  )}
                >
                  Detailed Registration for{" "}
                  <span className="italic font-normal text-[#e0b555]">FIPHO</span>
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[#cbdbe5] sm:text-lg">
                  Complete the official delegation form with country details,
                  leaders, and contestant information in one submission.
                </p>
              </div>

              <a
                href="#registration-form"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0a4174] transition hover:bg-[#e0b555]"
              >
                Start registration
                <ArrowRight className="h-4 w-4" />
              </a>

              <div className="grid max-w-4xl gap-3 border-t border-white/15 pt-6 text-sm text-[#cbdbe5] sm:grid-cols-3">
                <div><span className="font-semibold text-white">5 sections</span><br />One guided submission</div>
                <div><span className="font-semibold text-white">5 students</span><br />Maximum team roster</div>
                <div><span className="font-semibold text-white">2 team leaders</span><br />Delegation officials</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <motion.form
          id="registration-form"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="space-y-8"
        >
          {submissionError ? (
            <div
              ref={submissionErrorRef}
              role="alert"
              tabIndex={-1}
              className="rounded-2xl border border-red-300 bg-red-50 px-5 py-4 text-sm leading-6 text-red-800 outline-none focus:ring-2 focus:ring-red-400"
            >
              <span className="font-semibold">Registration not submitted.</span>{" "}
              {submissionError}
            </div>
          ) : null}
          <Card className="overflow-hidden rounded-[2rem] border-[#d8e5f0] bg-white shadow-[0_24px_70px_rgba(10,65,116,0.10)]">
            <CardContent className="space-y-8 p-6 sm:p-8 lg:p-10">
              <SectionTitle
                eyebrow="Section 01"
                title="Delegation Overview"
                description="Start with the official delegation identity, country, and expected number of participating teams."
                displayClassName={displayClassName}
              />

              <div className="rounded-[1.5rem] border border-[#d8e5f0] bg-[#f2f7fb] p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b7790a]">
                  Required Forms
                </div>
                <p className="mt-3 text-sm leading-6 text-[#52677a]">
                  Download, complete, and sign the supporting forms before you
                  upload them for leaders and contestants below.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {requiredFormLinks.map((formLink) => (
                    <button
                      key={formLink.href}
                      type="button"
                      onClick={async () => {
                        try {
                          await downloadFormAsset(formLink.href);
                        } catch (error) {
                          console.error(error);
                          toast.error("Failed to download the form.");
                        }
                      }}
                      className="relative z-10 flex min-h-[104px] items-center gap-3 rounded-2xl border border-[#afc9df] bg-white px-4 py-4 text-left text-sm font-medium text-[#0a4174] transition hover:border-[#e0b555] hover:bg-[#fff9e8]"
                    >
                      <span className="rounded-full bg-[#e0b555]/20 p-2 text-[#9a6508]">
                        <Download className="h-4 w-4" />
                      </span>
                      <span>Download {formLink.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm text-[#173a5b]">
                    Country
                  </Label>
                  <Select
                    value={form.watch("country")}
                    onValueChange={(value) =>
                      form.setValue("country", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger
                      id="country"
                      className="h-12 rounded-xl border-[#b9cee0] bg-[#f7fbff]"
                    >
                      <SelectValue
                        placeholder={
                          isLoadingCountries
                            ? "Loading countries..."
                            : "Select a country"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem
                          key={country.id}
                          value={String(country.id)}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.country ? (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.country.message}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number-of-teams">
                    How many teams will participate from your country?
                  </Label>
                  <Select
                    value={String(form.watch("number_of_teams"))}
                    onValueChange={(value) =>
                      setDelegationCount(Number(value))
                    }
                  >
                    <SelectTrigger
                      id="number-of-teams"
                      className="h-12 rounded-xl border-[#b9cee0] bg-[#f7fbff]"
                    >
                      <SelectValue placeholder="Select the number of teams" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: MAX_PARTICIPATING_TEAMS },
                        (_, index) => index + 1
                      ).map((count) => (
                        <SelectItem key={count} value={String(count)}>
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs leading-5 text-[#60778b]">
                    Select the total number of teams expected from your country,
                    up to 10.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[2rem] border-[#d8e5f0] bg-white shadow-[0_24px_70px_rgba(10,65,116,0.10)]">
            <CardContent className="space-y-8 p-6 sm:p-8 lg:p-10">
              <SectionTitle
                eyebrow="Section 02"
                title="Delegation Groups"
                description="Name each delegation. Two leader and four student fields are provided automatically."
                displayClassName={displayClassName}
              />

              <div className="space-y-5">
                {delegationFields.fields.map((delegationField, delegationIndex) => {
                  return (
                    <div
                      key={delegationField.id}
                      className="rounded-[1.75rem] border border-[#d8e5f0] bg-[#f2f7fb] p-5 sm:p-6"
                    >
                      <div className="mb-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b7790a]">
                          Delegation {delegationIndex + 1}
                        </div>
                        <div className="mt-1 text-lg font-semibold text-[#0a4174]">
                          Team setup
                        </div>
                      </div>

                      <div className="grid gap-5 lg:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor={`delegation-name-${delegationIndex}`}>
                            Delegation name
                          </Label>
                          <Input
                            id={`delegation-name-${delegationIndex}`}
                            className="h-12 rounded-xl border-[#b9cee0] bg-white"
                            placeholder={`Example: Team ${delegationIndex + 1}`}
                            {...form.register(
                              `delegations.${delegationIndex}.official_delegation_name`
                            )}
                          />
                          {form.formState.errors.delegations?.[delegationIndex]
                            ?.official_delegation_name ? (
                            <p className="text-sm text-red-600">
                              {
                                form.formState.errors.delegations[delegationIndex]
                                  ?.official_delegation_name?.message
                              }
                            </p>
                          ) : null}
                        </div>

                        <div className="space-y-2">
                          <Label>Team leaders</Label>
                          <p className="text-sm text-[#52677a]">
                            2 required per delegation.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>Students</Label>
                          <p className="text-sm text-[#52677a]">
                            4 required per delegation.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-10">
            {delegationFields.fields.map((delegationField, delegationIndex) => (
              <section
                key={delegationField.id}
                aria-labelledby={`delegation-participants-${delegationIndex}`}
                className="space-y-6 rounded-[2.25rem] border-2 border-[#c6dceb] bg-[#eef6fc] p-3 sm:p-4"
              >
                <div className="px-3 pt-3 sm:px-5 sm:pt-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b7790a]">
                    Sections 03-04 · Delegation {delegationIndex + 1}
                  </div>
                  <h2
                    id={`delegation-participants-${delegationIndex}`}
                    className={cn(
                      displayClassName,
                      "mt-2 text-3xl font-semibold text-[#0a4174] sm:text-4xl"
                    )}
                  >
                    Delegation {delegationIndex + 1} participants
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#52677a]">
                    Complete this delegation in order: leaders first, then
                    students.
                  </p>
                </div>

          <Card className="overflow-hidden rounded-[2rem] border-[#d8e5f0] bg-white shadow-[0_24px_70px_rgba(10,65,116,0.10)]">
            <CardContent className="space-y-8 p-6 sm:p-8 lg:p-10">
              <SectionTitle
                eyebrow="Leaders first"
                title="Team Leaders and Officials"
                description="Complete the team leader profiles created for each delegation group."
                displayClassName={displayClassName}
              />

              <div className="space-y-6">
                {groupedParticipantFields
                  .filter(
                    ({ kind, field }) =>
                      kind === "leader" &&
                      field.delegation_index === delegationIndex
                  )
                  .map(({ field, index }) => (
                  <div
                    key={field.id}
                    className="rounded-[1.75rem] border border-[#d8e5f0] bg-[#f7fbff] p-5 sm:p-6"
                  >
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b7790a]">
                          Delegation {field.delegation_index + 1} · Leader{" "}
                          {
                            teamLeaderFields.fields
                              .slice(0, index + 1)
                              .filter(
                                (leader) =>
                                  leader.delegation_index ===
                                  field.delegation_index
                              ).length
                          }
                        </div>
                        <div className="mt-1 text-lg font-semibold text-[#0a4174]">
                          Delegation profile
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Full name</Label>
                        <Input
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          {...form.register(`team_leaders.${index}.full_name`)}
                        />
                        {form.formState.errors.team_leaders?.[index]?.full_name ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.team_leaders[index]
                                ?.full_name?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Name for badge</Label>
                        <Input
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          {...form.register(`team_leaders.${index}.badge_name`)}
                        />
                        {form.formState.errors.team_leaders?.[index]?.badge_name ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.team_leaders[index]
                                ?.badge_name?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Date of birth</Label>
                        <Input
                          type="date"
                          max="2026-05-01"
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          {...form.register(`team_leaders.${index}.date_of_birth`)}
                        />
                        {form.formState.errors.team_leaders?.[index]
                          ?.date_of_birth ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.team_leaders[index]
                                ?.date_of_birth?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select
                          value={form.watch(`team_leaders.${index}.gender`)}
                          onValueChange={(value) =>
                            form.setValue(`team_leaders.${index}.gender`, value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <SelectTrigger className="h-12 rounded-xl border-[#b9cee0] bg-white">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {genderOptions.map((gender) => (
                              <SelectItem key={gender} value={gender}>
                                {gender}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.team_leaders?.[index]?.gender ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.team_leaders[index]?.gender
                                ?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Passport number</Label>
                        <Input
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          {...form.register(
                            `team_leaders.${index}.passport_number`
                          )}
                        />
                        {form.formState.errors.team_leaders?.[index]
                          ?.passport_number ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.team_leaders[index]
                                ?.passport_number?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          {...form.register(`team_leaders.${index}.email`)}
                        />
                        {form.formState.errors.team_leaders?.[index]?.email ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.team_leaders[index]?.email
                                ?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Phone number</Label>
                        <Input
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          placeholder="+998 ..."
                          {...form.register(`team_leaders.${index}.phone_number`)}
                        />
                        {form.formState.errors.team_leaders?.[index]
                          ?.phone_number ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.team_leaders[index]
                                ?.phone_number?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                          value={form.watch(`team_leaders.${index}.role`)}
                          onValueChange={(value) =>
                            form.setValue(`team_leaders.${index}.role`, value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <SelectTrigger className="h-12 rounded-xl border-[#b9cee0] bg-white">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {leaderRoleOptions.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.team_leaders?.[index]?.role ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.team_leaders[index]?.role
                                ?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>T-shirt size</Label>
                        <Select
                          value={form.watch(`team_leaders.${index}.t_shirt_size`)}
                          onValueChange={(value) =>
                            form.setValue(
                              `team_leaders.${index}.t_shirt_size`,
                              value,
                              { shouldValidate: true }
                            )
                          }
                        >
                          <SelectTrigger className="h-12 rounded-xl border-[#b9cee0] bg-white">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {shirtSizeOptions.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.team_leaders?.[index]
                          ?.t_shirt_size ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.team_leaders[index]
                                ?.t_shirt_size?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Food type</Label>
                        <Select
                          value={form.watch(`team_leaders.${index}.food_type`)}
                          onValueChange={(value) =>
                            form.setValue(`team_leaders.${index}.food_type`, value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <SelectTrigger className="h-12 rounded-xl border-[#b9cee0] bg-white">
                            <SelectValue placeholder="Select food type" />
                          </SelectTrigger>
                          <SelectContent>
                            {foodTypeOptions.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.team_leaders?.[index]?.food_type ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.team_leaders[index]
                                ?.food_type?.message
                            }
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-5 space-y-2">
                      <Label>Dietary requirements</Label>
                      <Textarea
                        className="min-h-[110px] rounded-2xl border-[#b9cee0] bg-white"
                        placeholder="Allergies, dietary restrictions, or other meal notes."
                        {...form.register(
                          `team_leaders.${index}.dietary_requirements`
                        )}
                      />
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      <FileUploadField
                        id={`leader-passport-${index}`}
                        label="Passport scan"
                        accept=".pdf,.jpg,.jpeg,.png"
                        hint="Required. PDF, JPG, or PNG."
                        onChange={(files) =>
                          form.setValue(
                            `team_leaders.${index}.passport_scan`,
                            files,
                            { shouldValidate: true }
                          )
                        }
                        error={
                          typeof form.formState.errors.team_leaders?.[index]?.passport_scan
                            ?.message === "string"
                            ? form.formState.errors.team_leaders[index]?.passport_scan
                                ?.message
                            : undefined
                        }
                      />
                      <FileUploadField
                        id={`leader-photo-${index}`}
                        label="ID photo"
                        accept=".jpg,.jpeg,.png"
                        hint="Required. Portrait-style image."
                        onChange={(files) =>
                          form.setValue(`team_leaders.${index}.id_photo`, files, {
                            shouldValidate: true,
                          })
                        }
                        error={
                          typeof form.formState.errors.team_leaders?.[index]?.id_photo
                            ?.message === "string"
                            ? form.formState.errors.team_leaders[index]?.id_photo
                                ?.message
                            : undefined
                        }
                      />
                      <FileUploadField
                        id={`leader-consent-${index}`}
                        label="Photography consent form"
                        accept=".pdf,.jpg,.jpeg,.png"
                        hint="Signed team-leader photography, audio and video consent form."
                        onChange={(files) =>
                          form.setValue(
                            `team_leaders.${index}.consent_form`,
                            files,
                            { shouldValidate: true }
                          )
                        }
                        error={
                          typeof form.formState.errors.team_leaders?.[index]?.consent_form
                            ?.message === "string"
                            ? form.formState.errors.team_leaders[index]?.consent_form
                                ?.message
                            : undefined
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              {typeof form.formState.errors.team_leaders?.message === "string" ? (
                <p className="text-sm text-red-600">
                  {form.formState.errors.team_leaders.message}
                </p>
              ) : null}
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[2rem] border-[#d8e5f0] bg-white shadow-[0_24px_70px_rgba(10,65,116,0.10)]">
            <CardContent className="space-y-8 p-6 sm:p-8 lg:p-10">
              <SectionTitle
                eyebrow="Students next"
                title="Student Rosters"
                description="Complete the student profiles created for each delegation group."
                displayClassName={displayClassName}
              />

              <div className="space-y-6">
                {groupedParticipantFields
                  .filter(
                    ({ kind, field }) =>
                      kind === "student" &&
                      field.delegation_index === delegationIndex
                  )
                  .map(({ field, index }) => (
                  <div
                    key={field.id}
                    className="rounded-[1.75rem] border border-[#d8e5f0] bg-[#f7fbff] p-5 sm:p-6"
                  >
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b7790a]">
                          Delegation {field.delegation_index + 1} · Student{" "}
                          {
                            contestantFields.fields
                              .slice(0, index + 1)
                              .filter(
                                (contestant) =>
                                  contestant.delegation_index ===
                                  field.delegation_index
                              ).length
                          }
                        </div>
                        <div className="mt-1 text-lg font-semibold text-[#0a4174]">
                          Participant profile
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      <div className="space-y-2 xl:col-span-1">
                        <Label>Full name</Label>
                        <Input
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          {...form.register(`contestants.${index}.full_name`)}
                        />
                        {form.formState.errors.contestants?.[index]?.full_name ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.contestants[index]
                                ?.full_name?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Name for badge</Label>
                        <Input
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          {...form.register(`contestants.${index}.badge_name`)}
                        />
                        {form.formState.errors.contestants?.[index]?.badge_name ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.contestants[index]
                                ?.badge_name?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Date of birth</Label>
                        <Input
                          type="date"
                          min={CONTESTANT_MINIMUM_DATE}
                          max="2026-05-01"
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          {...form.register(
                            `contestants.${index}.date_of_birth`
                          )}
                        />
                        {form.formState.errors.contestants?.[index]
                          ?.date_of_birth ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.contestants[index]
                                ?.date_of_birth?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select
                          value={form.watch(`contestants.${index}.gender`)}
                          onValueChange={(value) =>
                            form.setValue(
                              `contestants.${index}.gender`,
                              value,
                              { shouldValidate: true }
                            )
                          }
                        >
                          <SelectTrigger className="h-12 rounded-xl border-[#b9cee0] bg-white">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {genderOptions.map((gender) => (
                              <SelectItem key={gender} value={gender}>
                                {gender}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.contestants?.[index]?.gender ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.contestants[index]?.gender
                                ?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Competition subject</Label>
                        <Select
                          value={form.watch(
                            `contestants.${index}.competition_subject`
                          )}
                          onValueChange={(value) =>
                            form.setValue(
                              `contestants.${index}.competition_subject`,
                              value,
                              { shouldValidate: true }
                            )
                          }
                        >
                          <SelectTrigger className="h-12 rounded-xl border-[#b9cee0] bg-white">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjectOptions.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.contestants?.[index]
                          ?.competition_subject ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.contestants[index]
                                ?.competition_subject?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Passport number</Label>
                        <Input
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          {...form.register(
                            `contestants.${index}.passport_number`
                          )}
                        />
                        {form.formState.errors.contestants?.[index]
                          ?.passport_number ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.contestants[index]
                                ?.passport_number?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Passport expiry date</Label>
                        <Input
                          type="date"
                          className="h-12 rounded-xl border-[#b9cee0] bg-white"
                          {...form.register(
                            `contestants.${index}.passport_expiry_date`
                          )}
                        />
                        {form.formState.errors.contestants?.[index]
                          ?.passport_expiry_date ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.contestants[index]
                                ?.passport_expiry_date?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>T-shirt size</Label>
                        <Select
                          value={form.watch(`contestants.${index}.t_shirt_size`)}
                          onValueChange={(value) =>
                            form.setValue(
                              `contestants.${index}.t_shirt_size`,
                              value,
                              { shouldValidate: true }
                            )
                          }
                        >
                          <SelectTrigger className="h-12 rounded-xl border-[#b9cee0] bg-white">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {shirtSizeOptions.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.contestants?.[index]
                          ?.t_shirt_size ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.contestants[index]
                                ?.t_shirt_size?.message
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Food type</Label>
                        <Select
                          value={form.watch(`contestants.${index}.food_type`)}
                          onValueChange={(value) =>
                            form.setValue(`contestants.${index}.food_type`, value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <SelectTrigger className="h-12 rounded-xl border-[#b9cee0] bg-white">
                            <SelectValue placeholder="Select food type" />
                          </SelectTrigger>
                          <SelectContent>
                            {foodTypeOptions.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.contestants?.[index]?.food_type ? (
                          <p className="text-sm text-red-600">
                            {
                              form.formState.errors.contestants[index]
                                ?.food_type?.message
                            }
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-5 space-y-2">
                      <Label>Dietary requirements</Label>
                      <Textarea
                        className="min-h-[110px] rounded-2xl border-[#b9cee0] bg-white"
                        placeholder="Allergies, dietary restrictions, or food notes."
                        {...form.register(
                          `contestants.${index}.dietary_requirements`
                        )}
                      />
                    </div>

                    <div className="mt-5 space-y-2">
                      <Label>Additional requirements</Label>
                      <Textarea
                        className="min-h-[110px] rounded-2xl border-[#b9cee0] bg-white"
                        placeholder="Dietary needs, medical notes, accessibility support, or travel-related remarks."
                        {...form.register(
                          `contestants.${index}.special_requirements`
                        )}
                      />
                    </div>

                    <p className="mt-4 text-sm text-[#60778b]">
                      Contestants must be under 20 on May 1, 2026 and must not
                      be enrolled in a university or another higher education
                      institution.
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <FileUploadField
                        id={`contestant-passport-${index}`}
                        label="Passport scan"
                        accept=".pdf,.jpg,.jpeg,.png"
                        hint="Required. PDF, JPG, or PNG."
                        onChange={(files) =>
                          form.setValue(
                            `contestants.${index}.passport_scan`,
                            files,
                            { shouldValidate: true }
                          )
                        }
                        error={
                          typeof form.formState.errors.contestants?.[index]?.passport_scan
                            ?.message === "string"
                            ? form.formState.errors.contestants[index]?.passport_scan
                                ?.message
                            : undefined
                        }
                      />
                      <FileUploadField
                        id={`contestant-photo-${index}`}
                        label="ID photo"
                        accept=".jpg,.jpeg,.png"
                        hint="Required. Passport-photo format recommended."
                        onChange={(files) =>
                          form.setValue(
                            `contestants.${index}.id_photo`,
                            files,
                            { shouldValidate: true }
                          )
                        }
                        error={
                          typeof form.formState.errors.contestants?.[index]?.id_photo
                            ?.message === "string"
                            ? form.formState.errors.contestants[index]?.id_photo
                                ?.message
                            : undefined
                        }
                      />
                      <FileUploadField
                        id={`contestant-commitment-${index}`}
                        label="Commitment form"
                        accept=".pdf,.jpg,.jpeg,.png"
                        hint="Signed student commitment form."
                        onChange={(files) =>
                          form.setValue(
                            `contestants.${index}.commitment_form`,
                            files,
                            { shouldValidate: true }
                          )
                        }
                        error={
                          typeof form.formState.errors.contestants?.[index]
                            ?.commitment_form?.message === "string"
                            ? form.formState.errors.contestants[index]
                                ?.commitment_form?.message
                            : undefined
                        }
                      />
                      <FileUploadField
                        id={`contestant-consent-${index}`}
                        label="Photography consent form"
                        accept=".pdf,.jpg,.jpeg,.png"
                        hint="Signed student photography, audio and video consent form."
                        onChange={(files) =>
                          form.setValue(
                            `contestants.${index}.consent_form`,
                            files,
                            { shouldValidate: true }
                          )
                        }
                        error={
                          typeof form.formState.errors.contestants?.[index]?.consent_form
                            ?.message === "string"
                            ? form.formState.errors.contestants[index]?.consent_form
                                ?.message
                            : undefined
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              {typeof form.formState.errors.contestants?.message === "string" ? (
                <p className="text-sm text-red-600">
                  {form.formState.errors.contestants.message}
                </p>
              ) : null}
            </CardContent>
          </Card>
              </section>
            ))}
          </div>

          <Card className="overflow-hidden rounded-[2rem] border-[#d8e5f0] bg-white shadow-[0_24px_70px_rgba(10,65,116,0.10)]">
            <CardContent className="space-y-8 p-6 sm:p-8 lg:p-10">
              <SectionTitle
                eyebrow="Section 05"
                title="Final Confirmation"
                description="Complete the submission by confirming that the delegation data is accurate and aligned with the competition rules."
                displayClassName={displayClassName}
              />

              <div className="grid gap-4">
                <label className="flex items-start gap-4 rounded-[1.5rem] border border-[#d8e5f0] bg-[#f2f7fb] p-5">
                  <Checkbox
                    checked={form.watch("confirm_information")}
                    onCheckedChange={(checked) =>
                      form.setValue("confirm_information", checked === true, {
                        shouldValidate: true,
                      })
                    }
                    className="mt-1 border-[#0a4174]"
                  />
                  <span className="space-y-1">
                    <span className="block font-medium text-[#0a4174]">
                      I confirm that the submitted information is complete and
                      accurate.
                    </span>
                    <span className="block text-sm leading-6 text-[#52677a]">
                      The organizing team may rely on this data for verification,
                      documentation, and operational planning.
                    </span>
                  </span>
                </label>
                {form.formState.errors.confirm_information ? (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.confirm_information.message}
                  </p>
                ) : null}

                <label className="flex items-start gap-4 rounded-[1.5rem] border border-[#d8e5f0] bg-[#f2f7fb] p-5">
                  <Checkbox
                    checked={form.watch("agree_rules")}
                    onCheckedChange={(checked) =>
                      form.setValue("agree_rules", checked === true, {
                        shouldValidate: true,
                      })
                    }
                    className="mt-1 border-[#0a4174]"
                  />
                  <span className="space-y-1">
                    <span className="block font-medium text-[#0a4174]">
                      I agree to the registration rules and submission policy.
                    </span>
                    <span className="block text-sm leading-6 text-[#52677a]">
                      This acknowledges the official rules for Detailed
                      Registration and roster submission.
                    </span>
                  </span>
                </label>
                {form.formState.errors.agree_rules ? (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.agree_rules.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-4 border-t border-[#d8e5f0] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-sm leading-6 text-[#52677a]">
                  Your submission will be sent securely to the FIPHO organizing
                  team for review.
                </p>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="h-12 rounded-full bg-[#0a4174] px-7 text-white hover:bg-[#13538f]"
                >
                  {form.formState.isSubmitting
                    ? "Submitting..."
                    : "Submit Detailed Registration"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.form>
      </div>
    </div>
  );
}
