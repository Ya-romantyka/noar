'use client';

// import { useTransitionRouter } from 'next-view-transitions';
import styles from './project-sticky-card.module.scss';
import React, { RefObject, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import clsx from 'clsx';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface ProjectStickyCardProps {
  name: string;
  year: string;
  frameworks: string[];
  img: string;
  url: string;
  headerRef?: RefObject<HTMLDivElement | null>;
}

const ProjectStickyCard = ({
  name,
  year,
  frameworks,
  img,
  url,
  headerRef,
}: ProjectStickyCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  // const router = useTransitionRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function slideInOut() {
    document.documentElement.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0.2, transform: 'translateY(-35%)' },
      ],
      {
        duration: 1500,
        easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
        fill: 'forwards',
        pseudoElement: '::view-transition-old(root)',
      },
    );

    document.documentElement.animate(
      [
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)' },
      ],
      {
        duration: 1500,
        easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
        fill: 'forwards',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  }

  return (
    <Link
      ref={cardRef}
      href={url}
      // onClick={(e) => { TODO: make scroll page up
      //   e.preventDefault();
      //   router.push(url, { onTransitionReady: slideInOut });
      // }}
      className={clsx(styles.card, 'card')}
    >
      <div className={styles.header} ref={headerRef}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.year}>{year}</p>
        <ul className={styles.list}>
          {frameworks.map((framework, index) => (
            <li key={index} className={styles.item}>
              {framework}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.imgWrapper}>
        <picture className={clsx(styles.image)}>
          <Image src={img} alt={name} fill />
        </picture>
      </div>
    </Link>
  );
};

export default ProjectStickyCard;
