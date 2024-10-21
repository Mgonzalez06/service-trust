export const nftsStub = [
  // NFTs de Oro
  {
    id: 1,
    name: "Golden Sword",
    type: "Oro",
    image:
      "https://png.pngtree.com/png-vector/20240419/ourmid/pngtree-golden-sword-logo-png-image_12298155.png",
  },
  {
    id: 2,
    name: "Golden Crown",
    type: "Oro",
    image:
      "https://st2.depositphotos.com/1007566/11843/v/950/depositphotos_118435034-stock-illustration-crown-gold-golden-icon.jpg",
  },
  // NFTs de Plata
  {
    id: 3,
    name: "Silver Shield",
    type: "Plata",
    image:
      "https://t3.ftcdn.net/jpg/09/06/49/88/360_F_906498816_Qc9RgCLMkMapM5chX7T3Filsxpw4b83P.jpg",
  },
  // NFTs de Bronce
  {
    id: 4,
    name: "Bronze Helmet",
    type: "Bronce",
    image:
      "https://wiki.melvoridle.com/images/e/e2/Bronze_Helmet_%28item%29.png",
  },
  {
    id: 5,
    name: "Bronze Sword",
    type: "Bronce",
    image:
      "https://steamusercontent-a.akamaihd.net/ugc/779532750883148042/989EE9B780B1D0D35D65D9FC262790EE73E16A9B/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
  },
  {
    id: 6,
    name: "Bronze Armor",
    type: "Bronce",
    image: "https://pics.craiyon.com/2023-11-25/Co6iyfXnTD-BCGORRFzoRg.webp",
  },
];

export const categorizeNFTs = () => {
  const categories = {
    Oro: [],
    Plata: [],
    Bronce: [],
  };

  nftsStub.forEach((nft) => {
    categories[nft.type].push(nft);
  });

  return categories;
};

export const applicantsList = [
  {
    name: "John Smith",
    lastName: "Doe",
    country: "United States",
    city: "New York",
    nationality: "American",
    birthdate: "1990-01-01",
    phone: "+123456",
    email: "john@gmail.com",
    skills: "Basic medical care, Medication administration",
    nfts: [
      {
        id: 1,
        name: "Golden Sword",
        type: "Oro",
        image:
          "https://png.pngtree.com/png-vector/20240419/ourmid/pngtree-golden-sword-logo-png-image_12298155.png",
      },
      {
        id: 2,
        name: "Golden Crown",
        type: "Oro",
        image:
          "https://st2.depositphotos.com/1007566/11843/v/950/depositphotos_118435034-stock-illustration-crown-gold-golden-icon.jpg",
      },
    ],
  },
  {
    name: "Jane Far",
    lastName: "Doe",
    country: "United States",
    city: "Los Angeles",
    nationality: "American",
    birthdate: "1995-01-01",
    phone: "+123456",
    email: "jane@gmail.com",
    skills: "Personal care, Emotional support",
    nfts: [
      {
        id: 1,
        name: "Golden Sword",
        type: "Oro",
        image:
          "https://png.pngtree.com/png-vector/20240419/ourmid/pngtree-golden-sword-logo-png-image_12298155.png",
      },
      {
        id: 2,
        name: "Golden Crown",
        type: "Oro",
        image:
          "https://st2.depositphotos.com/1007566/11843/v/950/depositphotos_118435034-stock-illustration-crown-gold-golden-icon.jpg",
      },
    ],
  },
];

export const postsList = [
  {
    owner: "0x0969F4786c8FDC835e5Ba9cF6a734Cc9C005992f",
    id: 1,
    title: "Frontend Developer",
    date: "2024-01-10",
    status: "Open",
    salary: "$60,000/year",
    description: "Frontend Developer with React experience.",
    applicants: applicantsList,
  },
  {
    owner: "0x0969F4786c8FDC835e5Ba9cF6a734Cc9C005992f",
    id: 2,
    title: "UI/UX Designer",
    date: "2024-01-08",
    status: "Closed",
    salary: "$50,000/year",
    description: "UI/UX Designer for mobile and web apps.",
  },
  {
    owner: "0x0969F4786c8FDC835e5Ba9cF6a734Cc9C00599sf",
    id: 3,
    title: "Backend Developer",
    date: "2024-01-15",
    status: "Open",
    salary: "$70,000/year",
    description: "Backend Developer with cloud services experience.",
  },
];
