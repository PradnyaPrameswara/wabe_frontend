import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Fragment } from "react";

export const metadata = {
  title: "About | Widhi Asih Bali Export"
};

const storyBlocks = [
  {
    heading: "From a Family Workshop in Gianyar",
    image: "/media/6a2680f03f3745a0ac723d23_Placeholder_image_02.jpg",
    paragraphs: [
      "Widhi Asih Bali began as a small family workshop in Gianyar. Today, we partner with more than 100 local artisans to create pieces that carry Bali's cultural soul into contemporary spaces.",
      "Every knot in our rattan, every carve in our teak, and every hand-finished surface reflects a story of heritage, patience, and heart."
    ]
  },
  {
    heading: "Balinese Soul, Modern Sensibility",
    image: "/media/6a2680f03f3745a0ac723d29_Catergoy_image_placeholder_05.jpg",
    paragraphs: [
      "We believe craftsmanship should feel timeless, but never frozen. Our collections blend Balinese artistry with modern design sensibilities so each piece feels rooted in culture while remaining relevant for contemporary homes, villas, resorts, and hospitality spaces."
    ]
  },
  {
    heading: "Every Piece Carries Heritage and Heart",
    image: "/media/6a2680f03f3745a0ac723d2a_Placeholder_image_12.jpg",
    paragraphs: [
      "Every knot in our rattan, every carve in our teak, and every finish applied by hand reflects generations of knowledge carried forward by Bali's makers. We remain guided by respect for our artisans, pride in honest craftsmanship, and a commitment to creating pieces with soul."
    ]
  }
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <section className="section first">
        <div className="_3-column">
          {storyBlocks.map((block) => (
            <Fragment key={block.heading}>
              <div className="image-container vertical">
                <img alt="" className="image" loading="lazy" src={block.image} />
              </div>
              <div className="block outline about-story-copy">
                <h4>{block.heading}</h4>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
