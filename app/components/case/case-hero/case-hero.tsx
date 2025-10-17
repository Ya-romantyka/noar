'use client';

import styles from './case-hero.module.scss';
import Container from '../../layout/container/container';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import useSplitTextAnimation from '@/app/hooks/useSplitTextAnimation';

gsap.registerPlugin(SplitText);

interface CaseHeroProps {
  background: string;
  color: string;
  category: string;
  title: string;
  description: string;
  client: string;
  services: string[];
  duration: string;
  year: string;
  headerColor?: string;
}

const CaseHero: React.FC<CaseHeroProps> = ({
  background,
  color,
  category,
  title,
  description,
  client,
  services,
  duration,
  year,
  headerColor,
}) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  useSplitTextAnimation(titleRef, { delay: 1 });
  useSplitTextAnimation(descriptionRef, { delay: 1.5 });

  useEffect(() => {
    if (listContainerRef.current) {
      const ulElements = listContainerRef.current.querySelectorAll('ul');

      ulElements.forEach((ul) => {
        const items = ul.querySelectorAll('li');

        gsap.fromTo(
          items,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            delay: 2.5,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.3,
          },
        );
      });
    }
  }, []);

  return (
    <section
      className={styles.section}
      style={{ backgroundColor: background, color }}
      data-header-white={headerColor === 'data-header-white' ? true : undefined}
      data-header-transparent={
        headerColor !== 'data-header-white' ? true : undefined
      }
    >
      <Container className={styles.container}>
        <div className={styles.col}>
          <span className={styles.category} style={{ color }}>
            {category}
          </span>
          <h1 className={styles.title} ref={titleRef}>
            {title}
          </h1>
          <p className={styles.description} ref={descriptionRef}>
            {description}
          </p>
        </div>
        <div className={styles.col}>
          <div className={styles.innerRow} ref={listContainerRef}>
            <div className={styles.innerCol}>
              <p className={styles.label}>Client</p>
              <ul className={styles.list}>
                <li>{client}</li>
              </ul>
            </div>
            <div className={styles.innerCol}>
              <p className={styles.label}>Services</p>
              <ul className={styles.list}>
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div className={styles.innerCol}>
              <p className={styles.label}>Duration, Year</p>
              <ul className={styles.list}>
                <li>{duration}</li>
                <li>{year}</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CaseHero;
