"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ProductImage } from "@/data/products";

type LightboxGeometry = {
  source: LightboxRect;
  target: LightboxRect;
  translateX: number;
  translateY: number;
  scaleX: number;
  scaleY: number;
};

type LightboxRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type ActiveLightbox = {
  alt: string;
  displaySrc: string;
  fullSrc: string;
  geometry: LightboxGeometry;
  id: number;
};

type ProductImageLightboxGalleryProps = {
  images: ProductImage[];
  productName: string;
};

function formatSrcSet(image: ProductImage) {
  return image.srcSet?.map((item) => `${item.src} ${item.width}w`).join(", ");
}

function getFullResolutionSource(image: ProductImage) {
  if (!image.srcSet?.length) return image.src;

  const largestSrcSetImage = image.srcSet.reduce((largest, item) =>
    item.width > largest.width ? item : largest
  );

  return largestSrcSetImage.src;
}

function snapToDevicePixel(value: number) {
  const pixelRatio = window.devicePixelRatio || 1;

  return Math.round(value * pixelRatio) / pixelRatio;
}

function readRect(rect: DOMRect): LightboxRect {
  return {
    height: Math.max(snapToDevicePixel(rect.height), 1),
    left: snapToDevicePixel(rect.left),
    top: snapToDevicePixel(rect.top),
    width: Math.max(snapToDevicePixel(rect.width), 1)
  };
}

function getCenteredTargetRect(source: LightboxRect): LightboxRect {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const gutter = Math.max(20, Math.min(viewportWidth * 0.045, 64));
  const availableWidth = viewportWidth - gutter * 2;
  const availableHeight = viewportHeight - gutter * 2;
  const aspectRatio = source.width / source.height || 1;

  let targetWidth = availableWidth;
  let targetHeight = targetWidth / aspectRatio;

  if (targetHeight > availableHeight) {
    targetHeight = availableHeight;
    targetWidth = targetHeight * aspectRatio;
  }

  return {
    height: snapToDevicePixel(targetHeight),
    left: snapToDevicePixel((viewportWidth - targetWidth) / 2),
    top: snapToDevicePixel((viewportHeight - targetHeight) / 2),
    width: snapToDevicePixel(targetWidth)
  };
}

function getLightboxGeometry(source: LightboxRect): LightboxGeometry {
  const target = getCenteredTargetRect(source);

  return {
    source,
    target,
    translateX: target.left - source.left,
    translateY: target.top - source.top,
    scaleX: target.width / source.width,
    scaleY: target.height / source.height
  };
}

export function ProductImageLightboxGallery({
  images,
  productName
}: ProductImageLightboxGalleryProps) {
  const [activeLightbox, setActiveLightbox] = useState<ActiveLightbox | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitionLocked, setIsTransitionLocked] = useState(false);
  const closingTimer = useRef<number | null>(null);
  const imageRefs = useRef<Record<number, HTMLImageElement | null>>({});
  const isClosingRef = useRef(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const galleryImages = useMemo(() => (images.length ? images : []), [images]);
  const isLightboxMounted = activeLightbox !== null;

  const clearClosingTimer = useCallback(() => {
    if (closingTimer.current) {
      window.clearTimeout(closingTimer.current);
      closingTimer.current = null;
    }
  }, []);

  const getSourceRect = useCallback((index: number, fallbackElement?: HTMLElement | null) => {
    const sourceElement = triggerRefs.current[index] ?? imageRefs.current[index] ?? fallbackElement;

    return sourceElement ? readRect(sourceElement.getBoundingClientRect()) : null;
  }, []);

  const closeLightbox = useCallback(() => {
    if (!activeLightbox || isClosingRef.current) return;

    isClosingRef.current = true;
    clearClosingTimer();
    setIsTransitionLocked(true);

    const source = getSourceRect(activeLightbox.id) ?? activeLightbox.geometry.source;

    setActiveLightbox((current) =>
      current
        ? {
            ...current,
            geometry: getLightboxGeometry(source)
          }
        : current
    );

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsTransitionLocked(false);

        window.requestAnimationFrame(() => {
          setIsOpen(false);

          closingTimer.current = window.setTimeout(() => {
            setActiveLightbox(null);
            openerRef.current?.focus({ preventScroll: true });
            isClosingRef.current = false;
            openerRef.current = null;
            closingTimer.current = null;
          }, 360);
        });
      });
    });
  }, [activeLightbox, clearClosingTimer, getSourceRect]);

  const openLightbox = useCallback(
    (event: MouseEvent<HTMLButtonElement>, image: ProductImage, index: number) => {
      const img = imageRefs.current[index] ?? event.currentTarget.querySelector("img");

      if (!img) return;

      const source = getSourceRect(index, event.currentTarget);
      const fullSrc = getFullResolutionSource(image);

      if (!source) return;

      openerRef.current = event.currentTarget;
      isClosingRef.current = false;
      clearClosingTimer();
      setIsOpen(false);
      setIsTransitionLocked(false);
      setActiveLightbox({
        alt: image.alt || productName,
        displaySrc: img instanceof HTMLImageElement ? img.currentSrc || image.src : image.src,
        fullSrc,
        geometry: getLightboxGeometry(source),
        id: index
      });

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsOpen(true);
          closeButtonRef.current?.focus({ preventScroll: true });
        });
      });
    },
    [clearClosingTimer, getSourceRect, productName]
  );

  useLayoutEffect(() => {
    if (!isLightboxMounted) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLightboxMounted]);

  useEffect(() => {
    if (!activeLightbox) return;

    let cancelled = false;
    const loader = new Image();

    loader.decoding = "async";
    loader.src = activeLightbox.fullSrc;

    const markLoaded = () => {
      if (cancelled || isClosingRef.current) return;
      setActiveLightbox((current) =>
        current?.id === activeLightbox.id
          ? {
              ...current,
              displaySrc: activeLightbox.fullSrc
            }
          : current
      );
    };

    if (loader.decode) {
      loader.decode().then(markLoaded).catch(markLoaded);
    } else {
      loader.onload = markLoaded;
      loader.onerror = markLoaded;
    }

    return () => {
      cancelled = true;
    };
  }, [activeLightbox?.fullSrc, activeLightbox?.id]);

  useEffect(() => {
    if (!activeLightbox || !isOpen) return;

    const syncGeometry = () => {
      const source = getSourceRect(activeLightbox.id);

      if (!source) return;

      setIsTransitionLocked(true);
      setActiveLightbox((current) =>
        current
          ? {
              ...current,
              geometry: getLightboxGeometry(source)
            }
          : current
      );

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setIsTransitionLocked(false));
      });
    };

    window.addEventListener("resize", syncGeometry);
    return () => window.removeEventListener("resize", syncGeometry);
  }, [activeLightbox, getSourceRect, isOpen]);

  useEffect(() => {
    if (!isLightboxMounted) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, isLightboxMounted]);

  useEffect(() => {
    return clearClosingTimer;
  }, [clearClosingTimer]);

  const lightboxStyle = activeLightbox
    ? ({
        "--lightbox-source-left": `${activeLightbox.geometry.source.left}px`,
        "--lightbox-source-top": `${activeLightbox.geometry.source.top}px`,
        "--lightbox-source-width": `${activeLightbox.geometry.source.width}px`,
        "--lightbox-source-height": `${activeLightbox.geometry.source.height}px`,
        "--lightbox-translate-x": `${activeLightbox.geometry.translateX}px`,
        "--lightbox-translate-y": `${activeLightbox.geometry.translateY}px`,
        "--lightbox-scale-x": activeLightbox.geometry.scaleX,
        "--lightbox-scale-y": activeLightbox.geometry.scaleY
      } as CSSProperties)
    : undefined;

  return (
    <>
      <div className="product-images" id="layout-node-_4bd72972-e414-4f87-d380-294bea47f68b-ac723d3b">
        {galleryImages.map((image, index) => {
          const isActiveSource = activeLightbox?.id === index;
          const imageElement = (
            <button
              aria-label={`Enlarge ${image.alt || productName}`}
              className={`product-gallery-image-trigger${isActiveSource ? " is-lightbox-source" : ""}`}
              onClick={(event) => openLightbox(event, image, index)}
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
              type="button"
            >
              <img
                alt={image.alt || productName}
                className="product-image-full"
                loading={index === 0 ? "eager" : "lazy"}
                ref={(element) => {
                  imageRefs.current[index] = element;
                }}
                sizes="(max-width: 991px) 100vw, 50vw"
                src={image.src}
                srcSet={formatSrcSet(image)}
              />
            </button>
          );

          if (index === 0) {
            return (
              <div className="product-images-item" key={`${image.src}-${index}`}>
                {imageElement}
              </div>
            );
          }

          if (index === 1) {
            return (
              <div className="product-images-container collection-list collection-items-repeater-ref" key="gallery-list">
                <div className="product-images-list collection-items" role="list">
                  {galleryImages.slice(1).map((nestedImage, nestedIndex) => (
                    <div
                      className="product-images-item collection-item collection-repeater-item"
                      key={`${nestedImage.src}-${nestedIndex + 1}`}
                      role="listitem"
                    >
                      <button
                        aria-label={`Enlarge ${nestedImage.alt || productName}`}
                        className={`product-gallery-image-trigger${
                          activeLightbox?.id === nestedIndex + 1 ? " is-lightbox-source" : ""
                        }`}
                        onClick={(event) => openLightbox(event, nestedImage, nestedIndex + 1)}
                        ref={(element) => {
                          triggerRefs.current[nestedIndex + 1] = element;
                        }}
                        type="button"
                      >
                        <img
                          alt={nestedImage.alt || productName}
                          className="product-image-full"
                          loading="lazy"
                          ref={(element) => {
                            imageRefs.current[nestedIndex + 1] = element;
                          }}
                          sizes="(max-width: 991px) 100vw, 50vw"
                          src={nestedImage.src}
                          srcSet={formatSrcSet(nestedImage)}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="is-hidden empty-state">
                  <div>No items found.</div>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>

      {activeLightbox ? (
        <div
          aria-label={`${activeLightbox.alt} enlarged image`}
          aria-modal="true"
          className={`product-lightbox${isOpen ? " is-open" : ""}${
            isTransitionLocked ? " is-transition-locked" : ""
          }`}
          role="dialog"
          style={lightboxStyle}
        >
          <button
            aria-label="Close enlarged product image"
            className="product-lightbox-backdrop"
            onClick={closeLightbox}
            type="button"
          />
          <div className="product-lightbox-image-shell">
            <img
              alt={activeLightbox.alt}
              className="product-lightbox-image"
              draggable={false}
              sizes="100vw"
              src={activeLightbox.displaySrc}
            />
          </div>
          <button
            aria-label="Close enlarged product image"
            className="product-lightbox-close"
            onClick={closeLightbox}
            ref={closeButtonRef}
            type="button"
          >
            X
          </button>
        </div>
      ) : null}
    </>
  );
}
