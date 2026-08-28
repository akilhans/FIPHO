import {
  CommitteeLayout,
  type CommitteeMember,
} from "@/components/committee-layout";

const organizingMembers: CommitteeMember[] = [
  {
    name: "To'raboy Shermatov",
    role: "Chairman of The Organizing Committee",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Director of Science Olympiad Center and Chairman of The Organizing Committee",
    image: "/images/organizing/turaboy.jpg",
  },
  {
    name: "Kh.R. Shakirov",
    role: "Co-Chair of The Organizing Committee",
    institution: "Agency for Specialized Educational Institutions",
    country: "Uzbekistan",
    bio: "Deputy Director of the Agency for Specialized Educational Institutions and Co-Chair of The Organizing Committee",
    image: "/images/organizing/shakirov.jpg",
  },
  {
    name: "Charos Abdusattorova",
    role: "Olympiad Coordinator",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Olympiad Coordinator managing operations, international delegations, and event logistics.",
    image: "/images/organizing/charos.jpg",
  },
  {
    name: "Sevara Shakirova",
    role: "Committee member",
    institution: "Agency for Specialized Educational Institutions",
    country: "Uzbekistan",
    bio: "Vice Director of the Agency for Specialized Educational Institutions and Committee member",
    image: "/images/organizing/sevara.jpg",
  },
  {
    name: "S.A. Ashirov",
    role: "Committee member",
    institution: "Agency for Specialized Educational Institutions",
    country: "Uzbekistan",
    bio: "Head of the Department for Creative and Sports Schools",
    image: "/images/organizing/ashirov.jpg",
  },
  {
    name: "A.N. Abdulkhaev",
    role: "Committee member",
    institution: "Ministry of Preschool and School Education",
    country: "Uzbekistan",
    bio: "Head of the Department of International Relations",
    image: "/images/organizing/abdulkhaev.jpg",
  },
  {
    name: "M.N. Musurmonov",
    role: "Committee member",
    institution: "Ministry of Preschool and School Education",
    country: "Uzbekistan",
    bio: "Head of the Department for ICT Implementation and Digitalization",
    image: "/images/organizing/musurmonov.jpg",
  },
  {
    name: "D.A. Sobirova",
    role: "Committee member",
    institution: "Ministry of Preschool and School Education",
    country: "Uzbekistan",
    bio: "Head of the Information Service",
    image: "/images/organizing/sobirova.jpg",
  },
  {
    name: "Davron Tuxtayev",
    role: "Deputy Director",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Deputy Director of the Science Olympiad Center. Exam preparation and supporting track.",
    image: "/images/organizing/davron.jpg",
  },
  {
    name: "F.F. Tuychiev",
    role: "Committee member",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Head of the Department for Selection and Training of Students for International Science Olympiads",
    image: "/images/organizing/tuychiev.jpg",
  },
  {
    name: "Tamanno To‘rayeva",
    role: "Committee member",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Media track",
    image: "/images/organizing/tamanno.jpg",
  },
  {
    name: "Dadaxanov Oqiljon",
    role: "Software engineer",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Software engineer",
    image: "/images/organizing/oqiljon.jpg",
  },
  {
    name: "Shoxbek Shukurulloev",
    role: "Software engineer",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Software engineer",
    image: "/images/organizing/shoxbek.jpg",
  },
];

export default function OrganizingCommitteePage() {
  return (
    <CommitteeLayout
      title="Organizing Committee"
      description="Meet the dedicated team behind FIPHO, working tirelessly to create an exceptional competition experience for young physicists worldwide."
      members={organizingMembers}
      type="organizing"
    />
  );
}
