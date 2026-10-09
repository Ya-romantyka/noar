import type { Metadata } from 'next';
import CaseHero from '@/app/components/case/case-hero/case-hero';
import CaseFullImage from '@/app/components/case/case-full-image/case-full-image';
import CaseGallery from '@/app/components/case/case-gallery/case-gallery';
import CaseGallerySwiper from '@/app/components/case/case-gallery-swiper/case-gallery-swiper';
import CaseExpandText from '@/app/components/case/case-expand-text/case-expand-text';
import styles from './page.module.scss';

const description =
  'A visual identity for Shpalta built around expressive lettering, newspaper textures, and Ukrainian cultural references. The system brings together a distinctive logotype, editorial graphics, merchandise, and motion.';

const approach =
  'Newspaper clippings, textured paper, and bold lettering give Shpalta a recognisable editorial voice. Red and orange accents bring energy to the monochrome foundation. The identity extends from the logotype and printed merchandise to social media layouts and animated graphics.';

export const metadata: Metadata = {
  title: 'Shpalta — Noar',
  description,
};

export default function ShpaltaPage() {
  return (
    <>
      <CaseHero
        background="#FF9900"
        color="#101010"
        category={['Brandbook', '2D motion']}
        title="Shpalta"
        description={description}
        client="Shpalta"
        services={['Identity', 'Graphics', '2D Motion']}
        headerColor="transparent-black"
      />
      <CaseFullImage image="/images/shpalta/1.webp" headerColor="white" />
      <CaseGallery
        label="Visuals"
        title="An editorial identity with a character of its own."
        media={[2, 3, 4, 5, 6].map((number) => ({
          image: {
            srcMob: `/images/shpalta/${number}.webp`,
            srcDesk: `/images/shpalta/${number}.webp`,
          },
        }))}
      />
      <CaseGallerySwiper
        label="Identity"
        title={
          <>
            Logotype, lettering, <br /> and visual language.
          </>
        }
        images={[
          '/images/shpalta/7.webp',
          '/videos/shpalta/8.mp4',
          '/images/shpalta/9.webp',
          '/images/shpalta/10.webp',
          '/images/shpalta/11.webp',
        ]}
        classNamesSwiper={styles.identitySwiper}
        classNamesImageList={styles.imageList}
      />
      <div className={styles.motion}>
        <CaseFullImage
          video={{ src: '/videos/shpalta/12.mp4', type: 'video/mp4' }}
          headerColor="white"
        />
      </div>
      <CaseGallerySwiper
        label="Digital"
        title="A consistent voice across every format."
        images={[13, 14, 15, 16, 17].map(
          (number) => `/images/shpalta/${number}.webp`,
        )}
        classNamesSwiper={styles.identitySwiper}
        classNamesImageList={styles.imageList}
      />
      <div className={styles.motion}>
        <CaseFullImage
          video={{ src: '/videos/shpalta/18.mp4', type: 'video/mp4' }}
          headerColor="white"
        />
      </div>
      <CaseExpandText
        label="Our approach & Ways of thinking"
        animationDuration={{ desktop: '40s', mobile: '80s' }}
        popup={{ title: 'An editorial voice for Shpalta.', text: approach }}
        text={<p>{approach}</p>}
      />
    </>
  );
}
