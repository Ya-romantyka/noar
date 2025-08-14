"use client";

import styles from "./project-sticky-card.module.scss";
import React, {RefObject, useRef} from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import clsx from "clsx";
import Link from "next/link";

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
    headerRef
                           }: ProjectStickyCardProps) => {
    const cardRef = useRef<HTMLAnchorElement>(null);


    return (
        <Link ref={cardRef} href={url} className={clsx(styles.card, "card")}>
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
                <picture className={clsx(styles.image)} >
                    <Image src={img} alt={name} fill/>
                </picture>
            </div>
        </Link>
    );
};

export default ProjectStickyCard;
