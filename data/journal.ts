export type JournalCategory = "All" | "Collaborations" | "People" | "Pottery" | "News";

export type JournalArticle = {
  slug: string;
  title: string;
  category: Exclude<JournalCategory, "All">;
  image: string;
  excerpt: string;
};

const media = (fileName: string) => `/media/${fileName}`;

export const journalCategories: JournalCategory[] = [
  "All",
  "Collaborations",
  "People",
  "Pottery",
  "News"
];

export const journalArticles: JournalArticle[] = [
  {
    slug: "sustainable-art-how-ceramics-contribute-to-eco-friendly-practices",
    title: "Sustainable Art: How Ceramics Contribute to Eco-Friendly Practices",
    category: "News",
    image: media("6a2680f03f3745a0ac723d9c_Journal_placeholder06.jpg"),
    excerpt:
      "Material choices, slower production, and long-lasting forms make ceramics a thoughtful part of responsible homeware."
  },
  {
    slug: "the-beauty-of-handmade-why-ceramic-crafts-are-gaining-popularity",
    title: "The Beauty of Handmade: Why Ceramic Crafts Are Gaining Popularity",
    category: "Pottery",
    image: media("6a2680f03f3745a0ac723d9b_Journal_placeholder05.jpg"),
    excerpt:
      "Handmade ceramics are gaining momentum because buyers can feel the care, variation, and story in every piece."
  },
  {
    slug: "reviving-ancient-techniques-a-new-wave-in-traditional-pottery-making",
    title: "Reviving Ancient Techniques: A New Wave in Traditional Pottery Making",
    category: "Pottery",
    image: media("6576f7f6b14eb68a7d6250e0_Journal_placeholder04.jpg"),
    excerpt:
      "Traditional techniques continue to evolve as artisans apply old knowledge to contemporary tableware needs."
  },
  {
    slug: "from-earth-to-art-the-journey-of-clay-in-creating-stunning-ceramics",
    title: "From Earth to Art: The Journey of Clay in Creating Stunning Ceramics",
    category: "News",
    image: media("6a2680f03f3745a0ac723d9a_Journal_placeholder03.jpg"),
    excerpt:
      "Clay passes through patient hands, fire, finishing, and inspection before becoming a durable object for daily use."
  },
  {
    slug: "modern-ceramics-how-contemporary-artists-are-reshaping-an-ancient-craft",
    title: "Modern Ceramics: How Contemporary Artists Are Reshaping an Ancient Craft",
    category: "News",
    image: media("6a2680f03f3745a0ac723d99_Journal_placeholder02.jpg"),
    excerpt:
      "Contemporary makers are expanding the language of ceramics while keeping the craft rooted in material honesty."
  },
  {
    slug: "the-art-of-fire-and-clay-exploring-the-timeless-tradition-of-ceramics",
    title: "The Art of Fire and Clay: Exploring the Timeless Tradition of Ceramics",
    category: "Collaborations",
    image: media("6a2680f03f3745a0ac723d98_Journal_placeholder01.jpg"),
    excerpt:
      "The relationship between fire, clay, and the maker gives ceramics its enduring rhythm and expressive range."
  }
];

export function getArticleBySlug(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string) {
  if (category.toLowerCase() === "all") return journalArticles;

  return journalArticles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
}
