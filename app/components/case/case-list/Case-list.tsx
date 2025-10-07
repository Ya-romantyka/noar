'use client'

import React, {FC, ReactNode} from 'react';
import styles from './Case-list.module.scss'
import Container from '../../layout/container/container';
import clsx from "clsx";
import Image from "next/image";
import AutoVideo from "@/app/components/ui/Auto-video/AutoVideo";
import {useIsMobile} from "@/app/hooks/useIsMobile";

type VideoItem = {
    src: string;
    type: string;
    poster?: string;
};
type ImageItem = {
    srcDesk: string;
    srcMob: string;
};

type MediaItem = {
    image?: ImageItem;
    video?: VideoItem;
};

interface CaseGalleryProps {
    label: string;
    title: ReactNode;
    media: MediaItem[];
}
const CaseList:FC<CaseGalleryProps> = ({label, title, media}) => {


    const isMobile = useIsMobile();
    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.header}>
                      <span
                          className={clsx(styles.label, 'section-label section-label--white')}
                      >
                        {label}
                      </span>
                    <h2 className={styles.title}>
                        {title}
                    </h2>

                </div>
                <ul className={clsx(styles.images,)}>
                    {media.map((item, index) => (
                        <li className={styles.item} key={index}>
                            {item.image && (
                                isMobile ?
                                    <Image
                                        src={item.image.srcMob}
                                        alt={`Gallery image ${index + 1}`}
                                        priority={true}
                                        fill
                                        sizes=" 100vw"
                                        className={styles.image}
                                    /> : <Image
                                        src={item.image.srcDesk}
                                        alt={`Gallery image ${index + 1}`}
                                        priority={true}
                                        fill
                                        sizes=" 100vw"
                                        className={styles.image}
                                    />
                            )}

                            {item.video && (
                                <AutoVideo video={item.video} className={styles.video}/>
                            )}
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};

export default CaseList;