"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "@/app/components/layout/container/container";
import styles from "./about-services.module.scss";
import AnimatedText from "@/app/components/ui/animated-text/animated-text";

import Image from "next/image";
import {useAutoPlayVideo} from "@/app/hooks/useAutoPlayVideo";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "01 Design",
    items: [
      { name: "Web Design", image: "/images/16.png" },
      { name: "UI / UX Design", image: "/images/team-card-img-1.webp" },
      { name: "Graphics", image: "/images/team-card-img-1.webp" },
      { name: "2D / 3D Motion", image: "/images/team-card-img-1.webp" },
      { name: "Branding & Identity", image: "/images/team-card-img-1.webp" },
    ],
  },
  {
    title: "02 Production",
    items: [
      { name: "Scriptwriting", image: "/images/team-card-img-1.webp" },
      { name: "Set-Design", image: "/images/team-card-img-1.webp" },
      { name: "Filming", image: "/images/team-card-img-1.webp" },
      { name: "Post-production", image: "/images/team-card-img-1.webp" },
    ],
  },
  {
    title: "03 Development",
    items: [
      { name: "JavaScript", image: "/images/team-card-img-1.webp" },
      { name: "Python", image: "/images/team-card-img-1.webp" },
      { name: "HTML / CSS", image: "/images/team-card-img-1.webp" },
      { name: "PHP/Laravel", image: "/images/team-card-img-1.webp" },
    ],
  },
];

const stats = [
  { value: 70, label: "Clients" },
  { value: 6, label: "Years of experience" },
  { value: 10, label: "Team members" },
  { value: 2, label: "Cities" },
];

const AboutServices: React.FC = () => {
  const statsRef = useRef<HTMLUListElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useAutoPlayVideo(videoRef)

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!statsRef.current || !bodyRef.current) return;

      gsap.fromTo(
        statsRef.current,
        { x: "100%", filter: "blur(50px)" },
        {
          x: "0%",
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 75%",
            end: "bottom center",
            scrub: 2,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.section}>
      <Container className="about-services-container">
        <div className={styles.header}>
          <span className={`${styles.label} section-label`}>About us</span>
          <h2 className={`${styles.title} h2`}>
            <AnimatedText onScroll>
              Here are the services we proudly deliver – whether it’s a
              full-circle solution, or a bespoke piece.
            </AnimatedText>
          </h2>
        </div>

        <div className={styles.videoWrapper}>
          <video
              ref={videoRef}
              className={styles.video}
              loop
              muted
              playsInline
          >
            <source src="/videos/Logo_RENDER.mp4" type="video/mp4; codecs=hvc1"/>
            <source src="/videos/Logo.webm" type="video/webm"/>
          </video>
        </div>

        <div ref={bodyRef} className={styles.body}>
          <ul className={styles.list}>
            {services.map((service, index) => (
                <li key={index} className={styles.item}>
                  <h3 className={styles.itemTitle}>{service.title}</h3>
                  <ul className={styles.itemList}>
                  {service.items.map((item, idx) => (
                    <li key={idx}>
                      <Image
                        src={item.image}
                        alt="Active Service"
                        className={styles.image}
                        width={200}
                        height={240}
                      />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <ul className={styles.stats} ref={statsRef}>
          {stats.map((stat, index) => (
            <li key={index} className={styles.statsItem}>
              <div className={styles.statsValue}>{stat.value}</div>
              <p className={styles.statsText}>{stat.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default AboutServices;
