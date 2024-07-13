export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Dashboard",
  },
  {
    imgURL: "/icons/discover.svg",
    route: "/discover",
    label: "Discover",
  },
  {
    imgURL: "/icons/watch.svg",
    route: "/course",
    label: "Course",
  },
  {
    imgURL: "/icons/watch.svg",
    route: "/favorite",
    label: "Favorite",
  },
  {
    imgURL: "/icons/watch.svg",
    route: "/note",
    label: "Note",
  },
  {
    route: "/profile",
    label: "Profile",
    imgURL: "/icons/profile.svg",
  },
  {
    route: "/plans",
    label: "Plan",
    imgURL: "/icons/profile.svg",
  },
];

export const voiceDetails = [
  {
    id: 1,
    name: "alloy",
  },
  {
    id: 2,
    name: "echo",
  },
  {
    id: 3,
    name: "fable",
  },
  {
    id: 4,
    name: "onyx",
  },
  {
    id: 5,
    name: "nova",
  },
  {
    id: 6,
    name: "shimmer",
  },
];

export const pricingPlans = [
  {
    // Name of the pricing plan.
    name: "Free",
    // Monthly price of the plan as a string.
    monthlyPrice: "0",
    // Annual price of the plan as a string, representing cost per month when billed annually.
    annualPrice: "0",
    // A short description for your pricing table
    description:
      "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to get started and explore the platform.",
    // Tailwind CSS classes for styling the card's background.
    cardBgClass: "bg-[#0003] backdrop-blur-3xl",
    // Tailwind CSS classes for styling the button within the card.
    buttonClass: "text-white-1 bg-[#ffffff1a] hover:bg-[#ffffff0d] ",
    // Array of features included in the plan.
    features: [
    ],
    // Array of features not available in the plan.
    unavailableFeatures: [
    ],
  },
  {
    name: "Pro",
    monthlyPrice: "15",
    annualPrice: "10",
    description:
      "If you're a small business or a startup, this plan is designed to cater to your needs. It offers a balance of essential features.",
    cardBgClass: "bg-[#00000080] backdrop-blur-3xl",
    buttonClass:
      "text-black-1 bg-[#ffffff] hover:bg-[#ffffff0d] hover:text-white-1 ",
    features: [
    ],
    unavailableFeatures: [
    ],
  },
];