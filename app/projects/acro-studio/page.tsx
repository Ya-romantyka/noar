import CaseHero from '@/app/components/case/case-hero/case-hero';
import CaseFullImage from '@/app/components/case/case-full-image/case-full-image';
import CaseGallery from '@/app/components/case/case-gallery/case-gallery';
import CaseGallerySwiper from '@/app/components/case/case-gallery-swiper/case-gallery-swiper';
import CaseTeam from '@/app/components/case/case-team/case-team';
import CaseExpandText from '@/app/components/case/case-expand-text/case-expand-text';
import CaseSpecifics from '@/app/components/case/case-specifics/case-specifics';
import CaseList from '@/app/components/case/case-list/Case-list';

export default function CasePage() {
  return (
    <>
      <CaseHero
        background="#D7ED5C"
        color="#101010"
        category="Brandbook "
        title="Acro Studio"
        description="A bright and energetic design for an acrobatics studio whose clients include both adults and children. The idea is based on the shape of an acrobatic track. The color palette and overall outlines reflect a sporty mood and credibility."
        client="Acro Studio"
        services={['Identity', 'Graphics']}
        duration="1 months"
        year="2023"
      />
      <CaseFullImage image="/images/full-image.webp" />
      <CaseList
        label="Visuals"
        title="Sophisticated and energetic cross-dimensional design."
        media={[
          {
            video: {
              src: '/videos/HORIZONT.mp4',
              type: 'video/mp4',
              poster: '/images/case-img-2.webp',
              fullSrc: '/videos/HORIZONT.mp4',
              fullType: 'video/mp4',
            },
          },

          {
            image: {
              srcMob: '/images/case-img-2.webp',
              srcDesk: '/images/case-img-1.webp',
            },
          },
          {
            image: {
              srcMob: '/images/case-img-3.webp',
              srcDesk: '/images/case-img-3.webp',
            },
          },
          {
            image: {
              srcMob: '/images/case-img-4.webp',
              srcDesk: '/images/case-img-5.webp',
            },
          },
          {
            image: {
              srcMob: '/images/case-img-5.webp',
              srcDesk: '/images/case-img-4.webp',
            },
          },
        ]}
      />
      <CaseGallery
        label="Visuals"
        title="Sophisticated and energetic cross-dimensional design."
        media={[
          {
            image: {
              srcMob: '/images/case-img-1.webp',
              srcDesk: '/images/case-img-2.webp',
            },
          },

          {
            image: {
              srcMob: '/images/case-img-2.webp',
              srcDesk: '/images/case-img-1.webp',
            },
          },
          {
            image: {
              srcMob: '/images/case-img-3.webp',
              srcDesk: '/images/case-img-3.webp',
            },
          },
          {
            image: {
              srcMob: '/images/case-img-4.webp',
              srcDesk: '/images/case-img-5.webp',
            },
          },
          {
            image: {
              srcMob: '/images/case-img-5.webp',
              srcDesk: '/images/case-img-4.webp',
            },
          },
        ]}
      />
      <CaseGallerySwiper
        label="Identity"
        title={
          <>
            Logotype, Grid, <br /> Process of Building
          </>
        }
        images={[
          '/videos/acro-promo.mp4',
          '/images/acro-slide-1.webp',
          '/images/acro-slide-2.webp',
          '/images/acro-slide-3.webp',
          '/images/acro-slide-4.webp',
          '/images/acro-slide-5.webp',
          '/images/acro-slide-6.webp',
        ]}
      />
      <CaseSpecifics
        fonts={[
          {
            name: 'E-Ukraine Head',
            file: 'e-Ukraine-Regular',
            author:
              'The Ministry and the Committee for Digital Transformation of Ukraine',
            text: '“AcroStudio is a modern gym for children and their parents”',
            list: ['Headlines - Bold', 'Bodytext - Regular'],
          },
        ]}
        colors={[
          { name: 'Toxic Light Green', hex: 'D7ED5C', textColor: 'black' },
          { name: 'Ivory', hex: 'FFFFF0', textColor: 'black' },
          { name: 'Purple', hex: '5C3D80', textColor: 'white' },
          { name: 'Light Gray', hex: 'D6D6D8', textColor: 'black' },
          {
            name: 'Black but not too Black',
            hex: '262626',
            textColor: 'white',
          },
        ]}
      />
      <CaseExpandText
        popup={{
          title: 'Acro Studio is a small network of gyms.',
          text:
            'Acrobatics, stretching, fly yoga, fitness for adults and their\n' +
            "            children. The client's request was to create an identity for\n" +
            '            use online and offline. The logo was based on the idea of an\n' +
            '            acrobatic track - the main attribute of this sport. The minimalistic\n' +
            '            shape combined with bright green and purple colors create an image\n' +
            '            associated with sports and energy, but do not burden it, preserving\n' +
            '            the childlike ease. In addition, a series of icons and graphic\n' +
            '            decorative elements were developed for social media, which can be\n' +
            '            used to create banners, flyers and posts.',
        }}
        label="Our approach & Ways of thinking"
        text={
          <>
            <p>
              Acro Studio is a small network of gyms. Acrobatics, stretching,
              fly yoga, fitness for adults and their children. The client&apos;s
              request was to create an identity for use online and offline. The
              logo was based on the idea of an acrobatic track - the main
              attribute of this sport. The minimalistic shape combined with
              bright green and purple colors create an image associated with
              sports and energy, but do not burden it, preserving the childlike
              ease. In addition, a series of icons and graphic decorative
              elements were developed for social media, which can be used to
              create banners, flyers and posts.
            </p>
          </>
        }
      />

      <CaseTeam
        label="Team"
        team={[
          { position: 'Creative director', name: 'Vladyslav Artiushenko' },
          { position: 'Graphic designer', name: 'Artem Mudrenko' },
        ]}
      />
    </>
  );
}
