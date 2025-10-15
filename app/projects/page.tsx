'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import styles from './cases.module.scss';
import Container from '../components/layout/container/container';
import Button from '../components/ui/button/button';
import ProjectCard from '../components/cards/project-card/project-card';
import Magnetic from '../components/ui/magnetic/magnetic';
import { useAutoPlayVideo } from '@/app/hooks/useAutoPlayVideo';

const categories = [
  'All',
  'Full-Circle',
  'BrandBook',
  'Landing page',
  'Website',
  'Platform',
  '2D/3D Motion',
  'Production',
  'Development',
];

const cases = [
  {
    id: 1,
    title: 'Acro Studio',
    category: 'Brandbook',
    description: 'Identity, Graphics',
    image: '/images/full-image.webp',
    slug: 'acro-studio',
  },
  {
    id: 2,
    title: 'CreativePro',
    category: 'Brandbook',
    description: 'Branding, Strategy',
    image: '/images/case-img-1.webp',
    slug: 'creative-pro',
  },
  {
    id: 3,
    title: 'E-Commerce Hub',
    category: 'Website',
    description: 'E-commerce, Web Development',
    image: '/images/case-img-2.webp',
    slug: 'ecommerce-hub',
  },
  {
    id: 4,
    title: 'InnovateApp',
    category: 'Platform',
    description: 'React, Next.js, UI/UX',
    image: '/images/case-img-3.webp',
    slug: 'innovate-app',
  },
  {
    id: 5,
    title: 'Acro Studio',
    category: 'Website',
    description: 'UX/UI, Art Direction, Content',
    image: '/images/full-image.webp',
    slug: 'acro-studio',
  },
  {
    id: 6,
    title: 'CreativePro',
    category: 'Brandbook',
    description: 'Branding, Strategy',
    image: '/images/case-img-1.webp',
    slug: 'creative-pro',
  },
  {
    id: 7,
    title: 'E-Commerce Hub',
    category: 'Website',
    description: 'E-commerce, Web Development',
    image: '/images/case-img-2.webp',
    slug: 'ecommerce-hub',
  },
  {
    id: 8,
    title: 'InnovateApp',
    category: 'Platform',
    description: 'React, Next.js, UI/UX',
    image: '/images/case-img-3.webp',
    slug: 'innovate-app',
  },
];

export default function Cases() {
  const container = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const videoRef = useRef<HTMLVideoElement>(null);

  useAutoPlayVideo(videoRef);

  const filteredCases =
    activeCategory === 'All'
      ? cases
      : cases.filter(
          (c) =>
            c.category.toLowerCase().trim() ===
            activeCategory.toLowerCase().trim(),
        );

  useGSAP(
    () => {
      gsap.from('.title-inner-row', {
        yPercent: 100,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 1,
      });

      gsap.from('.category-item', {
        alpha: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 1.5,
      });

      gsap.from('.line', {
        delay: 2,
        width: 0,
        duration: 3,
        ease: 'power3.out',
      });

      gsap.from('.video', {
        rotate: 360,
        duration: 30,
      });
    },
    { scope: container },
  );

  return (
    <section className={styles.section} ref={container} data-header-white>
      <Container>
        <div className={styles.header}>
          <Magnetic strength={40} className={styles.videoWrap}>
            <video
              className={clsx(styles.video, ['video'])}
              autoPlay
              loop
              muted
              playsInline
              preload={'auto'}
              ref={videoRef}
            >
              <source src="/videos/Cube.mp4" type="video/mp4; codecs=hvc1" />
              <source src="/videos/Cube.webm" type="video/webm" />
            </video>
          </Magnetic>
          <span
            className={`${styles.label} section-label section-label--white`}
          >
            Our works
          </span>
          <h1 className={`${styles.title} h1`}>
            <span className={styles.titleRow}>
              <span className={clsx(styles.titleInnerRow, 'title-inner-row')}>
                projects
              </span>
            </span>
            <span className={styles.titleRow}>
              <span className={clsx(styles.titleInnerRow, 'title-inner-row')}>
                BUILT TO LAST
              </span>
            </span>
          </h1>

          <ul className={styles.categoriesList}>
            {categories.map((category) => (
              <li
                key={category}
                className={clsx(styles.categoryItem, 'category-item')}
              >
                <Button
                  variant="outline-white"
                  className={`${styles.categoryLink} ${
                    activeCategory === category ? styles.active : ''
                  }`}
                  onClick={() => {
                    console.log(`Clicked category: ${category}`);
                    setActiveCategory(category);
                  }}
                >
                  {category}
                </Button>
              </li>
            ))}
          </ul>

          <div className={clsx(styles.line, 'line')}></div>
        </div>

        <ul className={styles.list}>
          {filteredCases.length > 0 ? (
            filteredCases.map((c) => (
              <li key={c.id} className={styles.caseItem}>
                <ProjectCard
                  slug={c.slug}
                  title={c.title}
                  category={c.category}
                  description={c.description}
                  image={c.image}
                />
              </li>
            ))
          ) : (
            <p className={styles.noResults}>
              No cases found for this category.
            </p>
          )}
        </ul>
      </Container>
    </section>
  );
}
