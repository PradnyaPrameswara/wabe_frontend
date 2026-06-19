export type Category = {
  slug: string;
  name: string;
  cta: string;
  image: string;
  description: string;
};

const media = (fileName: string) => `/media/${fileName}`;

export const categories: Category[] = [
  {
    slug: "rattan-2025",
    name: "Rattan 2025",
    cta: "Shop The Range",
    image: media("6a2680f03f3745a0ac723d7a_Product_placeholder_image_05.jpg"),
    description:
      "Handcrafted rattan pieces for authentic Balinese aesthetics and warm settings."
  },
  {
    slug: "terracotta-2025",
    name: "Terracotta 2025",
    cta: "Explore Collection",
    image: media("6a2680f03f3745a0ac723d95_Product_placeholder_image_09.jpg"),
    description:
      "Earthy textures and grounded profiles shaped for warm hospitality and home settings."
  },
  {
    slug: "sunrise-symphony",
    name: "Sunrise Symphony",
    cta: "Shop Now",
    image: media("6a2680f03f3745a0ac723da0_Catergoy_image_placeholder_05.jpg"),
    description:
      "Bright tableware pieces for daily rituals, cafe programs, and complete dining assortments."
  },
  {
    slug: "oceans-embrace",
    name: "Ocean's Embrace",
    cta: "Explore Collection",
    image: media("6a2680f03f3745a0ac723da1_Catergoy_image_placeholder_02.jpg"),
    description:
      "Fluid tones and coastal-inspired pieces for breezy homeware and resort edits."
  },
  {
    slug: "whispering-earth",
    name: "Whispering Earth",
    cta: "Discover Collection",
    image: media("6a2680f03f3745a0ac723da2_Catergoy_image_placeholder_06.jpg"),
    description:
      "Quiet organic forms for tactile merchandising, floral styling, and natural interiors."
  },
  {
    slug: "tranquil-ripples",
    name: "Tranquil Ripples",
    cta: "Shop Now",
    image: media("6a2680f03f3745a0ac723da3_Catergoy_image_placeholder_03.jpg"),
    description:
      "Soft, rounded ceramics designed for peaceful table settings and slow hospitality moments."
  }
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
