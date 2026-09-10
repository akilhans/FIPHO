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

const scientificMembers: CommitteeMember[] = [
  {
    name: "Akramov Tohir Vohidovich",
    role: "Scientific Committee Member",
    institution: "National University of Uzbekistan",
    country: "Uzbekistan",
    bio: "Associate Professor at National University of Uzbekistan and member of the Scientific Committee.",
    image: "/images/scientific/akramov.jpeg",
  },
  {
    name: "Lutfulloyev Shukurullo",
    role: "Scientific Assistant",
    institution: "National University of Uzbekistan",
    country: "Uzbekistan",
    bio: "Master's Student at National University of Uzbekistan, serving as Scientific Assistant.",
    image: "/images/scientific/lutfulloyev.jpeg",
  },
  {
    name: "Doniyor Babajanov",
    role: "Scientific Committee Member",
    institution: "Republic Center for Education",
    country: "Uzbekistan",
    bio: "Head of the Department of Physics at the Republic Center for Education and member of the Scientific Committee.",
    image: "/images/scientific/babajanov.png",
  },
  {
    name: "Suyarov Kusharbay Tashbayevich",
    role: "Scientific Assistant",
    institution: "Chirchik State Pedagogical University",
    country: "Uzbekistan",
    bio: "Lecturer, PhD at Chirchik State Pedagogical University, serving as Scientific Assistant.",
    image: "/images/scientific/suyarov.jpeg",
  },
  {
    name: "Khasanov Otabek",
    role: "Scientific Committee Member",
    institution: "PIIMA School",
    country: "Uzbekistan",
    bio: "Physics teacher at PIIMA School and member of the Scientific Committee.",
    image: "/images/scientific/khasanov.jpeg",
    imagePosition: "object-top",
  },
  {
    name: "Baratov Shirin",
    role: "Scientific Committee Member",
    institution: "PIIMA School",
    country: "Uzbekistan",
    bio: "Master of Science at PIIMA School and member of the Scientific Committee.",
    image: "/images/scientific/baratov.png",
  },
  {
    name: "Nozimjon Shavkatjonov",
    role: "Scientific Assistant",
    institution: "National University of Uzbekistan",
    country: "Uzbekistan",
    bio: "Expert at the National University of Uzbekistan, serving as Scientific Assistant.",
    image: "/images/scientific/shavkatjonov.png",
  },
  {
    name: "Polvonov Satimboy",
    role: "Scientific Committee Member",
    institution: "National University of Uzbekistan named after Mirzo Ulugbek",
    country: "Uzbekistan",
    bio: "Head of the Department of Nuclear Physics and Astronomy at the National University of Uzbekistan named after Mirzo Ulugbek, and member of the Scientific Committee.",
  },
  {
    name: "Samat Maxutov",
    role: "Scientific Committee Member",
    institution: "SDU University",
    country: "Kazakhstan",
    bio: "Associate Professor, PhD at SDU University and member of the Scientific Committee.",
    image: "/images/scientific/maxutov.jpeg",
  },
  {
    name: "Erkinzhon Abdiev",
    role: "Scientific Committee Member",
    institution: "King Abdullah University of Science and Technology",
    country: "Saudi Arabia",
    bio: "PhD Student at King Abdullah University of Science and Technology and member of the Scientific Committee.",
    image: "/images/scientific/abdiev.jpeg",
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