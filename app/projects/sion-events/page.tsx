import s from './page.module.scss';
import CaseHero from '@/app/components/case/case-hero/case-hero';
import CaseFullImage from '@/app/components/case/case-full-image/case-full-image';
import CaseGallery from '@/app/components/case/case-gallery/case-gallery';
import CaseGallerySwiper from '@/app/components/case/case-gallery-swiper/case-gallery-swiper';
import CaseTeam from '@/app/components/case/case-team/case-team';
import CaseExpandText from '@/app/components/case/case-expand-text/case-expand-text';
import CaseSpecifics from '@/app/components/case/case-specifics/case-specifics';
// import CaseList from '@/app/components/case/case-list/Case-list';

export default function CasePage() {
  return (
    <>
      <CaseHero
        background="#FFD334"
        color="#101010"
        category="Brandbook "
        title="Sion events"
        description="Sion - it is not just a place or an event. It is a celebration. It is radiance. It is prophecy. It is a point of attraction for those who seek depth and truth, who seek light amid darkness and order amid chaos."
        client="Sion events"
        services={['Identity', 'Graphics']}
        duration="1 months"
        year="2025"
      />
      <CaseFullImage image="/images/sion-events-banner.webp" />
      {/* <CaseList
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
      /> */}
      <CaseGallery
        label="Visuals"
        title="Elitism in the realm of neon-lit music parties"
        parallaxClasses={['li:nth-child(3) img', 'li:nth-child(3) video']}
        media={[
          {
            image: {
              srcMob: '/images/sion-events-cases/sion-events-case-1.webp',
              srcDesk: '/images/sion-events-cases/sion-events-case-1.webp',
            },
          },

          {
            image: {
              srcMob: '/images/sion-events-cases/sion-events-case-2.webp',
              srcDesk: '/images/sion-events-cases/sion-events-case-2.webp',
            },
          },
          {
            image: {
              srcMob: '/images/sion-events-cases/sion-events-case-3.webp',
              srcDesk: '/images/sion-events-cases/sion-events-case-3.webp',
            },
          },
          {
            image: {
              srcMob: '/images/sion-events-cases/sion-events-case-4.webp',
              srcDesk: '/images/sion-events-cases/sion-events-case-4.webp',
            },
          },
          {
            image: {
              srcMob: '/images/sion-events-cases/sion-events-case-5.webp',
              srcDesk: '/images/sion-events-cases/sion-events-case-5.webp',
            },
          },
        ]}
      />
      <CaseGallerySwiper
        label="Identity"
        title={
          <>
            Logotype, Visuals, <br /> Process of Building
          </>
        }
        images={[
          '/images/sion-events-cases/sion-events-slide-1.webp',
          '/images/sion-events-cases/sion-events-slide-2.webp',
          '/images/sion-events-cases/sion-events-slide-3.webp',
          '/images/sion-events-cases/sion-events-slide-4.webp',
          '/images/sion-events-cases/sion-events-slide-5.webp',
          '/images/sion-events-cases/sion-events-slide-6.webp',
        ]}
        classNamesSwiper={s.caseGallerySwiper}
      />
      <CaseSpecifics
        fonts={[
          {
            name: 'Varoste',
            file: 'e-Ukraine-Regular',
            author: 'Artefact Project',
            text: '“A new night pulse rises in Kyiv, where sound meets desire and nights never end.”',
            list: ['Headlines - Regular', 'Bodytext - Regular'],
          },
        ]}
        colors={[
          { name: 'Yellow', hex: 'FFD334', textColor: 'black' },
          { name: 'White', hex: 'FFFFFF', textColor: 'black' },
          {
            name: 'Gradient',
            gradient: 'linear-gradient(180deg, #f7619c 0%, #ffc5b0 100%)',
            hex: ['F22FB0', '7061A3'],
            textColor: 'black',
          },
          { name: 'Black', hex: '1A181B', textColor: 'white', span: 2 },
        ]}
      />
      <CaseExpandText
        popup={{
          title: 'The space of melodic house music',
          text:
            'The brand idea is based on exclusivity. The client wanted to create a space that would evoke a sense of intimacy and elitism, but would be accessible to a wider audience of melodic house music lovers. These events should bring together extraordinary people who appreciate elegance and sophistication, transporting them to another dimension — a dimension of energy, elation and togetherness.\n' +
            'Sion should be a place of elation for guests and their energetic purification. Surrounded by urban vanity, guests blossom like a lotus flower that grows out of murky water and remains unblemished. Thus, the lotus became the basis of the logo.\n' +
            'We built the visual language on soft gradients and refined typography. Gold reflects elitism, black reflects the nightlife, but warm gradients soften this image, evoking comfort and ease rather than excitement and formality.',
        }}
        label="Approach"
        text={
          <>
            <p>
              {`
                  The brand idea is based on exclusivity. The client wanted to create a space that would evoke a sense of intimacy and elitism, but would be accessible to a wider audience of melodic house music lovers. These events should bring together extraordinary people who appreciate elegance and sophistication, transporting them to another dimension — a dimension of energy, elation and togetherness.\n
                  Sion should be a place of elation for guests and their energetic purification. Surrounded by urban vanity, guests blossom like a lotus flower that grows out of murky water and remains unblemished. Thus, the lotus became the basis of the logo.\n
                  We built the visual language on soft gradients and refined typography. Gold reflects elitism, black reflects the nightlife, but warm gradients soften this image, evoking comfort and ease rather than excitement and formality.
                `}
            </p>
          </>
        }
      />

      <CaseTeam
        label="Team"
        team={[
          { position: 'Creative director', name: 'Vladyslav Artiushenko' },
          { position: 'Brand Designer', name: 'Artem Mudrenko' },
        ]}
      />
    </>
  );
}
