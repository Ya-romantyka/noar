'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './about-principles.module.scss';
import Container from '@/app/components/layout/container/container';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExpandableText from '@/app/components/ui/expandable-text/expandable-text';
import AnimatedText from '@/app/components/ui/animated-text/animated-text';
import { useIsMobile } from '@/app/hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const circles = [
  { src: '/images/circle9.svg', rotate: -30 },
  { src: '/images/circle8.svg', rotate: 20 },
  { src: '/images/circle7.svg', rotate: -15 },
  { src: '/images/circle6.svg', rotate: 40 },
  { src: '/images/circle5.svg', rotate: -20 },
  { src: '/images/circle4.svg', rotate: 30 },
  { src: '/images/circle3.svg', rotate: -10 },
  { src: '/images/circle2.svg', rotate: 25 },
  { src: '/images/circle1.svg', rotate: -35 },
];

const AboutPrinciples: React.FC = () => {
  const circlesRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (!circlesRef.current || !lineRef.current || !titleRef.current) return;

    gsap.set(circlesRef.current.children, {
      rotation: (i) => circles[i].rotate,
    });

    const circlesTween = gsap.to(circlesRef.current.children, {
      rotation: 0,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: circlesRef.current,
        start: 'top 80%',
        end: isMobile ? 'center 20%' : 'center 40%',
        scrub: 3,
      },
    });
    const circlesST = circlesTween.scrollTrigger!;

    gsap.set(lineRef.current, { height: '0%' });

    const lineTween = gsap.to(lineRef.current, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: lineRef.current,
        start: 'top 65%',
        end: 'top 0%',
        scrub: 2,
      },
    });
    const lineST = lineTween.scrollTrigger!;

    gsap.set(titleRef.current, { y: '10%' });
    const titleTween = gsap.to(titleRef.current, {
      y: '-10%',
      ease: 'none',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 100%',
        end: 'bottom top',
        scrub: true,
      },
    });
    const titleST = titleTween.scrollTrigger!;

    return () => {
      circlesTween.kill();
      circlesST.kill();
      lineTween.kill();
      lineST.kill();
      titleTween.kill();
      titleST.kill();
    };
  }, [isMobile]);

  return (
    <section className={styles.section} data-header-white>
      <Container>
        <div ref={circlesRef} className={styles.circles}>
          {circles.map((circle, index) => (
            <Image
              key={index}
              src={circle.src}
              alt=""
              width={100}
              height={100}
            />
          ))}
        </div>

        <h2 className={`${styles.title} h2`} ref={titleRef}>
          <AnimatedText onScroll>
            Our greatest asset is our team of experts and trusted partners,
            delivering excellence at every stage. By merging creativity with
            technical expertise, we provide a comprehensive approach and
            flawless results in every project.
          </AnimatedText>
        </h2>

        <div className={styles.animWrapper}>
          <div ref={lineRef} className={styles.line} />
          <h3 className={styles.subtitle}>Approach</h3>
        </div>

        <ExpandableText
          animationDuration={{ desktop: '40s', mobile: '80s' }}
          popup={{
            title:
              'The noar philosophy stems from the principles of system sciences.',
            text: (
              <>
                <p className={styles.text}>
                  We offer more than just design or development, we provide a
                  product based on the unity of artifacts and user experience,
                  deep reflection of visual and activity perception, analysis of
                  the dynamics of semantic forms in their ability to create a
                  holistic image, as well as the reflection of the
                  project&apos;s integrative meanings in the product.
                </p>
                <p className={styles.text}>
                  The goal of noar is to provide comprehensive solutions based
                  on a detailed analysis of the product as an integral system,
                  taking into account the connections and unity of all its
                  structural elements, and arranging them into an emergent
                  structure, using the core organizational principles to
                  exhaustively perform the task, internally integral and
                  therefore effective.
                </p>
                <p className={styles.text}>
                  Our main professional values are efficiency and evidence,
                  integration and consistency, dynamics and balance. The course
                  towards the result corresponding to them characterizes noar
                  and is the main reason for any of its successes and the
                  determinant of its style. Continuous improvement on the way to
                  their realization guarantees the quality and sustainable
                  development of our products, integration of experience,
                  knowledge and goals.
                </p>
              </>
            ),
          }}
        >
          <p>
            The noar philosophy stems from the principles of system sciences. We
            offer more than just design or development, we provide a product
            based on the unity of artifacts and user experience, deep reflection
            of visual and activity perception, analysis of the dynamics of
            semantic forms in their ability to create a holistic image, as well
            as the reflection of the projects integrative meanings in the
            product.
          </p>
          <p>
            The goal of noar is to provide comprehensive solutions based on a
            detailed analysis of the product as an integral system, taking into
            account the connections and unity of all its structural elements,
            and arranging them into an emergent structure, using the core
            organizational principles to exhaustively perform the task,
            internally integral and therefore effective.
          </p>
          <p>
            Our main professional values are efficiency and evidence,
            integration and consistency, dynamics and balance. The course
            towards the result corresponding to them characterizes noar and is
            the main reason for any of its successes and the determinant of its
            style. Continuous improvement on the way to their realization
            guarantees the quality and sustainable development of our products,
            integration of experience, knowledge and goals.
          </p>
        </ExpandableText>
      </Container>
    </section>
  );
};

export default AboutPrinciples;
