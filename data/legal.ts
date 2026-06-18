export type LegalPage = {
  slug: string;
  title: string;
  sections: Array<{
    heading: string;
    body: string;
    items?: string[];
  }>;
};

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-and-cookies",
    title: "Privacy and Cookies",
    sections: [
      {
        heading: "Introduction",
        body:
          "At Widhi Asih Bali Export, your privacy is important to us. This policy explains how we collect, use, protect, and manage personal data when you visit our website."
      },
      {
        heading: "Data Collection and Use",
        body:
          "We collect personal information when you register, place an order, subscribe, or contact us.",
        items: [
          "Personal information may include name, email address, mailing address, phone number, company details, and transaction information.",
          "We use collected information to personalize the buying experience, process transactions, improve the website, and communicate about orders or services."
        ]
      },
      {
        heading: "Cookies",
        body:
          "Cookies help us remember preferences, understand site traffic, and keep cart and account experiences consistent."
      },
      {
        heading: "Contact Information",
        body: "Questions about privacy can be sent to help@widhiasihbaliexport.com."
      }
    ]
  },
  {
    slug: "returns-and-exchanges",
    title: "Returns and Exchanges",
    sections: [
      {
        heading: "Return Window",
        body:
          "Please contact our team within 14 days of receiving an order if items arrive damaged or do not match the confirmed order."
      },
      {
        heading: "Eligibility",
        body:
          "Returned items should be unused, in original packaging, and accompanied by order information.",
        items: [
          "Custom products may not be eligible for standard returns unless damaged or incorrectly produced.",
          "Photos and order references help us resolve claims quickly."
        ]
      },
      {
        heading: "Exchange Support",
        body:
          "For approved claims, we will coordinate replacements, credits, or other agreed remedies with the buyer."
      }
    ]
  },
  {
    slug: "shipping-and-handling",
    title: "Shipping and Handling",
    sections: [
      {
        heading: "Shipping",
        body:
          "We ship worldwide and coordinate delivery schedules based on order volume, destination, and product availability."
      },
      {
        heading: "Handling",
        body:
          "Orders are packed carefully for export, with handling standards suited to ceramic and handmade goods."
      },
      {
        heading: "Lead Times",
        body:
          "Lead times vary by product, production queue, customization needs, and destination. Final timelines are confirmed during quotation or checkout."
      }
    ]
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    sections: [
      {
        heading: "Website Use",
        body:
          "By using this website, you agree to use it for lawful purposes and to provide accurate account, order, and contact information."
      },
      {
        heading: "Orders",
        body:
          "Product availability, pricing, production timelines, shipping costs, and payment terms may be confirmed before a final B2B order is accepted."
      },
      {
        heading: "Custom Work",
        body:
          "Custom design requests may require additional confirmation, samples, deposits, or production approvals."
      }
    ]
  }
];

export function getLegalPageBySlug(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}
