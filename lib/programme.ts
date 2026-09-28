// Transcribed from public/docs/programme.pdf (FIPhO 2026 Official Programme).
// Keep the two in sync when the programme changes.

export interface ProgrammeItem {
  time: string;
  event: string;
  // Key events, shaded in the official PDF.
  highlight?: boolean;
  tag?: string;
}

export interface ProgrammeDay {
  day: number;
  weekday: string;
  date: string;
  students: ProgrammeItem[];
  mentors: ProgrammeItem[];
}

export const PROGRAMME_DAYS: ProgrammeDay[] = [
  {
    day: 1,
    weekday: "Saturday",
    date: "10 October 2026",
    students: [
      { time: "Throughout the day", event: "Arrival and hotel check-in" },
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "18:00–19:30", event: "Dinner" },
    ],
    mentors: [
      { time: "Throughout the day", event: "Arrival and hotel check-in" },
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "18:00–19:30", event: "Dinner" },
    ],
  },
  {
    day: 2,
    weekday: "Sunday",
    date: "11 October 2026",
    students: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "10:30–12:00", event: "OPENING CEREMONY", highlight: true },
      { time: "13:00–14:30", event: "Lunch (hand in all electronic devices)" },
      { time: "15:00–16:00", event: "Laboratory safety briefing" },
      { time: "16:00–18:00", event: "Free time / interactive games", tag: "Concert" },
      { time: "18:00–19:30", event: "Dinner" },
      { time: "19:30–22:00", event: "Free time" },
    ],
    mentors: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "10:30–12:00", event: "OPENING CEREMONY", highlight: true },
      { time: "13:00–14:00", event: "Lunch" },
      { time: "14:00–16:00", event: "Laboratory inspection" },
      { time: "16:00–18:00", event: "Meeting / discussion of Round 1 problems" },
      { time: "18:00–19:30", event: "Dinner" },
      { time: "19:00–22:30", event: "Translation of Round 1 Olympiad problems" },
    ],
  },
  {
    day: 3,
    weekday: "Monday",
    date: "12 October 2026",
    students: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "09:00–14:00", event: "EXPERIMENTAL EXAMINATION (5 hours)", highlight: true },
      { time: "14:00–15:30", event: "Lunch (at the examination venue)" },
      { time: "16:00–18:00", event: "Free time / interactive games" },
      { time: "18:00–19:30", event: "Dinner" },
      { time: "19:30–22:00", event: "Free time" },
    ],
    mentors: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "10:00–13:00", event: "EXCURSION (Imam al-Bukhari Memorial Complex)", highlight: true },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "15:00–18:00", event: "EXCURSION (Konigil Tourism Village)", highlight: true },
      { time: "18:00–19:30", event: "Dinner" },
      { time: "19:30–22:00", event: "Free time" },
    ],
  },
  {
    day: 4,
    weekday: "Tuesday",
    date: "13 October 2026",
    students: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "08:00–13:00", event: "EXCURSION (Imam al-Bukhari Memorial Complex)", highlight: true },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "15:00–18:00", event: "EXCURSION (Konigil Tourism Village)", highlight: true },
      { time: "18:00–19:30", event: "Dinner" },
      { time: "19:30–22:00", event: "Free time" },
    ],
    mentors: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "08:00–13:00", event: "Free time" },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "14:30–16:30", event: "Free time" },
      { time: "16:30–18:00", event: "Meeting / discussion of Round 2 problems" },
      { time: "18:00–19:30", event: "Dinner" },
      { time: "19:00–22:30", event: "Translation of Round 2 Olympiad problems" },
    ],
  },
  {
    day: 5,
    weekday: "Wednesday",
    date: "14 October 2026",
    students: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "09:00–14:00", event: "THEORETICAL EXAMINATION (5 hours)", highlight: true },
      { time: "14:00–16:30", event: "REUNION PARTY", highlight: true },
      { time: "18:00–19:30", event: "Dinner" },
      { time: "19:30–22:00", event: "Free time" },
    ],
    mentors: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "09:30–14:00", event: "EXCURSION TO REGISTAN SQUARE", highlight: true },
      { time: "14:00–16:30", event: "REUNION PARTY", highlight: true },
      { time: "18:00–19:30", event: "Dinner" },
      { time: "19:30–22:00", event: "Free time" },
    ],
  },
  {
    day: 6,
    weekday: "Thursday",
    date: "15 October 2026",
    students: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "08:00–13:00", event: "EXCURSION TO REGISTAN SQUARE", highlight: true },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "14:30–18:00", event: "EXCURSION TO THE ETERNAL CITY AT THE SAMARKAND TOURIST CENTER", highlight: true },
      { time: "18:00–19:30", event: "Dinner" },
      { time: "19:30–22:00", event: "Free time" },
    ],
    mentors: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "08:00–13:00", event: "APPEALS", highlight: true },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "14:30–18:00", event: "APPEALS", highlight: true },
      { time: "18:00–19:30", event: "Dinner" },
      { time: "19:30–22:00", event: "Free time" },
    ],
  },
  {
    day: 7,
    weekday: "Friday",
    date: "16 October 2026",
    students: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "08:30–13:00", event: "Free time" },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "14:30–16:00", event: "Preparation for the Closing Ceremony" },
      { time: "18:00–20:30", event: "CLOSING AND AWARDS CEREMONY (GALA DINNER)", highlight: true },
    ],
    mentors: [
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "08:30–13:00", event: "Free time" },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "14:30–16:00", event: "Preparation for the Closing Ceremony" },
      { time: "18:00–20:30", event: "CLOSING AND AWARDS CEREMONY (GALA DINNER)", highlight: true },
    ],
  },
  {
    day: 8,
    weekday: "Saturday",
    date: "17 October 2026",
    students: [
      { time: "Throughout the day", event: "Hotel check-out and departure" },
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "18:00–19:30", event: "Dinner" },
    ],
    mentors: [
      { time: "Throughout the day", event: "Hotel check-out and departure" },
      { time: "06:30–08:00", event: "Breakfast" },
      { time: "13:00–14:30", event: "Lunch" },
      { time: "18:00–19:30", event: "Dinner" },
    ],
  },
];
