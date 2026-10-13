import type { Metadata } from 'next';
import CaseHero from '@/app/components/case/case-hero/case-hero';
import CaseFullImage from '@/app/components/case/case-full-image/case-full-image';
import CaseGallery from '@/app/components/case/case-gallery/case-gallery';
import CaseGallerySwiper from '@/app/components/case/case-gallery-swiper/case-gallery-swiper';
import CaseTeam from '@/app/components/case/case-team/case-team';
import CaseExpandText from '@/app/components/case/case-expand-text/case-expand-text';
import styles from './page.module.scss';
import textStyles from '@/app/components/ui/expandable-text/expandable-text.module.scss';
import missionStyles from '@/app/components/module/module-mission/Module-mission.module.scss';
import heroStyles from '@/app/components/case/case-hero/case-hero.module.scss';
import teamStyles from '@/app/components/case/case-team/case-team.module.scss';
import CaseSpecifics from '@/app/components/case/case-specifics/case-specifics';

const description =
  'A modular design system for a contemporary Ukrainian media brand, built to work seamlessly across YouTube, Instagram, and other digital platforms. The design code is inspired by the raw reportage aesthetics of the 1990s and iconic imagery from Ukrainian culture.';

const approach = [
  'The client needed a modular visual system for a contemporary Ukrainian media brand operating across YouTube, Instagram, and other digital platforms. The main task was to create a consistent identity that could support different content formats while preserving the raw reportage aesthetics of the project.',
  'We developed a visual language inspired by Ukrainian media culture of the 1990s, archival TV graphics, and local cultural imagery. The system included a set of graphic elements for headlines, quotes, maps, notifications, credits, transitions, and other recurring content blocks.',
  'For the YouTube channel, we designed an intro and outro in the style of vintage 1990s TV programmes. We also created around 15 animated elements and characters for interludes and compositions. The soundtrack combined classic Ukrainian melodic references with modern synthesiser arrangements and voice-over, helping the media product maintain a recognizable tone across video formats.',
];

export const metadata: Metadata = {
  title: 'Shpalta — Noar',
  description,
};

export default function ShpaltaPage() {
  return (
    <>
      <CaseHero
        background="#FF951A"
        color="#000000"
        category={['Brandbook', '2D / 3D Motion']}
        title="Shpalta"
        description={description}
        client="Shpalta"
        services={[
          'Identity,\nGraphics,\n2D-motion,\nSound Design',
          'Content',
          'Development',
        ]}
        duration="8 weeks"
        year="2022"
        className={heroStyles.wide}
        headerColor="transparent-black"
      />
      <CaseFullImage image="/images/shpalta/1.webp" headerColor="white" />
      <CaseGallery
        label="Visuals"
        title={
          <>
            A brand narrative built <br /> on local lore.
          </>
        }
        parallaxClasses={['li:nth-child(3) img']}
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
            Take a look at the fusion of <br /> retro and motion graphics
          </>
        }
        images={[
          '/images/shpalta/7.webp',
          '/videos/shpalta/8.mp4',
          '/images/shpalta/9.webp',
          '/images/shpalta/10.webp',
          '/images/shpalta/11.webp',
          '/videos/shpalta/12.mp4',
          '/images/shpalta/13.webp',
          '/images/shpalta/14.webp',
          '/images/shpalta/15.webp',
          '/images/shpalta/16.webp',
          '/images/shpalta/17.webp',
          '/videos/shpalta/18.mp4',
        ]}
        classNamesSwiper={styles.identitySwiper}
        mobileSlider
        videoPlayer
      />
      <CaseSpecifics
        label="Colors/Fonts"
        variant="compact"
        title={
          <>
            Fonts and colors that<br />were used on the project.
          </>
        }
        fonts={[
          {
            name: 'Shpalta - Barlow',
            file: 'SHPALTA-BARLOW',
            author: 'Noar Studio',
            alphabet: 'А Б В Г Ґ Д Е Є Ж З И І Ї Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ь Ю Я',
            list: ['Headlines - Bold'],
          },
          {
            name: 'Montserrat',
            file: 'Montserrat-Regular',
            author: (
              <a href="https://github.com/JulietaUla/Montserrat">
                Julieta Ulanovsky, Sol Matas, Juan Pablo del Peral, Jacques Le Bailly
              </a>
            ),
            alphabet: (
              <>
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm<br />
                Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz<br />
                0123456789 -&amp;*@?!/+(:;;)
              </>
            ),
            list: ['Subtitles - Medium', 'Bodytext - Regular'],
          },
        ]}
        colors={[
          {
            name: 'Breaking Red',
            hex: 'E61717',
            rgb: '230 23 23',
            cmyk: '0 90 90 10',
            textColor: 'white',
          },
          {
            name: 'Alert Orange',
            hex: 'FF9500',
            rgb: '255 149 0',
            cmyk: '0 42 100 0',
            textColor: 'white',
          },
          {
            name: 'Editorial White',
            hex: 'FFFFFF',
            rgb: '255 255 255',
            cmyk: '0 0 0 0',
            textColor: 'black',
          },
          {
            name: 'News Black',
            hex: '000000',
            rgb: '0 0 0',
            cmyk: '0 0 0 100',
            textColor: 'white',
          },
          {
            name: 'Deep Plum',
            hex: '35323B',
            rgb: '53 50 59',
            cmyk: '10 15 0 77',
            textColor: 'white',
            span: 2,
          },
          {
            name: 'Graphite Moss',
            hex: '383C3A',
            rgb: '56 60 58',
            cmyk: '7 0 3 76',
            textColor: 'white',
          },
          {
            name: 'Dark Cocoa',
            hex: '433129',
            rgb: '67 49 41',
            cmyk: '0 27 39 74',
            textColor: 'white',
          },
        ]}
      />
      <CaseExpandText
        label="Our approach & Ways of thinking"
        classNamesText={textStyles.preview}
        animationDuration={{ desktop: '40s', mobile: '80s' }}
        popup={{
          title: 'Shpalta',
          label: 'Mission',
          text: approach.join('\n'),
          className: missionStyles.plain,
        }}
        text={<p>{approach[0]}</p>}
      />
      <CaseTeam
        label="Team"
        backLabel="circle back"
        className={teamStyles.wide}
        team={[
          { position: 'Creative director', name: 'Vladyslav Artiushenko' },
          { position: 'Graphic & Motion Designer', name: 'Dmytro Onyshchenko' },
          { position: 'Voice', name: 'Vohnepalnyi' },
          { position: 'Sound Design', name: 'Dmytro Oleksiuk' },
        ]}
      />
    </>
  );
}
