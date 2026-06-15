import {
  CommitteeLayout,
  type CommitteeMember,
} from "@/components/committee-layout";

const scientificMembers: CommitteeMember[] = [
  {
    name: "Prof. Khamid Khodjaniyazov",
    role: "Chairman of the Scientific Committee",
    institution: "A.S. Sadykov Bioorganic Physics Institute.",
    country: "Uzbekistan",
    bio: "Leading Researcher of Complex Compounds Lab., A.S. Sadykov Bioorganic Physics Institute. ",
    email: "a.ivanov@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/scientific/khamid.png",
  },
  {
    name: "Alexander Kirilovich Gladilin",
    role: "Vice Chairman of the Scientific Committee",
    institution: "Moscow State University named after M. V. Lomonosov",
    country: "Russia",
    bio: "Professor of Moscow State University named after M. V. Lomonosov, Doctor of Chemical Sciences.",
    email: "m.rodriguez@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/scientific/alex.jpg",
  },
  {
    name: "Acad. Shamansur Sagdullaev ",
    role: "Committee member",
    institution: "Institute of Plant Physics",
    country: "Uzbekistan",
    bio: "Director of Institute of Plant Physics. ",
    email: "y.tanaka@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/scientific/acad.jpg",
  },
  {
    name: "Prof. Burkhon Elmuradov ",
    role: "Committee member",
    institution: "Institute of Plant Physics",
    country: "Uzbekistan",
    bio: "Deputy Director for Research and Innovation of Institute of Plant Physics. ",
    email: "a.hassan@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/scientific/burxon.png",
  },
  {
    name: "Prof. Abdujalol Sidikov ",
    role: "Committee member",
    institution: "Tashkent Institute of chemical technologies",
    country: "Uzbekistan",
    bio: "Professor Schmidt specializes in analytical methods and instrumentation for chemical analysis.",
    email: "l.schmidt@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/scientific/jalol.jpg",
  },
  {
    name: "Yunus Türkmen",
    role: "Member of the Scientific Committee",
    institution: "Bilkent University ",
    country: "Ankara, Turkey",
    bio: "Professor Bilkent University Department of Physics",
    email: "w.zhang@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/scientific/yunus.jpg",
  },

  {
    name: "Xamidulla To’xtayev",
    role: "Committee member",
    institution: "King Abdullah University of Science and Technology",
    country: "Tashkent, Uzbekistan",
    bio: "Researcher of King Abdullah University of Science and Technology. ",
    email: "w.zhang@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/scientific/xamid.jpg",
  },
  {
    name: "Bekzod Boltayev ",
    role: "Committee member",
    institution: "“Shifo-Nur” multidisciplinary medical center",
    country: "Tashkent, Uzbekistan",
    bio: "Surgeon at “Shifo-Nur” multidisciplinary medical center. ",
    email: "w.zhang@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/scientific/bek.jpg",
  },
  {
    name: "Muzaffar Maksumov",
    role: "Committee member",
    institution: "The University of Siegen",
    country: "Tashkent, Uzbekistan",
    bio: "Graduate of the University of Siegen.  ",
    email: "w.zhang@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/scientific/muzaffar.jpg",
  },
  {
    name: "Abdulloh Mahmudov ",
    role: "Committee member",
    institution: "Massachusetts Institute of Technology",
    country: "Tashkent, Uzbekistan",
    bio: "Researcher of Massachusetts Institute of Technology.  ",
    email: "w.zhang@fipho.uz",
    linkedin: "https://linkedin.com/in/example",
    image: "/images/scientific/abdulloh.jpg",
  },
  {
    name: "Bulat Garifullin",
    role: "member of Science Committee",
    institution: "Hospital No.13 Ufa",
    country: "Russian Federation",
    bio: "Bulat is the author of problems at various international physics Olympiads for the past 20 years",
    email: "germes1981@list.ru",
    linkedin: "",
    image: "/images/scientific/Bulat.jpg",
  },
  {
    name: "Alex Koronatov",
    role: "member of the scientific committee ",
    institution: "Technion",
    country: "Croatia",
    bio: "Alex is physicist who loves teaching. He enjoys preparing and solving physics Olympiad tasks.",
    email: "sashakoronatow@gmail.com",
    linkedin: "http://linkedin.com/in/alex-koronatov-227592292",
    image: "/images/scientific/Koronatov.jpg",
  },
  {
    name: "Andrei Shved",
    role: "member of Science Committee",
    institution: "ETH Zurich",
    country: "Switzerland",
    bio: "Andrei is a dedicated teacher with rigorous scientific training and many years of experience in international Physics Olympiads",
    email: "andrei.m.shved@gmail.com",
    linkedin: "https://linkedin.com/in/andrei-shved",
    image: "/images/scientific/Andrei.jpg",
  },
  {
    name: "Prof. Vadim Eremin",
    role: "member of the Science Committee",
    institution: "Moscow State University, Physics Department",
    country: "Russian",
    bio: "Professor Eremin is a professor of theoretical physics with a great experience in All-Russian and international physics olympiads.",
    email: "vv_er@mail.ru",
    linkedin: "",
    image: "/images/scientific/Vadim.jpg",
  },
];

export default function ScientificCommitteePage() {
  return (
    <CommitteeLayout
      title="Scientific Committee"
      description="Our distinguished Scientific Committee comprises leading physicists and educators who ensure the academic excellence and innovation of FIPHO 2025."
      members={scientificMembers}
      type="scientific"
    />
  );
}
