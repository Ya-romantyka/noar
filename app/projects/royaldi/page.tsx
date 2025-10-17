'use client';
import s from '../cases.module.scss';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import CaseHero from '@/app/components/case/case-hero/case-hero';
import AutoVideo from '@/app/components/ui/Auto-video/AutoVideo';
import CaseTeam from '@/app/components/case/case-team/case-team';
import CaseExpandText from '@/app/components/case/case-expand-text/case-expand-text';
import CaseList from '@/app/components/case/case-list/Case-list';

export default function CasePage() {
  const isMobile = useIsMobile();

  return (
    <>
      <CaseHero
        background="#101010"
        color="#fff"
        category="Identity"
        title="IN LOVE 2026"
        description="Captured through the lens of Sicilian charm, the Royaldi collection radiates refined elegance and effortless allure. Our team skillfully executed the full street-style production, providing every service from concept to final delivery."
        client="Royaldi"
        services={[
          'Scriptwriting',
          'Set-Design',
          'Filming',
          'Post-production',
          'On-set makeup',
          'Management',
        ]}
        duration="6 weeks"
        year="2024"
        headerColor={'data-header-white'}
      />

      <AutoVideo
        video={{
          src: '/videos/HORIZONT-short.mp4',
          type: 'video/mp4',
          poster: '/images/horizont-video-poster.jpg',
          fullSrc: '/videos/HORIZONT-compressed.mp4',
        }}
        className={s.autoVideo}
      />
      <CaseList
        label="Visuals"
        title="Moments of Elegance, Captured Beautifully"
        media={[
          ...(isMobile
            ? [
                {
                  video: {
                    src: '/videos/HORIZONT.mp4',
                    type: 'video/mp4',
                    poster: '/images/royaldi-cases/case-img-1.webp',
                    fullSrc: '/videos/HORIZONT.mp4',
                    fullType: 'video/mp4',
                  },
                },
              ]
            : [
                {
                  image: {
                    srcMob: '/images/royaldi-cases/case-img-1.webp',
                    srcDesk: '/images/royaldi-cases/case-img-1.webp',
                  },
                },
              ]),
          {
            image: {
              srcMob: '/images/royaldi-cases/case-img-2.webp',
              srcDesk: '/images/royaldi-cases/case-img-2.webp',
            },
          },
          {
            image: {
              srcMob: '/images/royaldi-cases/case-img-3.webp',
              srcDesk: '/images/royaldi-cases/case-img-3.webp',
            },
          },
          {
            image: {
              srcMob: '/images/royaldi-cases/case-img-4.webp',
              srcDesk: '/images/royaldi-cases/case-img-4.webp',
            },
          },
          {
            image: {
              srcMob: '/images/royaldi-cases/case-img-5.webp',
              srcDesk: '/images/royaldi-cases/case-img-5.webp',
            },
          },
          {
            image: {
              srcMob: '/images/royaldi-cases/case-img-6.webp',
              srcDesk: '/images/royaldi-cases/case-img-6.webp',
            },
          },
          {
            image: {
              srcMob: '/images/royaldi-cases/case-img-7.webp',
              srcDesk: '/images/royaldi-cases/case-img-7.webp',
            },
          },
          {
            image: {
              srcMob: '/images/royaldi-cases/case-img-8.webp',
              srcDesk: '/images/royaldi-cases/case-img-8.webp',
            },
          },
          {
            image: {
              srcMob: '/images/royaldi-cases/case-img-9.webp',
              srcDesk: '/images/royaldi-cases/case-img-9.webp',
            },
          },
        ]}
      />

      <CaseExpandText
        popup={{
          title: 'Sicilian Street-Style Bridal Campaign',
          text:
            `Royaldi, a bridal fashion house known for its refined aesthetics, approached our team to create a set of video for the launch of its new wedding dress collection. The goal was to present the brand’s craftsmanship and emotional depth through a fresh visual language that stands out in the bridal industry.\n` +
            '            Street-style filming remains one of the least common formats in bridal production due to its unpredictability and the high level of creative and technical control it requires. Yet precisely because of that, when executed well, it resonates far more deeply with the audience. To distinguish Royaldi’s collection from competitors, we decided to embrace the challenge and focus on capturing genuine emotions — the ones that reflect what the real bride feels and expects to see. These moments create an authentic bond between the viewer and the brand.\n' +
            '            The shoot was meticulously planned to absorb the essence of Sicilian life. It showcases not only the region’s narrow cobblestone streets but also local markets filled with energy, iconic landmarks, and coastal landscapes with volcanic rocks — all serving as visual metaphors for intimacy, tenderness, and feminine strength.\n' +
            '            The creative decision to use natural makeup and hairstyling allowed the model’s personality to shine through, emphasizing authenticity over perfection. This approach transformed the campaign into a living story about beauty, confidence, and real emotion — exactly what modern bridal storytelling needs.\n',
        }}
        label="Sicilian Street-Style Bridal Campaign"
        animationDuration={{
          mobile: '150s',
          desktop: '100s',
        }}
        text={
          <>
            <p>
              Royaldi, a bridal fashion house known for its refined aesthetics,
              approached our team to create a set of video for the launch of its
              new wedding dress collection. The goal was to present the brand’s
              craftsmanship and emotional depth through a fresh visual language
              that stands out in the bridal industry. Street-style filming
              remains one of the least common formats in bridal production due
              to its unpredictability and the high level of creative and
              technical control it requires. Yet precisely because of that, when
              executed well, it resonates far more deeply with the audience. To
              distinguish Royaldi’s collection from competitors, we decided to
              embrace the challenge and focus on capturing genuine emotions —
              the ones that reflect what the real bride feels and expects to
              see. These moments create an authentic bond between the viewer and
              the brand. The shoot was meticulously planned to absorb the
              essence of Sicilian life. It showcases not only the region’s
              narrow cobblestone streets but also local markets filled with
              energy, iconic landmarks, and coastal landscapes with volcanic
              rocks — all serving as visual metaphors for intimacy, tenderness,
              and feminine strength. The creative decision to use natural makeup
              and hairstyling allowed the model’s personality to shine through,
              emphasizing authenticity over perfection. This approach
              transformed the campaign into a living story about beauty,
              confidence, and real emotion — exactly what modern bridal
              storytelling needs.
            </p>
          </>
        }
      />

      <CaseTeam
        label="Team"
        team={[
          { position: 'Creative Director, Shooting', name: 'Vadym Kitura' },
          { position: 'Conceptual styling', name: 'Vladyslav Limer' },
          { position: 'MUA and Hair', name: 'Idean Cohen' },
          { position: 'Model', name: 'Gara Arias' },
        ]}
      />
    </>
  );
}
