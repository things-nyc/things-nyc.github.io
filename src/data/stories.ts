export type Story = {
  slug: string;
  imageUrl?: string;
  title: string;
  author?: string;
  authorUrl?: string;
  summary: string;
  tags: string[];
  cover?: string; // e.g. "/images/stories/floodnet.jpg"
  mdPath?: string;
  metrics?: {
    sensors?: string | number;
    gateways?: string | number;
    partners?: string[];
  };
  links?: { external?: string; data?: string; github?: string };
};

export const stories: Story[] = [
  {
    slug: "ps28-lexus-eco-challenge",
    imageUrl: "images/stories/lexus-eco-challenge.jpg",
    title:
      "Students from Christa McAuliffe Public School in Jersey City win Lexus Eco Challenge with TTN",
    author: "Jeff Honig",
    authorUrl: "https://github.com/jchonig",
    summary:
      "The Things Network(TTN) New York helped stablize the gateway with poor cellular coverage during the 2020 Lexus Eco Challenge helping the R.E.M. (Remote Environmental Monitoring) team from Christa McAuliffe School(P.S. 28) in Jersey City, New Jersey with the middle-school Grand Prize.",
    tags: ["Education", "Environment", "Community"],
    mdPath: "src/content/stories/ps28-lexus-eco-challenge.md",
    links: {
      external:
        "https://pressroom.lexus.com/green-for-going-green-winning-students-tackle-global-environmental-issues-in-2020-lexus-eco-challenge/",
    },
  },
  {
    slug: "floodnet-nyc",
    imageUrl: "images/stories/floodnet.jpg",
    title:
      "FloodNet: Realtime Street-Level Flood Monitoring Across New York City",
    author: "Jon Bosak",
    authorUrl: "https://en.wikipedia.org/wiki/Jon_Bosak",
    summary:
      "81 sensors across 17 gateways measure flood depth and duration, streaming through TTN to public dashboards for response.",
    tags: ["Smart City", "Environment", "Research"],

    links: { external: "https://floodnet.nyc/" },
  },
];
