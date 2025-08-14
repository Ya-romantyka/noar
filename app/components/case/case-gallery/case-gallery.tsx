"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./case-gallery.module.scss";
import Container from "../../layout/container/container";
import Image from "next/image";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";

gsap.registerPlugin(ScrollTrigger);

interface CaseGalleryProps {
  label: string;
  title: React.ReactNode;
  images: string[];
}

const CaseGallery: React.FC<CaseGalleryProps> = ({ label, title, images }) => {
  let galleryClass = '';

  const galleryRef = useRef<HTMLUListElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  switch (images.length) {
    case 1:
      galleryClass = styles.gallery1;
      break;
    case 2:
      galleryClass = styles.gallery2;
      break;
    case 3:
      galleryClass = styles.gallery3;
      break;
    case 4:
      galleryClass = styles.gallery4;
      break;
    case 5:
      galleryClass = styles.gallery5;
      break;
    default:
      galleryClass = styles.galleryDefault;
  }



  useEffect(() => {
    if (!galleryRef.current) return;
    const img = galleryRef.current.querySelector("li:nth-child(3) img");
    if (!img) return;

    gsap.fromTo(
        img,
        { y: "10%", scale: 1.2 },
        {
          y: "-10%",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
    );

    ScrollTrigger.refresh();
  }, []);

  useSplitTextAnimation(titleRef, {triggerOnScroll: true})

  return (
      <section className={styles.section} data-header-white>
        <Container className={styles.container}>
          <div className={styles.header}>
          <span className={clsx(styles.label, "section-label section-label--white")}>
            {label}
          </span>
            <h2 ref={titleRef} className={styles.title}>{title}</h2>
          </div>
          <ul className={clsx(styles.images, galleryClass)} ref={galleryRef}>
            {images.map((image, index) => (
                <li className={styles.item} key={index}>
                  <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      priority={true}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.image}
                  />
                </li>
            ))}
          </ul>
        </Container>
      </section>
  );
};

export default CaseGallery;
