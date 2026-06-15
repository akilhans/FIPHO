export type ActivityType =
  | "competition"
  | "ceremony"
  | "meal"
  | "cultural"
  | "transportation"
  | "free"
  | "registration";

// Define the interface for a schedule item
export interface ScheduleItemType {
  time: string;
  activity: string;
  description: string;
  location: string;
  type: ActivityType;
}

// Define the interface for a single day's schedule
export interface DaySchedule {
  date: string;
  day: string;
  title: string;
  description: string;
  schedule: ScheduleItemType[];
}

// Export the weekSchedule data
export const weekSchedule: DaySchedule[] = [
  {
    date: "28-May, 2025",
    day: "Day 1",
    title: "Arrival & Registration",
    description: "Teams arrive in Tashkent and complete registration",
    schedule: [
      {
        time: "All Day",
        activity: "Airport Transfers",
        description:
          "Teams arrive at Tashkent International Airport and are transferred to accommodation",
        location: "Tashkent International Airport → Hotels",
        type: "transportation",
      },
      {
        time: "09:00 - 20:00",
        activity: "Registration",
        description:
          "Teams register and receive welcome packages, badges, and information materials",
        location: "Conference Center, Main Hall",
        type: "registration",
      },
      {
        time: "12:00 - 14:00",
        activity: "Lunch",
        description: "Buffet lunch available for arriving teams",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "18:00 - 20:00",
        activity: "Dinner",
        description: "Welcome dinner for all participants",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "20:00 - 21:30",
        activity: "Team Leaders Meeting",
        description:
          "Introductory meeting for team leaders with organizing committee",
        location: "Conference Center, Meeting Room A",
        type: "registration",
      },
    ],
  },
  {
    date: "29-May, 2025",
    day: "Day 2",
    title: "Opening Ceremony",
    description: "Official opening of FIPHO 2025",
    schedule: [
      {
        time: "07:00 - 08:30",
        activity: "Breakfast",
        description: "Breakfast at hotels",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "09:00 - 10:00",
        activity: "Transfer to Ceremony Venue",
        description: "Buses depart from hotels to the opening ceremony venue",
        location: "Hotels → National Academic Theater",
        type: "transportation",
      },
      {
        time: "10:30 - 12:30",
        activity: "Opening Ceremony",
        description:
          "Official opening with speeches, cultural performances, and parade of nations",
        location: "National Academic Theater",
        type: "ceremony",
      },
      {
        time: "12:30 - 14:00",
        activity: "Lunch",
        description: "Buffet lunch for all participants",
        location: "Theater Reception Hall",
        type: "meal",
      },
      {
        time: "14:30 - 16:30",
        activity: "City Tour",
        description: "Guided tour of Tashkent highlights for students",
        location: "Tashkent City Center",
        type: "cultural",
      },
      {
        time: "14:30 - 17:30",
        activity: "Jury Meeting",
        description:
          "First meeting of the international jury and discussion of theoretical examination",
        location: "Conference Center, Meeting Room B",
        type: "competition",
      },
      {
        time: "18:00 - 20:00",
        activity: "Welcome Dinner",
        description: "Traditional Uzbek dinner with cultural program",
        location: "National Restaurant",
        type: "meal",
      },
      {
        time: "20:30 - 22:00",
        activity: "Team Leaders Meeting",
        description: "Final briefing before competition day",
        location: "Conference Center, Main Hall",
        type: "registration",
      },
    ],
  },
  {
    date: "30-May, 2025",
    day: "Day 3",
    title: "Theoretical Examination",
    description: "First competition day focused on theoretical physics",
    schedule: [
      {
        time: "06:30 - 07:30",
        activity: "Breakfast",
        description: "Early breakfast for all participants",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "07:45 - 08:30",
        activity: "Transfer to Examination Venue",
        description: "Buses depart from hotels to the examination venue",
        location: "Hotels → National University",
        type: "transportation",
      },
      {
        time: "08:30 - 09:00",
        activity: "Preparation",
        description: "Students enter examination hall and receive instructions",
        location: "National University, Examination Halls",
        type: "competition",
      },
      {
        time: "09:00 - 14:00",
        activity: "Theoretical Examination",
        description:
          "5-hour theoretical examination covering all areas of physics",
        location: "National University, Examination Halls",
        type: "competition",
      },
      {
        time: "09:30 - 13:30",
        activity: "Mentors' Excursion",
        description: "Visit to historical sites for team mentors",
        location: "Departure from National University",
        type: "cultural",
      },
      {
        time: "14:00 - 15:30",
        activity: "Lunch",
        description: "Lunch for all participants after examination",
        location: "University Dining Hall",
        type: "meal",
      },
      {
        time: "16:00 - 18:00",
        activity: "Translation Session",
        description: "Team leaders translate examination papers",
        location: "Conference Center, Translation Rooms",
        type: "competition",
      },
      {
        time: "16:00 - 18:00",
        activity: "Recreational Activities",
        description: "Sports and games for students",
        location: "University Sports Complex",
        type: "free",
      },
      {
        time: "18:30 - 20:00",
        activity: "Dinner",
        description: "Dinner at hotels",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "20:00 - 22:00",
        activity: "Cultural Evening",
        description:
          "International cultural exchange program where teams present their countries",
        location: "Conference Center, Main Hall",
        type: "cultural",
      },
    ],
  },
  {
    date: "31-May, 2025",
    day: "Day 4",
    title: "Practical Examination",
    description: "Second competition day focused on laboratory skills",
    schedule: [
      {
        time: "06:30 - 07:30",
        activity: "Breakfast",
        description: "Early breakfast for all participants",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "07:45 - 08:30",
        activity: "Transfer to Laboratory",
        description: "Buses depart from hotels to the laboratory venue",
        location: "Hotels → Physics Research Institute",
        type: "transportation",
      },
      {
        time: "08:30 - 09:00",
        activity: "Laboratory Preparation",
        description:
          "Safety briefing and preparation for practical examination",
        location: "Physics Research Institute, Laboratories",
        type: "competition",
      },
      {
        time: "09:00 - 14:00",
        activity: "Practical Examination",
        description:
          "5-hour laboratory examination testing experimental skills",
        location: "Physics Research Institute, Laboratories",
        type: "competition",
      },
      {
        time: "09:30 - 13:30",
        activity: "Mentors' Workshop",
        description: "Professional development workshop for team mentors",
        location: "Physics Research Institute, Conference Room",
        type: "cultural",
      },
      {
        time: "14:00 - 15:30",
        activity: "Lunch",
        description: "Lunch for all participants after examination",
        location: "Institute Dining Hall",
        type: "meal",
      },
      {
        time: "16:00 - 19:00",
        activity: "Grading Session",
        description: "Jury begins grading theoretical examination papers",
        location: "Conference Center, Grading Rooms",
        type: "competition",
      },
      {
        time: "16:00 - 19:00",
        activity: "City Exploration",
        description: "Free time for students to explore Tashkent in groups",
        location: "Tashkent City Center",
        type: "free",
      },
      {
        time: "19:30 - 21:00",
        activity: "Dinner",
        description: "Dinner at hotels",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "21:00 - 22:30",
        activity: "Social Activities",
        description: "Games and social activities for students",
        location: "Hotel Recreation Areas",
        type: "free",
      },
    ],
  },
  {
    date: "June 1, 2025",
    day: "Day 5",
    title: "Research Presentations",
    description: "Third competition day focused on research and innovation",
    schedule: [
      {
        time: "07:00 - 08:30",
        activity: "Breakfast",
        description: "Breakfast at hotels",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "08:45 - 09:30",
        activity: "Transfer to Presentation Venue",
        description: "Buses depart from hotels to the presentation venue",
        location: "Hotels → Science Academy",
        type: "transportation",
      },
      {
        time: "09:30 - 12:30",
        activity: "Research Presentations",
        description:
          "Students present their research proposals related to the competition theme",
        location: "Science Academy, Auditoriums",
        type: "competition",
      },
      {
        time: "09:30 - 12:30",
        activity: "Grading Session",
        description: "Jury continues grading practical examination results",
        location: "Science Academy, Meeting Rooms",
        type: "competition",
      },
      {
        time: "12:30 - 14:00",
        activity: "Lunch",
        description: "Lunch for all participants",
        location: "Science Academy Cafeteria",
        type: "meal",
      },
      {
        time: "14:30 - 17:30",
        activity: "Scientific Symposium",
        description: "Lectures by renowned scientists on sustainable physics",
        location: "Science Academy, Main Auditorium",
        type: "cultural",
      },
      {
        time: "18:00 - 19:30",
        activity: "Dinner",
        description: "Dinner at hotels",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "20:00 - 22:00",
        activity: "Arbitration Session",
        description:
          "Team leaders review scores and discuss with jury if needed",
        location: "Conference Center, Meeting Rooms",
        type: "competition",
      },
      {
        time: "20:00 - 22:00",
        activity: "Movie Night",
        description: "Science-themed movie screening for students",
        location: "Conference Center, Theater Room",
        type: "cultural",
      },
    ],
  },
  {
    date: "June 2, 2025",
    day: "Day 6",
    title: "Cultural Excursion",
    description: "Visit to historical Samarkand",
    schedule: [
      {
        time: "06:00 - 07:00",
        activity: "Breakfast",
        description: "Early breakfast at hotels",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "07:15 - 10:30",
        activity: "Transfer to Samarkand",
        description: "High-speed train journey to Samarkand",
        location: "Tashkent Railway Station → Samarkand",
        type: "transportation",
      },
      {
        time: "10:30 - 13:00",
        activity: "Registan Square Tour",
        description: "Guided tour of the iconic Registan Square and madrasas",
        location: "Registan Square, Samarkand",
        type: "cultural",
      },
      {
        time: "13:00 - 14:30",
        activity: "Lunch",
        description: "Traditional Uzbek lunch in Samarkand",
        location: "Traditional Restaurant, Samarkand",
        type: "meal",
      },
      {
        time: "14:30 - 17:30",
        activity: "Historical Sites Tour",
        description:
          "Visit to Bibi-Khanym Mosque, Shah-i-Zinda necropolis, and Gur-e-Amir mausoleum",
        location: "Various Sites, Samarkand",
        type: "cultural",
      },
      {
        time: "17:30 - 18:30",
        activity: "Free Time",
        description: "Shopping and free exploration of Samarkand",
        location: "Samarkand City Center",
        type: "free",
      },
      {
        time: "18:30 - 20:00",
        activity: "Dinner",
        description: "Farewell dinner in Samarkand with cultural performance",
        location: "Cultural Complex, Samarkand",
        type: "meal",
      },
      {
        time: "20:15 - 23:30",
        activity: "Return to Tashkent",
        description: "High-speed train journey back to Tashkent",
        location: "Samarkand → Tashkent",
        type: "transportation",
      },
    ],
  },
  {
    date: "June 3, 2025",
    day: "Day 7",
    title: "Closing Ceremony & Awards",
    description: "Final day with awards presentation and closing ceremony",
    schedule: [
      {
        time: "07:30 - 09:00",
        activity: "Breakfast",
        description: "Breakfast at hotels",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "09:30 - 10:30",
        activity: "Transfer to Ceremony Venue",
        description: "Buses depart from hotels to the closing ceremony venue",
        location: "Hotels → National Palace of Arts",
        type: "transportation",
      },
      {
        time: "11:00 - 13:30",
        activity: "Closing Ceremony",
        description:
          "Official closing ceremony with medal presentations and speeches",
        location: "National Palace of Arts, Main Hall",
        type: "ceremony",
      },
      {
        time: "13:30 - 15:00",
        activity: "Celebration Lunch",
        description: "Festive lunch for all participants",
        location: "Palace Gardens",
        type: "meal",
      },
      {
        time: "15:00 - 17:00",
        activity: "Photo Sessions",
        description: "Official photos of medal winners and national teams",
        location: "Palace Gardens",
        type: "ceremony",
      },
      {
        time: "17:30 - 19:00",
        activity: "Free Time",
        description: "Time for packing and preparation for departure",
        location: "Hotels",
        type: "free",
      },
      {
        time: "19:30 - 23:00",
        activity: "Farewell Party",
        description: "Celebration dinner and dance party for all participants",
        location: "Grand Ballroom, Central Hotel",
        type: "cultural",
      },
    ],
  },
  {
    date: "June 4, 2025",
    day: "Day 8",
    title: "Departure Day",
    description: "Teams depart from Tashkent",
    schedule: [
      {
        time: "06:00 - 10:00",
        activity: "Breakfast",
        description: "Flexible breakfast times based on departure schedules",
        location: "Hotel Restaurants",
        type: "meal",
      },
      {
        time: "All Day",
        activity: "Airport Transfers",
        description:
          "Scheduled transfers from hotels to Tashkent International Airport",
        location: "Hotels → Tashkent International Airport",
        type: "transportation",
      },
      {
        time: "09:00 - 12:00",
        activity: "Optional City Tour",
        description: "Additional city tour for teams with late departures",
        location: "Tashkent City Center",
        type: "cultural",
      },
    ],
  },
];
