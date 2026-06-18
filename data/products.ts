export type ProductImage = {
  alt: string;
  src: string;
  srcSet?: Array<{ src: string; width: number }>;
};

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  collection: string;
  image: ProductImage;
  imageShape?: "square" | "vertical";
  cardClassName?: string;
  description: string;
  details: string[];
  size: string;
  color: string;
  usage: string;
};

const media = (fileName: string) => `/media/${fileName}`;

export const products: Product[] = [
  {
    slug: "whimsy-candle-holder",
    name: "Whimsy Candle Holder",
    categorySlug: "whispering-earth",
    categoryName: "Whispering Earth",
    collection: "Latest",
    image: {
      alt: "Whimsy Candle Holder",
      src: media("6a2680f03f3745a0ac723d95_Product_placeholder_image_09.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d95_Product_placeholder_image_09-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d95_Product_placeholder_image_09-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d95_Product_placeholder_image_09.jpg"), width: 933 }
      ]
    },
    description:
      "A hand-finished candle holder suited for boutique homeware edits and seasonal gifting sets.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 18 x 18 x 24 cm.",
      "Suitable for home decor, retail displays, and seasonal assortments.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "18 x 18 x 24 cm",
    color: "Ivory White",
    usage: "Decorative ceramic candle holder for home decor and seasonal gifting."
  },
  {
    slug: "eclipse-coffee-cup",
    name: "Eclipse Coffee Cup",
    categorySlug: "sunrise-symphony",
    categoryName: "Sunrise Symphony",
    collection: "Latest",
    image: {
      alt: "Eclipse Coffee Cup",
      src: media("6a2680f03f3745a0ac723d7b_Product_placeholder_image_06.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d7b_Product_placeholder_image_06-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d7b_Product_placeholder_image_06-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d7b_Product_placeholder_image_06.jpg"), width: 933 }
      ]
    },
    description:
      "A stackable cup profile for cafe programs, hospitality buyers, and high-turn beverage service.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 9 x 9 x 8 cm.",
      "Capacity: 200 ml.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "9 x 9 x 8 cm",
    color: "Soft Beige",
    usage: "Stackable ceramic coffee cup for cafe sets and hospitality programs."
  },
  {
    slug: "harmony-dinner-plate",
    name: "Harmony Dinner Plate",
    categorySlug: "sunrise-symphony",
    categoryName: "Sunrise Symphony",
    collection: "Latest",
    image: {
      alt: "Harmony Dinner Plate",
      src: media("6a2680f03f3745a0ac723d96_Product_placeholder_image_10.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d96_Product_placeholder_image_10-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d96_Product_placeholder_image_10-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d96_Product_placeholder_image_10.jpg"), width: 933 }
      ]
    },
    description:
      "A full-size dinner plate designed for complete tableware ranges and hotel dining collections.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 27 x 27 x 3 cm.",
      "Designed for hospitality tableware and retail dinnerware ranges.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "27 x 27 x 3 cm",
    color: "Matte Sand",
    usage: "Full-size ceramic dinner plate for tableware ranges and hotel dining."
  },
  {
    slug: "aurora-tea-mug",
    name: "Aurora Tea Mug",
    categorySlug: "sunrise-symphony",
    categoryName: "Sunrise Symphony",
    collection: "Latest",
    image: {
      alt: "Aurora Tea Mug",
      src: media("6576f14bb6f27bd61de934d9_Product_placeholder_image_01.jpg")
    },
    description:
      "A rounded tea mug with strong gifting appeal and flexible sizing for curated beverage sets.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 11 x 11 x 9 cm.",
      "Capacity: 250 ml.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "11 x 11 x 9 cm",
    color: "Ocean Blue",
    usage: "Rounded ceramic tea mug for gifting sets and beverage collections."
  },
  {
    slug: "celestial-serving-platter",
    name: "Celestial Serving Platter",
    categorySlug: "mystic-garden",
    categoryName: "Mystic Garden",
    collection: "Latest",
    image: {
      alt: "Celestial Serving Platter",
      src: media("6a2680f03f3745a0ac723d78_Product_placeholder_image_02.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d78_Product_placeholder_image_02-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d78_Product_placeholder_image_02-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d78_Product_placeholder_image_02-p-1080.jpg"), width: 1080 },
        { src: media("6a2680f03f3745a0ac723d78_Product_placeholder_image_02.jpg"), width: 1200 }
      ]
    },
    description:
      "A serving platter for tabletop capsule collections, restaurant settings, and premium gifting.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 32 x 22 x 4 cm.",
      "Ideal for tabletop capsules and hospitality presentation.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "32 x 22 x 4 cm",
    color: "Warm White",
    usage: "Ceramic serving platter for tabletop capsules and restaurant sets."
  },
  {
    slug: "cascade-water-pitcher",
    name: "Cascade Water Pitcher",
    categorySlug: "rustic-elegance",
    categoryName: "Rustic Elegance",
    collection: "Latest",
    image: {
      alt: "Cascade Water Pitcher",
      src: media("6a2680f03f3745a0ac723d97_Placeholder_image_09.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d97_Placeholder_image_09-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d97_Placeholder_image_09-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d97_Placeholder_image_09-p-1080.jpg"), width: 1080 },
        { src: media("6a2680f03f3745a0ac723d97_Placeholder_image_09.jpg"), width: 1600 }
      ]
    },
    description:
      "A sculptural water pitcher designed for hospitality service and statement homeware shelves.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 14 x 14 x 26 cm.",
      "Designed for tabletop service and display.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "14 x 14 x 26 cm",
    color: "Natural Clay",
    usage: "Ceramic water pitcher for hospitality service and display."
  },
  {
    slug: "nebula-salad-bowl",
    name: "Nebula Salad Bowl",
    categorySlug: "sunrise-symphony",
    categoryName: "Sunrise Symphony",
    collection: "Latest",
    image: {
      alt: "Nebula Salad Bowl",
      src: media("6a2680f03f3745a0ac723d94_Product_placeholder_image_08.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d94_Product_placeholder_image_08-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d94_Product_placeholder_image_08-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d94_Product_placeholder_image_08.jpg"), width: 933 }
      ]
    },
    description:
      "A statement serving bowl for tabletop capsule launches, restaurant groups, and premium gifting.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 25 x 25 x 10 cm.",
      "Suitable for retail capsules, restaurant sets, and gifting.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "25 x 25 x 10 cm",
    color: "Cloud Grey",
    usage: "Ceramic serving bowl for tabletop capsule collections and restaurant sets."
  },
  {
    slug: "meadow-dessert-plate",
    name: "Meadow Dessert Plate",
    categorySlug: "sunrise-symphony",
    categoryName: "Sunrise Symphony",
    collection: "Latest",
    image: {
      alt: "Meadow Dessert Plate",
      src: media("6a2680f03f3745a0ac723d7c_Product_placeholder_image_07.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d7c_Product_placeholder_image_07-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d7c_Product_placeholder_image_07-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d7c_Product_placeholder_image_07.jpg"), width: 933 }
      ]
    },
    description:
      "A compact dessert plate for cafe assortments, layered table settings, and retail gifting.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 19 x 19 x 2 cm.",
      "Designed for dessert service and layered table settings.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "19 x 19 x 2 cm",
    color: "Cream Speckle",
    usage: "Ceramic dessert plate for cafe assortments and retail gifting."
  },
  {
    slug: "serenity-soup-bowl",
    name: "Serenity Soup Bowl",
    categorySlug: "tranquil-ripples",
    categoryName: "Tranquil Ripples",
    collection: "Latest",
    image: {
      alt: "Serenity Soup Bowl",
      src: media("6a2680f03f3745a0ac723d7a_Product_placeholder_image_05.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d7a_Product_placeholder_image_05-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d7a_Product_placeholder_image_05-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d7a_Product_placeholder_image_05.jpg"), width: 933 }
      ]
    },
    description:
      "A deep bowl designed for restaurant programs, soup service, and cohesive tableware ranges.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 17 x 17 x 8 cm.",
      "Built for hospitality soup service and retail tableware ranges.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "17 x 17 x 8 cm",
    color: "River Stone",
    usage: "Ceramic soup bowl for restaurant programs and tableware ranges."
  },
  {
    slug: "eden-flower-vase",
    name: "Eden Flower Vase",
    categorySlug: "whispering-earth",
    categoryName: "Whispering Earth",
    collection: "Latest",
    image: {
      alt: "Eden Flower Vase",
      src: media("6a2680f03f3745a0ac723d79_Product_placeholder_image_03.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d79_Product_placeholder_image_03-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d79_Product_placeholder_image_03-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d79_Product_placeholder_image_03.jpg"), width: 933 }
      ]
    },
    description:
      "A decorative vase silhouette tailored for retail feature tables, florist partners, and home accents.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 16 x 16 x 30 cm.",
      "Suitable for floral styling, retail display, and home accents.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "16 x 16 x 30 cm",
    color: "Sage Green",
    usage: "Decorative ceramic flower vase for retail display and home accents."
  },
  {
    slug: "luna-snack-plate",
    name: "Luna Snack Plate",
    categorySlug: "whispering-earth",
    categoryName: "Whispering Earth",
    collection: "Latest",
    image: {
      alt: "Luna Snack Plate",
      src: media("6a2680f03f3745a0ac723dbe_Product_placeholder_image_04.jpg")
    },
    description:
      "A compact ceramic snack plate for amenity trays, tasting menus, and curated retail assortments.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 15 x 15 x 2 cm.",
      "Designed for snack service, tasting flights, and hospitality amenities.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "15 x 15 x 2 cm",
    color: "Moon White",
    usage: "Compact ceramic snack plate for hospitality amenities and retail assortments."
  },
  {
    slug: "solstice-espresso-cup",
    name: "Solstice Espresso Cup",
    categorySlug: "sunrise-symphony",
    categoryName: "Sunrise Symphony",
    collection: "Latest",
    image: {
      alt: "Solstice Espresso Cup",
      src: media("6a2680f03f3745a0ac723d7b_Product_placeholder_image_06.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d7b_Product_placeholder_image_06-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d7b_Product_placeholder_image_06-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d7b_Product_placeholder_image_06.jpg"), width: 933 }
      ]
    },
    description:
      "A refined espresso cup for specialty roasters, boutique cafes, and premium hospitality service.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 7 x 7 x 6 cm.",
      "Capacity: 80 ml.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "7 x 7 x 6 cm",
    color: "Charcoal",
    usage: "Ceramic espresso cup for specialty cafes and hospitality programs."
  },
  {
    slug: "terra-bread-plate",
    name: "Terra Bread Plate",
    categorySlug: "rustic-elegance",
    categoryName: "Rustic Elegance",
    collection: "Latest",
    image: {
      alt: "Terra Bread Plate",
      src: media("6a2680f03f3745a0ac723d96_Product_placeholder_image_10.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d96_Product_placeholder_image_10-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d96_Product_placeholder_image_10-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d96_Product_placeholder_image_10.jpg"), width: 933 }
      ]
    },
    description:
      "A rustic bread plate suited for artisan bakery partnerships and farmhouse-style table settings.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 17 x 17 x 2 cm.",
      "Perfect for bread service, appetiser settings, and curated retail.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "17 x 17 x 2 cm",
    color: "Terracotta",
    usage: "Ceramic bread plate for artisan bakery programs and farmhouse dining."
  },
  {
    slug: "drift-sake-set",
    name: "Drift Sake Set",
    categorySlug: "tranquil-ripples",
    categoryName: "Tranquil Ripples",
    collection: "Latest",
    image: {
      alt: "Drift Sake Set",
      src: media("6a2680f03f3745a0ac723d94_Product_placeholder_image_08.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d94_Product_placeholder_image_08-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d94_Product_placeholder_image_08-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d94_Product_placeholder_image_08.jpg"), width: 933 }
      ]
    },
    description:
      "A minimalist sake set for Japanese dining concepts, curated bar programs, and premium gifting.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Tokkuri: 8 x 8 x 14 cm. Ochoko: 5 x 5 x 4 cm.",
      "Set includes 1 tokkuri and 2 ochoko.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "Set (Tokkuri + 2 Ochoko)",
    color: "Stone Grey",
    usage: "Ceramic sake set for dining concepts and premium gifting."
  },
  {
    slug: "bloom-incense-holder",
    name: "Bloom Incense Holder",
    categorySlug: "mystic-garden",
    categoryName: "Mystic Garden",
    collection: "Latest",
    image: {
      alt: "Bloom Incense Holder",
      src: media("6a2680f03f3745a0ac723d79_Product_placeholder_image_03.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d79_Product_placeholder_image_03-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d79_Product_placeholder_image_03-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d79_Product_placeholder_image_03.jpg"), width: 933 }
      ]
    },
    description:
      "A petal-shaped incense holder for wellness retailers, spa amenity sets, and home fragrance lines.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 12 x 12 x 3 cm.",
      "Designed for stick and cone incense.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "12 x 12 x 3 cm",
    color: "Petal Pink",
    usage: "Ceramic incense holder for wellness retail and spa amenity programs."
  },
  {
    slug: "cove-gravy-boat",
    name: "Cove Gravy Boat",
    categorySlug: "tranquil-ripples",
    categoryName: "Tranquil Ripples",
    collection: "Latest",
    image: {
      alt: "Cove Gravy Boat",
      src: media("6a2680f03f3745a0ac723d7a_Product_placeholder_image_05.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d7a_Product_placeholder_image_05-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d7a_Product_placeholder_image_05-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d7a_Product_placeholder_image_05.jpg"), width: 933 }
      ]
    },
    description:
      "A sculpted gravy boat for fine dining tableware programs and premium retail assortments.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 18 x 10 x 9 cm.",
      "Capacity: 300 ml.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "18 x 10 x 9 cm",
    color: "Pearl White",
    usage: "Ceramic gravy boat for fine dining tableware and premium retail."
  },
  {
    slug: "zenith-fruit-bowl",
    name: "Zenith Fruit Bowl",
    categorySlug: "whispering-earth",
    categoryName: "Whispering Earth",
    collection: "Latest",
    image: {
      alt: "Zenith Fruit Bowl",
      src: media("6a2680f03f3745a0ac723d95_Product_placeholder_image_09.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d95_Product_placeholder_image_09-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d95_Product_placeholder_image_09-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d95_Product_placeholder_image_09.jpg"), width: 933 }
      ]
    },
    description:
      "A wide-rim fruit bowl for kitchen countertop display, homeware collections, and retail staging.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 30 x 30 x 12 cm.",
      "Designed for countertop display and retail staging.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "30 x 30 x 12 cm",
    color: "Ivory White",
    usage: "Ceramic fruit bowl for countertop display and homeware collections."
  },
  {
    slug: "haven-spice-jar",
    name: "Haven Spice Jar",
    categorySlug: "rustic-elegance",
    categoryName: "Rustic Elegance",
    collection: "Latest",
    image: {
      alt: "Haven Spice Jar",
      src: media("6576f14bb6f27bd61de934d9_Product_placeholder_image_01.jpg")
    },
    description:
      "A lidded spice jar for gourmet retail, pantry styling, and artisan food packaging partnerships.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 8 x 8 x 10 cm.",
      "Airtight cork lid included.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "8 x 8 x 10 cm",
    color: "Warm Walnut",
    usage: "Ceramic spice jar for gourmet retail and artisan food packaging."
  },
  {
    slug: "opal-butter-dish",
    name: "Opal Butter Dish",
    categorySlug: "sunrise-symphony",
    categoryName: "Sunrise Symphony",
    collection: "Latest",
    image: {
      alt: "Opal Butter Dish",
      src: media("6a2680f03f3745a0ac723d7c_Product_placeholder_image_07.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d7c_Product_placeholder_image_07-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d7c_Product_placeholder_image_07-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d7c_Product_placeholder_image_07.jpg"), width: 933 }
      ]
    },
    description:
      "A covered butter dish for breakfast service sets, brunch tableware, and specialty retail.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 16 x 10 x 7 cm.",
      "Lid included for freshness.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "16 x 10 x 7 cm",
    color: "Opal Cream",
    usage: "Ceramic butter dish for breakfast service and specialty retail."
  },
  {
    slug: "ridge-oil-cruet",
    name: "Ridge Oil Cruet",
    categorySlug: "mystic-garden",
    categoryName: "Mystic Garden",
    collection: "Latest",
    image: {
      alt: "Ridge Oil Cruet",
      src: media("6a2680f03f3745a0ac723d78_Product_placeholder_image_02.jpg"),
      srcSet: [
        { src: media("6a2680f03f3745a0ac723d78_Product_placeholder_image_02-p-500.jpg"), width: 500 },
        { src: media("6a2680f03f3745a0ac723d78_Product_placeholder_image_02-p-800.jpg"), width: 800 },
        { src: media("6a2680f03f3745a0ac723d78_Product_placeholder_image_02-p-1080.jpg"), width: 1080 },
        { src: media("6a2680f03f3745a0ac723d78_Product_placeholder_image_02.jpg"), width: 1200 }
      ]
    },
    description:
      "A tapered oil cruet for restaurant table programmes, olive oil branding, and condiment sets.",
    details: [
      "High-quality ceramic, kiln-fired for durability.",
      "Dimensions: 7 x 7 x 18 cm.",
      "Capacity: 250 ml.",
      "Ships worldwide. Delivery times vary by location."
    ],
    size: "7 x 7 x 18 cm",
    color: "Forest Green",
    usage: "Ceramic oil cruet for restaurant tabletop and condiment sets."
  }
];

export const featuredProduct = products.find((product) => product.slug === "nebula-salad-bowl") ?? products[0];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getRelatedProducts(product: Product, count = 3) {
  return products
    .filter((item) => item.slug !== product.slug && item.categorySlug === product.categorySlug)
    .concat(products.filter((item) => item.slug !== product.slug && item.categorySlug !== product.categorySlug))
    .slice(0, count);
}
