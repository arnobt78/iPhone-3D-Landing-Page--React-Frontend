import {
  blackImg,
  blueImg,
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  whiteImg,
  yellowImg,
} from "../utils";

/** Top-level nav labels; rendered in Navbar. Add/remove strings to change nav items. */
export const navLists = ["Store", "Mac", "iPhone", "Support"];

/** One slide in the highlights carousel: id, text lines, video URL, and duration (for progress bar). */
export interface HighlightSlide {
  id: number;
  textLists: string[];
  video: string;
  videoDuration: number;
}

export const highlightsSlides: HighlightSlide[] = [
  {
    id: 1,
    textLists: [
      "Enter A17 Pro.",
      "Game‑changing chip.",
      "Groundbreaking performance.",
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ["Titanium.", "So strong. So light. So Pro."],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "iPhone 15 Pro Max has the",
      "longest optical zoom in",
      "iPhone ever. Far out.",
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["All-new Action button.", "What will yours do?."],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

/** One iPhone color option. color[0] is applied to body materials; img is used for the screen texture. */
export interface ModelItem {
  id: number;
  title: string;
  color: [string, string, string];
  img: string;
}

export const models: ModelItem[] = [
  {
    id: 1,
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  },
  {
    id: 2,
    title: "iPhone 15 Pro in Blue Titanium",
    color: ["#53596E", "#6395ff", "#21242e"],
    img: blueImg,
  },
  {
    id: 3,
    title: "iPhone 15 Pro in White Titanium",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    img: whiteImg,
  },
  {
    id: 4,
    title: "iPhone 15 Pro in Black Titanium",
    color: ["#454749", "#3b3b3b", "#181819"],
    img: blackImg,
  },
];

/** Display size for 3D model. value drives which view (small 6.1" / large 6.7") is visible. */
export interface SizeOption {
  label: string;
  value: "small" | "large";
}

export const sizes: SizeOption[] = [
  { label: '6.1"', value: "small" },
  { label: '6.7"', value: "large" },
];

/** Footer legal/site links; rendered in a row with separators. */
export const footerLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Sales Policy",
  "Legal",
  "Site Map",
];
