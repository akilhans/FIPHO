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
    email: "s.chen@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/organizing/turaboy.jpg",
  },
  {
    name: "Charos Abdusattorova",
    role: "Olympiad Coordinator",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Olympiad Coordinator managing operations, international delegations, and event logistics.",
    email: "charosabdusattorova456@gmail.com",
    linkedin: "https://www.linkedin.com/in/charos-abdusattorova-77a911282/",
    image: "/images/organizing/charos.jpg",
  },
  {
    name: "Sevara Shakirova",
    role: "Committee member",
    institution: "The Agency of Specialized Educational Institution",
    country: "Uzbekistan",
    bio: "Vice Diector of The Agency of Specialized Educational Institutions and Committee member",
    email: "m.rahman@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/organizing/sevara.jpg",
  },
  {
    name: "Davron Tuxtayev",
    role: "Committee member",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Exam preparation and supporting track",
    email: "d.park@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/organizing/davron.jpg",
  },
  
  {
    name: "Tamanno To‘rayeva",
    role: "Committee member",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Media track",
    email: "d.park@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/organizing/tamanno.jpg",
  },
  
  {
    name: "Dadaxanov Oqiljon",
    role: "Software engineer",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Software engineer",
    email: "d.park@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/organizing/oqiljon.jpg",
  },
  {
    name: "Shoxbek Shukurulloev",
    role: "Software engineer",
    institution: "Science Olympiad Center",
    country: "Uzbekistan",
    bio: "Software engineer",
    email: "oqiljondadaxanov@gmail.com",
    linkedin: "https://linkedin.com/in/example",
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