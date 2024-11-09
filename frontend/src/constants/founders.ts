export interface Founder {
  name: string;
  title: string;
  profilePicture: string;
  linkedin: string;
}

export const FOUNDERS: Founder[] = [
    {
      name: "Ofek Salama",
      title: "CEO & Co-Founder",
      profilePicture: "/ofek.jpeg",
      linkedin: "https://www.linkedin.com/in/ofek-salama-a18012154/",
    },
    {
      name: "Tehila Pelled",
      title: "CTO & Co-Founder",
      profilePicture: "/tehila.jpeg",
      linkedin: "https://www.linkedin.com/in/tehila-pelled-7aa43a148/",
    },
    {
      name: "Naama Schwartz",
      title: "CPO & Co-Founder",
      profilePicture: "/naama.jpeg",
      linkedin: "https://www.linkedin.com/in/naama-schwartz-956563172/",
    },
    {
      name: "Ziv Bakhajian",
      title: "VP R&D & Co-Founder",
      profilePicture: "/ziv.jpeg",
      linkedin: "https://www.linkedin.com/in/ziv-bakhajian-199b60175/",
    }
  ];