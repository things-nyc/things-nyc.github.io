export type Project = {
  slug: string;
  title: string;
  projectType: string;
  summary: string;
  status: string;
  imageUrl?: string;
  lead: string;
  nextSteps?: string[];
  links?: {
    documentation?: string;
    repositories?: string[];
    website?: string;
    extra?: string[];
  };
};

export const activeProjects: Project[] = [
  {
    slug: "outreach-and-gateway-deployment",
    title: "Outreach and Gateway Deployment",
    projectType: "Organization",
    summary:
      "The fundamental purpose of the organization is to build a network of technical experts to support students, teachers, researchers, experimenters and entrepreneurs in using remote sensing technology to advance our knowledge about and managament of physical processes in New York and around the world. Both to help build our own skills, and to help our users, we’re deploying the free-to-use Things Network throughout New York City. A key part of that effort is spreading the word about The Things Network and the benefits of joining an open IoT network. Outreach includes participating in hackathon and workshop events, presenting in various technology fora, and meeting with commercial, non-profit, and government organizations that might benefit from using TTN. In addition, the group recommends hardware, software and cloud solutions, and offer direct on-site support to people who want to deploy devices or a gateway.",
    status: "Ongoing",
    imageUrl: "images/projects/outreach.jpg",
    lead: "Terry Moore",
    nextSteps: [
      "More in-person hands-on make-it-work workshops.",
      "Deploy fixed rooftop gateway with large antenna in commercial building.",
      "Fundraising to deploy a dense network of gateways",
    ],
    links: {
      documentation: "",
      repositories: [],
      website: "https://github.com/terrillmoore",
      extra: [],
    },
  },
  {
    slug: "gateway-fleet-management-system",
    title: "Gateway fleet management system",
    projectType: "System",
    summary:
      "A system supporting the deployment, monitoring, and maintenance of a fleet of Multi-Tech Conduit and Conduit AP gateways. As part of deploying hundreds of gateways to cover NYC and Ithaca regions of New York State, the group manages these gateways as a service to gateway owners. The system uses the Ansible Configuration Management tool to drive gateway configuration, an SSH jumphost to enable secure remote access.",
    status: "Active Development, being used to deploy and monitor gateways",
    imageUrl: "images/projects/gateway.jpg",
    lead: "Jeff Honig",
    nextSteps: ["Improve robustness", "Continuous integration testing"],
    links: {
      documentation: "https://github.com/IthacaThings/ttn-multitech-cm",
      repositories: [
        "https://github.com/IthacaThings/ttn-multitech-cm",
        "https://github.com/IthacaThings/meta-ttni",
        "https://github.com/jchonig/mlinux-be",
        "https://hub.docker.com/r/jchonig/mlinux-be",
      ],
      website: "https://github.com/jchonig",
      extra: [],
    },
  },
  {
    slug: "organization-presence-and-funding",
    title: "Organization, Presence, and Funding",
    projectType: "Organization",
    summary:
      "TTN-NY as an organization needs legal structure, accounting, and governance. It also needs to be present on the Web and social media in order to be found by people looking for LoraWAN support in NYC. We recently completed official registration as a 501(c)3, meaning that now we can accept tax deductable donations.",
    status: "Ongoing",
    imageUrl: "images/projects/organization.jpg",
    lead: "Terry Moore",
    nextSteps: [
      "Add more project documentation on the website.",
      "Enable donations by engaging a fiscal sponsor.",
      "Meeting minutes and newsletter on website.",
    ],
    links: {
      documentation: "",
      repositories: [
        "https://github.com/things-nyc/things-nyc.github.io",
        "https://github.com/things-nyc/things-nyc-docs",
      ],
      website: "https://github.com/terrillmoore",
      extra: [],
    },
  },
  {
    slug: "arduino-lmic-library",
    title: "Arduino LMIC Library",
    projectType: "Library",
    summary:
      "The LMIC (LoRa-Mac in C) library came from IBM; the initial port to Arduino was done in Europe by Matthijs Kooijman. You can find the original repository under the extra links below. When the team at TTN-NY first started building Arduino nodes, they discovered many missing features related to operating within the US band plan. Frank started the things-nyc repo; then Terry forked the things-nyc repo and made even more extensive changes to support MCCI’s Catena boards, including adding all global band plans and doing extensive testing and bug fixing. His repo is now the offical home of Arduino LMIC for worldwide use.",
    status:
      "The TTN-NY repo is deprecated. The MCCI-Catena fork is our recommended building block for Arduino development with the 1276/8 chips (RFM-95).",
    imageUrl: "images/projects/arduino.jpg",
    lead: "Terry Moore",
    nextSteps: ["Add multicast and FUOTA support."],
    links: {
      documentation: "",
      repositories: [
        "https://github.com/mcci-catena/arduino-lmic",
        "https://github.com/things-nyc/arduino-lmic",
      ],
      website: "https://github.com/terrillmoore",
      extra: ["https://github.com/matthijskooijman/arduino-lmic"],
    },
  },
  {
    slug: "manhattan-mapper",
    title: "Manhattan Mapper",
    projectType: "Device",
    summary:
      "Councilwoman Gale Brewer, Manhattan Borough President from 2014 to 2021, is a vocal advocate for building Smart City infrastructure in an open way that encourages innovation. TTN-NY built a LoRa node with GPS to be installed in Gale’s primary vehicle, so she could participate in the development of a TTN coverage map as she conducts her business around the city.",
    status: "Proof of concept complete; project suspended.",
    imageUrl: "images/projects/mapper.jpg",
    lead: "Frank Leon Rose",
    nextSteps: ["Write up build log."],
    links: {
      documentation: "",
      repositories: ["https://github.com/frankleonrose/ManhattanMapper"],
      website: "https://github.com/frankleonrose",
      extra: [],
    },
  },
  {
    slug: "harlem-heat",
    title: "Harlem Heat remote measurements",
    projectType: "Device",
    summary:
      "As part of the Harlem Heat Project, Brian has deployed a number of off-the-shelf sensors to measure indoor temperatures in the city. He would like to collect data from the sensors via TTN. However, he would like to avoid having to visit the sensors to replace batteries every two weeks. Terry provided Brian with a set of Catena-based(find the repository link under extra links below) sensors as a first stage of the project. They work well communicating with a gateway high on the CUNY campus, but they still consume power at a higher rate than Brian would like. Frank and Forrest figured out the protocol for communicating with existing long-running off-the-shelf temperature sensors. Now Frank is putting together a communications board that will be able to transmit readings via LoRa while conserving power by going into deep sleep while inactive.",
    status: "Prototyping power management",
    imageUrl: "images/projects/harlem-heat.jpg",
    lead: "Brian Vant-Hull",
    nextSteps: ["Deploy and test battery longevity."],
    links: {
      documentation: "",
      repositories: [],
      website: "",
      extra: ["https://github.com/mcci-catena/HW-Designs"],
    },
  },
  {
    slug: "mapthethings",
    title: "MapTheThings",
    projectType: "Server, Device, App",
    summary:
      "TTN Mapper(link below) is the standard mapping service used by more than 1500 TTN users globally. It contains more than 3 million transmission data points. Frank created the MapTheThings(link below) service as a fully open source alternative with scalability as a primary goal. The service summarizes successful and attempted transmissions into a multi-scale geo-hashed grid so that displaying data for any region on the globe requires a (roughly) constant and relatively small volume of data downloaded. The server is deployed on Heroku with SQS buffering and summary data is served directly from S3. On the node side, MapTheThings pairs a bluetooth and LoRa enabled node with an iOS app that tracks location and drives transmission of packets. A GPS-equipped LoRa node can also send location packets, but in this use case there is no tracking of attempted transmissions. The differnce between this and TTN Mapper is that the system stores information about failing uplinks, as well as succesful uplink. This is very useful for network modeling.",
    status: "Broken by V3 update",
    imageUrl: "images/projects/map-the-things.jpg",
    lead: "Frank Leon Rose",
    nextSteps: [
      "Update to support TTN V3.",
      "Do more LoRa walking.",
      "Data re-processing tools.",
      "Improve scalability (Lambda + merging infrastructure like Kinesis or MR).",
      "Data slicing features.",
    ],
    links: {
      documentation: "",
      repositories: [
        "https://github.com/things-nyc/mapthethings-server",
        "https://github.com/things-nyc/mapthethings-ios",
        "https://github.com/things-nyc/mapthethings-arduino",
      ],
      website: "https://github.com/frankleonrose",
      extra: ["https://ttnmapper.org/", "https://map.thethings.nyc/"],
    },
  },
];
