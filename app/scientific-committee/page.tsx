import { Metadata } from "next";
import {
  CommitteeLayout,
  type CommitteeMember,
} from "@/components/committee-layout";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Scientific Committee | ${BRAND.fullName}`,
  description:
    "Meet the international academic leaders, physicists, and researchers guiding the scientific excellence and academic rigor of FIPHO.",
};

const INTERNATIONAL = "International Experts";
const LOCAL = "Local Experts";

const scientificMembers: CommitteeMember[] = [
  {
    group: INTERNATIONAL,
    name: "Anatolii Ivanovich Slabadzianiuk",
    role: "Co-Chairperson",
    institution: "Head of General Physics Department, Minsk State University",
    country: "Belarus",
    image: "/images/scientific/slabadzianiuk.jpg",
    thumbnail: "/images/scientific/avatars/slabadzianiuk.jpg",
  },
  {
    group: INTERNATIONAL,
    name: "Jaan Kalda",
    role: "Committee Member",
    institution: "Professor, Tallinn University of Technology",
    country: "Estonia",
    image: "/images/scientific/kalda.jpg",
    thumbnail: "/images/scientific/avatars/kalda.jpg",
  },
  {
    group: INTERNATIONAL,
    name: "Erkinjon Abdiyev",
    role: "Committee Member",
    institution: "King Abdullah University of Science and Technology",
    country: "Saudi Arabia",
    image: "/images/scientific/abdiyev.jpg",
    thumbnail: "/images/scientific/avatars/abdiyev.jpg",
  },
  {
    group: INTERNATIONAL,
    name: "Nikolai Vasilyevich Kozlovsky",
    role: "Committee Member",
    institution: "Minsk State University",
    country: "Belarus",
    image: "/images/scientific/kozlovsky.jpg",
    thumbnail: "/images/scientific/avatars/kozlovsky.jpg",
  },
  {
    group: INTERNATIONAL,
    name: "Samat Maksudov",
    role: "Committee Member",
    institution: "Professor, SDU University",
    country: "Kazakhstan",
    image: "/images/scientific/maksudov.jpg",
    thumbnail: "/images/scientific/avatars/maksudov.jpg",
  },
  {
    group: LOCAL,
    name: "Khatam Bakhronovich Ashurov",
    role: "Chairperson",
    institution:
      "Director, Institute of Ion-Plasma and Laser Technologies, Academy of Sciences of Uzbekistan",
    country: "Uzbekistan",
    image: "/images/scientific/ashurov.jpg",
    thumbnail: "/images/scientific/avatars/ashurov.jpg",
  },
  {
    group: LOCAL,
    name: "Doniyor Babajanov",
    role: "Committee Member",
    institution: "Head of Physics Textbooks Department, Republican Education Center",
    country: "Uzbekistan",
    image: "/images/scientific/babajanov.jpg",
    thumbnail: "/images/scientific/avatars/babajanov.jpg",
  },
  {
    group: LOCAL,
    name: "Shirinbek Baratov",
    role: "Committee Member",
    institution:
      "Physics Teacher, Akangaran Specialized Boarding School (Olympiad Winner)",
    country: "Uzbekistan",
    image: "/images/scientific/baratov.jpg",
    thumbnail: "/images/scientific/avatars/baratov.jpg",
  },
  {
    group: LOCAL,
    name: "Kusharbay Suyarov",
    role: "Committee Member",
    institution: "Professor, Chirchik State Pedagogical University",
    country: "Uzbekistan",
    image: "/images/scientific/suyarov.jpg",
    thumbnail: "/images/scientific/avatars/suyarov.jpg",
  },
  {
    group: LOCAL,
    name: "Shukrullo Usmonov",
    role: "Committee Member",
    institution:
      "Professor, Physical-Technical Institute, Academy of Sciences of Uzbekistan",
    country: "Uzbekistan",
    image: "/images/scientific/usmonov.jpg",
    thumbnail: "/images/scientific/avatars/usmonov.jpg",
  },
  {
    group: LOCAL,
    name: "Satimboy Polvonov",
    role: "Committee Member",
    institution: "Professor, Faculty of Physics, National University of Uzbekistan",
    country: "Uzbekistan",
    image: "/images/scientific/polvonov.jpg",
    thumbnail: "/images/scientific/avatars/polvonov.jpg",
  },
  {
    group: LOCAL,
    name: "Tokhir Akramov",
    role: "Committee Member",
    institution: "Professor, Faculty of Physics, National University of Uzbekistan",
    country: "Uzbekistan",
    image: "/images/scientific/akramov.jpg",
    thumbnail: "/images/scientific/avatars/akramov.jpg",
  },
  {
    group: LOCAL,
    name: "Rivojiddin Jalolov",
    role: "Committee Member",
    institution:
      "Researcher, National University of Uzbekistan & Institute of Ion-Plasma and Laser Technologies",
    country: "Uzbekistan",
    image: "/images/scientific/jalolov.jpg",
    thumbnail: "/images/scientific/avatars/jalolov.jpg",
  },
  {
    group: LOCAL,
    name: "Saidjon Khamroqulov",
    role: "Committee Member",
    institution: "Physics Teacher, Karakul District Specialized Boarding School",
    country: "Uzbekistan",
  },
  {
    group: LOCAL,
    name: "Dilmurod Ortikboyev",
    role: "Committee Member",
    institution: "Researcher, Samarkand State University",
    country: "Uzbekistan",
  },
  {
    group: LOCAL,
    name: "Furkat Yusupov",
    role: "Committee Member",
    institution: "Physics Teacher, School No. 27, Khazarasp District",
    country: "Uzbekistan",
  },
  {
    group: LOCAL,
    name: "Azizbek Atoyev",
    role: "Committee Member",
    institution: "Physics Teacher, Specialized School of Kyzyltepa District",
    country: "Uzbekistan",
  },
  {
    group: LOCAL,
    name: "Farkhod Jurayev",
    role: "Committee Member",
    institution: "Physics Teacher, Academic Lyceum named after S.H. Sirojiddinov",
    country: "Uzbekistan",
  },
  {
    group: LOCAL,
    name: "Oybek Egamberdiyev",
    role: "Committee Member",
    institution: "AJOU University in Tashkent",
    country: "Uzbekistan",
  },
];

export default function ScientificCommitteePage() {
  return (
    <CommitteeLayout
      title="Scientific Committee"
      description="Meet the distinguished physicists, researchers, and educators responsible for formulating problems, ensuring academic integrity, and leading the scientific roster of FIPHO."
      members={scientificMembers}
      type="scientific"
    />
  );
}
