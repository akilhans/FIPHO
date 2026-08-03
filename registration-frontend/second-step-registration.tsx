"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowRight,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { BrandLockup } from "@/components/brand-lockup";
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
  process.env.NEXT_PUBLIC_API_URL || "https://api.olympcenter.uz/";

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
    label: "Student Photography Form",
  },
  {
    href: "/forms/team-leader-photography-form.pdf",
    label: "Team Leader Photography Form",
  },
  {
    href: "/forms/team-leader-consent-form.pdf",
    label: "Team Leader Consent Form",
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
const MAX_TEAM_LEADERS = 2;
const MAX_CONTESTANTS = 5;
const CONTESTANT_ELIGIBILITY_CUTOFF = "2010-05-01";
const CONTESTANT_ELIGIBILITY_MESSAGE =
  "Contestants must be under 16 on May 1, 2026. You are not eligible.";

const requiredFileSchema = z
  .any()
  .refine(
    (value) => value instanceof FileList && value.length > 0,
    "This file is required."
  );

const leaderSchema = z.object({
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

const formSchema = z.object({
  country: z.string().min(1, "Select a country."),
  official_delegation_name: z
    .string()
    .min(3, "Enter the official delegation name."),
  team_leaders: z.array(leaderSchema).min(1, "Add at least one team leader."),
  contestants: z.array(contestantSchema).min(1, "Add at least one contestant."),
  confirm_information: z.boolean().refine((value) => value, {
    message: "You must confirm that the information is accurate.",
  }),
  agree_rules: z.boolean().refine((value) => value, {
    message: "You must agree to the registration rules.",
  }),
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

function emptyLeader() {
  return {
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

function emptyContestant() {
  return {
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

function syncFieldCount<T>(
  currentCount: number,
  nextCount: number,
  append: (value: T) => void,
  remove: (index: number | number[]) => void,
  createValue: () => T
) {
  if (nextCount > currentCount) {
    for (let index = currentCount; index < nextCount; index += 1) {
      append(createValue());
    }
    return;
  }

  if (nextCount < currentCount) {
    remove(Array.from({ length: currentCount - nextCount }, (_, offset) => currentCount - 1 - offset));
  }
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
      <div className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8a6b33]">
        {eyebrow}
      </div>
      <div
        className={cn(
          "text-2xl text-[#1e2a39] sm:text-3xl",
          displayClassName
        )}
      >
        {title}
      </div>
      <p className="max-w-2xl text-sm leading-6 text-[#5f6774] sm:text-base">
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
        "flex cursor-pointer flex-col gap-2 rounded-2xl border border-dashed bg-[#fcf8ef] px-4 py-4 transition hover:bg-[#faf3e2]",
        error
          ? "border-red-400 bg-[#fff4f2] hover:border-red-500"
          : "border-[#d6c8ac] hover:border-[#be9b52]"
      )}
    >
      <span className="text-sm font-medium text-[#253244]">{label}</span>
      <span className="text-xs leading-5 text-[#766a55]">{hint}</span>
      <input
        id={id}
        type="file"
        accept={accept}
        className="text-sm text-[#4e5765] file:mr-3 file:rounded-full file:border-0 file:bg-[#1e2a39] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
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

  const form = useForm<SecondStepRegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      official_delegation_name: "",
      team_leaders: [emptyLeader()],
      contestants: [emptyContestant()],
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

  const canAddLeader = teamLeaderFields.fields.length < MAX_TEAM_LEADERS;
  const canAddContestant = contestantFields.fields.length < MAX_CONTESTANTS;

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(`${apiBaseUrl}api/countries/`, {
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

  async function onSubmit(values: SecondStepRegistrationFormValues) {
    const formData = new FormData();
    formData.append("country", values.country);
    formData.append(
      "official_delegation_name",
      values.official_delegation_name.trim()
    );
    formData.append("confirm_information", "true");
    formData.append("agree_rules", "true");

    values.team_leaders.forEach((leader, index) => {
      formData.append(`team_leaders[${index}][full_name]`, leader.full_name);
      formData.append(`team_leaders[${index}][badge_name]`, leader.badge_name);
      formData.append(
        `team_leaders[${index}][date_of_birth]`,
        leader.date_of_birth
      );
      formData.append(`team_leaders[${index}][gender]`, leader.gender);
      formData.append(
        `team_leaders[${index}][passport_number]`,
        leader.passport_number
      );
      formData.append(`team_leaders[${index}][email]`, leader.email);
      formData.append(
        `team_leaders[${index}][phone_number]`,
        leader.phone_number
      );
      formData.append(`team_leaders[${index}][role]`, leader.role);
      formData.append(
        `team_leaders[${index}][t_shirt_size]`,
        leader.t_shirt_size
      );
      formData.append(`team_leaders[${index}][food_type]`, leader.food_type);
      formData.append(
        `team_leaders[${index}][dietary_requirements]`,
        leader.dietary_requirements || ""
      );
      appendFileIfPresent(
        formData,
        `team_leaders[${index}][passport_scan]`,
        leader.passport_scan
      );
      appendFileIfPresent(
        formData,
        `team_leaders[${index}][id_photo]`,
        leader.id_photo
      );
      appendFileIfPresent(
        formData,
        `team_leaders[${index}][consent_form]`,
        leader.consent_form
      );
    });

    values.contestants.forEach((contestant, index) => {
      formData.append(`contestants[${index}][full_name]`, contestant.full_name);
      formData.append(
        `contestants[${index}][badge_name]`,
        contestant.badge_name
      );
      formData.append(
        `contestants[${index}][date_of_birth]`,
        contestant.date_of_birth
      );
      formData.append(`contestants[${index}][gender]`, contestant.gender);
      formData.append(
        `contestants[${index}][competition_subject]`,
        contestant.competition_subject
      );
      formData.append(
        `contestants[${index}][passport_number]`,
        contestant.passport_number
      );
      formData.append(
        `contestants[${index}][passport_expiry_date]`,
        contestant.passport_expiry_date
      );
      formData.append(
        `contestants[${index}][t_shirt_size]`,
        contestant.t_shirt_size
      );
      formData.append(
        `contestants[${index}][food_type]`,
        contestant.food_type
      );
      formData.append(
        `contestants[${index}][dietary_requirements]`,
        contestant.dietary_requirements || ""
      );
      formData.append(
        `contestants[${index}][special_requirements]`,
        contestant.special_requirements || ""
      );
      appendFileIfPresent(
        formData,
        `contestants[${index}][passport_scan]`,
        contestant.passport_scan
      );
      appendFileIfPresent(
        formData,
        `contestants[${index}][id_photo]`,
        contestant.id_photo
      );
      appendFileIfPresent(
        formData,
        `contestants[${index}][commitment_form]`,
        contestant.commitment_form
      );
      appendFileIfPresent(
        formData,
        `contestants[${index}][consent_form]`,
        contestant.consent_form
      );
    });

    try {
      const response = await fetch(`${apiBaseUrl}api/detailed-registrations/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const detail =
          typeof errorData?.detail === "string"
            ? errorData.detail
            : "Failed to submit the second-step registration.";
        throw new Error(detail);
      }

      toast.success(
        "Second-step registration submitted successfully. The organizing team can now review your delegation details."
      );
      form.reset({
        country: "",
        official_delegation_name: "",
        team_leaders: [emptyLeader()],
        contestants: [emptyContestant()],
        confirm_information: false,
        agree_rules: false,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while submitting."
      );
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-[#f6efe2] text-[#1e2a39]",
        sansClassName
      )}
    >
      <Toaster position="top-right" />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(198,154,77,0.28),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(34,67,104,0.18),_transparent_28%)]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#17304b]/10 blur-3xl" />
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-[#c49b4b]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-6 flex justify-center sm:mb-8">
            <BrandLockup priority />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/72 p-8 shadow-[0_28px_80px_rgba(31,43,58,0.14)] backdrop-blur sm:p-10 lg:p-12">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dbcba9] bg-[#fff9ec] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6b33]">
                <ShieldCheck className="h-4 w-4" />
                Official Delegation Portal
              </div>

              <div className="space-y-4">
                <h1
                  className={cn(
                    "max-w-3xl text-4xl leading-tight text-[#152233] sm:text-5xl lg:text-6xl",
                    displayClassName
                  )}
                >
                  Second-step registration for FIPHO.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[#5b6470] sm:text-lg">
                  Complete the official delegation form with country details,
                  leaders, and contestant information in one submission.
                </p>
              </div>

              <a
                href="#registration-form"
                className="inline-flex items-center gap-2 rounded-full bg-[#1d2b3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#27384c]"
              >
                Start registration
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <motion.form
          id="registration-form"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <Card className="overflow-hidden rounded-[2rem] border-[#eadfc6] bg-white shadow-[0_24px_70px_rgba(31,43,58,0.1)]">
            <CardContent className="space-y-8 p-6 sm:p-8 lg:p-10">
              <SectionTitle
                eyebrow="Section 01"
                title="Delegation Overview"
                description="Start with the official delegation identity and the country that will own this second-step submission."
                displayClassName={displayClassName}
              />

              <div className="rounded-[1.5rem] border border-[#eadfc6] bg-[#fcf7ed] p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6b33]">
                  Required Forms
                </div>
                <p className="mt-3 text-sm leading-6 text-[#5f6774]">
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
                      className="relative z-10 flex min-h-[104px] items-center rounded-2xl border border-[#dbcba9] bg-white px-4 py-4 text-left text-sm font-medium text-[#1e2a39] transition hover:border-[#be9b52] hover:bg-[#fff8ea]"
                    >
                      <span>Download {formLink.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm text-[#253244]">
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
                      className="h-12 rounded-xl border-[#d9ccb0] bg-[#fbf7ef]"
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
                  <Label
                    htmlFor="delegation-name"
                    className="text-sm text-[#253244]"
                  >
                    Official delegation name
                  </Label>
                  <Input
                    id="delegation-name"
                    className="h-12 rounded-xl border-[#d9ccb0] bg-[#fbf7ef]"
                    placeholder="Example: Republic of Uzbekistan Delegation"
                    {...form.register("official_delegation_name")}
                  />
                  {form.formState.errors.official_delegation_name ? (
                    <p className="text-sm text-red-600">
                      {
                        form.formState.errors.official_delegation_name.message
                      }
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Number of team leaders</Label>
                  <Select
                    value={String(teamLeaderFields.fields.length)}
                    onValueChange={(value) =>
                      syncFieldCount(
                        teamLeaderFields.fields.length,
                        Number(value),
                        teamLeaderFields.append,
                        teamLeaderFields.remove,
                        emptyLeader
                      )
                    }
                  >
                    <SelectTrigger className="h-12 rounded-xl border-[#d9ccb0] bg-[#fbf7ef]">
                      <SelectValue placeholder="Select leader count" />
                    </SelectTrigger>
                      <SelectContent>
                      {Array.from(
                        { length: MAX_TEAM_LEADERS },
                        (_, index) => index + 1
                      ).map((count) => (
                        <SelectItem key={count} value={String(count)}>
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Number of contestants</Label>
                  <Select
                    value={String(contestantFields.fields.length)}
                    onValueChange={(value) =>
                      syncFieldCount(
                        contestantFields.fields.length,
                        Number(value),
                        contestantFields.append,
                        contestantFields.remove,
                        emptyContestant
                      )
                    }
                  >
                    <SelectTrigger className="h-12 rounded-xl border-[#d9ccb0] bg-[#fbf7ef]">
                      <SelectValue placeholder="Select contestant count" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: MAX_CONTESTANTS },
                        (_, index) => index + 1
                      ).map((count) => (
                        <SelectItem key={count} value={String(count)}>
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[2rem] border-[#eadfc6] bg-white shadow-[0_24px_70px_rgba(31,43,58,0.1)]">
            <CardContent className="space-y-8 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <SectionTitle
                  eyebrow="Section 02"
                  title="Team Leaders and Officials"
                  description="Capture the people responsible for the delegation before entering contestant records."
                  displayClassName={displayClassName}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (canAddLeader) {
                      teamLeaderFields.append(emptyLeader());
                    }
                  }}
                  disabled={!canAddLeader}
                  className="h-11 rounded-full bg-[#1d2b3a] px-5 text-white hover:bg-[#26384c]"
                >
                  <Plus className="h-4 w-4" />
                  {canAddLeader ? "Add leader" : "Leader limit reached"}
                </Button>
              </div>

              <div className="space-y-6">
                {teamLeaderFields.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-[1.75rem] border border-[#eadfc6] bg-[#fffaf2] p-5 sm:p-6"
                  >
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6b33]">
                          Leader {index + 1}
                        </div>
                        <div className="mt-1 text-lg font-semibold text-[#1e2a39]">
                          Delegation profile
                        </div>
                      </div>
                      {teamLeaderFields.fields.length > 1 ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => teamLeaderFields.remove(index)}
                          className="rounded-full border-[#d5c09a] bg-transparent text-[#6e3f2d] hover:bg-[#fff2ea]"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      ) : null}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Full name</Label>
                        <Input
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          <SelectTrigger className="h-12 rounded-xl border-[#d9ccb0] bg-white">
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
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          <SelectTrigger className="h-12 rounded-xl border-[#d9ccb0] bg-white">
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
                          <SelectTrigger className="h-12 rounded-xl border-[#d9ccb0] bg-white">
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
                          <SelectTrigger className="h-12 rounded-xl border-[#d9ccb0] bg-white">
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
                        className="min-h-[110px] rounded-2xl border-[#d9ccb0] bg-white"
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
                        label="Consent form"
                        accept=".pdf,.jpg,.jpeg,.png"
                        hint="Signed leader consent form."
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

          <Card className="overflow-hidden rounded-[2rem] border-[#eadfc6] bg-white shadow-[0_24px_70px_rgba(31,43,58,0.1)]">
            <CardContent className="space-y-8 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <SectionTitle
                  eyebrow="Section 03"
                  title="Contestant Roster"
                  description="Add each student with their subject, document metadata, and optional supporting uploads."
                  displayClassName={displayClassName}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (canAddContestant) {
                      contestantFields.append(emptyContestant());
                    }
                  }}
                  disabled={!canAddContestant}
                  className="h-11 rounded-full bg-[#8a6b33] px-5 text-white hover:bg-[#745826]"
                >
                  <Plus className="h-4 w-4" />
                  {canAddContestant
                    ? "Add contestant"
                    : "Contestant limit reached"}
                </Button>
              </div>

              <div className="space-y-6">
                {contestantFields.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-[1.75rem] border border-[#eadfc6] bg-[#fffaf2] p-5 sm:p-6"
                  >
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6b33]">
                          Contestant {index + 1}
                        </div>
                        <div className="mt-1 text-lg font-semibold text-[#1e2a39]">
                          Participant profile
                        </div>
                      </div>
                      {contestantFields.fields.length > 1 ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => contestantFields.remove(index)}
                          className="rounded-full border-[#d5c09a] bg-transparent text-[#6e3f2d] hover:bg-[#fff2ea]"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      ) : null}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      <div className="space-y-2 xl:col-span-1">
                        <Label>Full name</Label>
                        <Input
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          max="2026-05-01"
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          <SelectTrigger className="h-12 rounded-xl border-[#d9ccb0] bg-white">
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
                          <SelectTrigger className="h-12 rounded-xl border-[#d9ccb0] bg-white">
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
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          className="h-12 rounded-xl border-[#d9ccb0] bg-white"
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
                          <SelectTrigger className="h-12 rounded-xl border-[#d9ccb0] bg-white">
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
                          <SelectTrigger className="h-12 rounded-xl border-[#d9ccb0] bg-white">
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
                        className="min-h-[110px] rounded-2xl border-[#d9ccb0] bg-white"
                        placeholder="Allergies, dietary restrictions, or food notes."
                        {...form.register(
                          `contestants.${index}.dietary_requirements`
                        )}
                      />
                    </div>

                    <div className="mt-5 space-y-2">
                      <Label>Additional requirements</Label>
                      <Textarea
                        className="min-h-[110px] rounded-2xl border-[#d9ccb0] bg-white"
                        placeholder="Dietary needs, medical notes, accessibility support, or travel-related remarks."
                        {...form.register(
                          `contestants.${index}.special_requirements`
                        )}
                      />
                    </div>

                    <p className="mt-4 text-sm text-[#766a55]">
                      Contestants must be under 16 on May 1, 2026.
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
                        label="Consent form"
                        accept=".pdf,.jpg,.jpeg,.png"
                        hint="Signed contestant consent form."
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

          <Card className="overflow-hidden rounded-[2rem] border-[#eadfc6] bg-white shadow-[0_24px_70px_rgba(31,43,58,0.1)]">
            <CardContent className="space-y-8 p-6 sm:p-8 lg:p-10">
              <SectionTitle
                eyebrow="Section 04"
                title="Final Confirmation"
                description="Complete the submission by confirming that the delegation data is accurate and aligned with the competition rules."
                displayClassName={displayClassName}
              />

              <div className="grid gap-4">
                <label className="flex items-start gap-4 rounded-[1.5rem] border border-[#eadfc6] bg-[#fcf7ed] p-5">
                  <Checkbox
                    checked={form.watch("confirm_information")}
                    onCheckedChange={(checked) =>
                      form.setValue("confirm_information", checked === true, {
                        shouldValidate: true,
                      })
                    }
                    className="mt-1 border-[#1d2b3a]"
                  />
                  <span className="space-y-1">
                    <span className="block font-medium text-[#1e2a39]">
                      I confirm that the submitted information is complete and
                      accurate.
                    </span>
                    <span className="block text-sm leading-6 text-[#5f6774]">
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

                <label className="flex items-start gap-4 rounded-[1.5rem] border border-[#eadfc6] bg-[#fcf7ed] p-5">
                  <Checkbox
                    checked={form.watch("agree_rules")}
                    onCheckedChange={(checked) =>
                      form.setValue("agree_rules", checked === true, {
                        shouldValidate: true,
                      })
                    }
                    className="mt-1 border-[#1d2b3a]"
                  />
                  <span className="space-y-1">
                    <span className="block font-medium text-[#1e2a39]">
                      I agree to the registration rules and submission policy.
                    </span>
                    <span className="block text-sm leading-6 text-[#5f6774]">
                      This acknowledges the official rules for the second-step
                      registration process and roster submission.
                    </span>
                  </span>
                </label>
                {form.formState.errors.agree_rules ? (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.agree_rules.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-4 border-t border-[#ede3cf] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-sm leading-6 text-[#5f6774]">
                  The form submits to the existing detailed registration API and
                  preserves the current pre-registration page unchanged.
                </p>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="h-12 rounded-full bg-[#1d2b3a] px-7 text-white hover:bg-[#26384c]"
                >
                  {form.formState.isSubmitting
                    ? "Submitting..."
                    : "Submit Second-Step Registration"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.form>
      </div>
    </div>
  );
}
