import { Header } from "@/components/layout/Header";
import { StickyHeaderClient } from "@/components/layout/StickyHeaderClient";
import { site } from "@/data/site";

const heroSrc = "/media/6a2680f03f3745a0ac723d26_Placeholder_image_15.jpg";

export function HeroSection() {
  return (
    <>
      <div className="announcement">
        <div>{site.announcement}</div>
      </div>
      <div className="header">
        <div className="ticker white">
          <div className="ticker-inner">
            <div>{site.welcome}</div>
          </div>
          <div className="ticker-inner">
            <div>{site.welcome}</div>
          </div>
        </div>
        <img
          alt=""
          className="header-image"
          loading="lazy"
          sizes="100vw"
          src={heroSrc}
          srcSet={[
            "/media/6a2680f03f3745a0ac723d26_Placeholder_image_15-p-500.jpg 500w",
            "/media/6a2680f03f3745a0ac723d26_Placeholder_image_15-p-800.jpg 800w",
            "/media/6a2680f03f3745a0ac723d26_Placeholder_image_15-p-1080.jpg 1080w",
            `${heroSrc} 1600w`
          ].join(", ")}
        />
      </div>
      <div aria-hidden="true" id="sticky-header-marker" />
      <div className="home" id="sticky-header-anchor">
        <Header menuId="sticky-header-bar" />
      </div>
      <StickyHeaderClient />
    </>
  );
}
