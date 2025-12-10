import React from 'react';
import {useTransitionRouter} from 'next-view-transitions';

import Link from 'next/link';
import styles from './project-card.module.scss';

import dynamic from 'next/dynamic';
import {useIsMobile} from "@/app/hooks/useIsMobile";
import Image from "next/image";

const DistortedImage = dynamic(() => import('./distorted-image'), {
  ssr: false,
});

interface ProjectCardProps {
  slug: string;
  categories: string[];
  title: string;
  description: string;
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  slug,
  categories,
  title,
  description,
  image,
}) => {
  const router = useTransitionRouter();
  const isMobile = useIsMobile();

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
      href="/"
      className={styles.card}
      onClick={(e) => {
        e.preventDefault();
        router.push(`/projects/${slug}`, { onTransitionReady: slideInOut });
      }}
    >
      {!!categories.length && (
        <div className={styles.categories}>
          {categories.map((category, i) => (
            <span className={styles.category} key={i}>
              {category}
            </span>
          ))}
        </div>
      )}
      <div className={styles.image}>
        {isMobile ? (<Image src={image} alt={title} fill sizes={'100vw'}/>) : (
            <DistortedImage imageUrl={image} alt={title}/>
        )}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{description}</p>
    </Link>
  );
};

export default ProjectCard;
