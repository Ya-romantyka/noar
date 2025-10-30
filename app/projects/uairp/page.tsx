'use client';
import s from './page.module.scss';
import CaseHero from '@/app/components/case/case-hero/case-hero';
import CaseFullImage from '@/app/components/case/case-full-image/case-full-image';
import CaseGallery from '@/app/components/case/case-gallery/case-gallery';
import CaseGallerySwiper from '@/app/components/case/case-gallery-swiper/case-gallery-swiper';
import CaseTeam from '@/app/components/case/case-team/case-team';
import CaseExpandText from '@/app/components/case/case-expand-text/case-expand-text';
import CaseSpecifics from '@/app/components/case/case-specifics/case-specifics';

export default function CasePage() {
  return (
    <>
      <CaseHero
        background="#2F2F83"
        color="#fff"
        category={['Brandbook', 'Website']}
        title="UAIRP"
        description="The Ukrainian-American Institute for Responsible Policy is an official organization. Therefore, we created a design that combines academic style and heraldry with modern trends, and built an easy-to-manage website with storytelling elements."
        client="UAIRP"
        services={[
          'Identity',
          'UI/UX Design',
          'Graphics',
          'Copyright',
          'Development',
        ]}
        duration="2 month"
        year="2024"
        headerColor={'data-header-white'}
      />
      <CaseFullImage image="/images/uairp-poster.webp" />
      <CaseGallery
        label="Concept"
        title="A combination of heraldry and contemporary classics"
        parallaxClasses={['li:nth-child(3) img', 'li:nth-child(3) video']}
        media={[
          {
            image: {
              srcMob: '/images/uairp-case-1.webp',
              srcDesk: '/images/uairp-case-1.webp',
            },
          },
          {
            image: {
              srcMob: '/images/uairp-case-2.webp',
              srcDesk: '/images/uairp-case-2.webp',
            },
          },
          {
            image: {
              srcMob: '/images/uairp-case-3.webp',
              srcDesk: '/images/uairp-case-3.webp',
            },
          },
          {
            image: {
              srcMob: '/images/uairp-case-4.webp',
              srcDesk: '/images/uairp-case-4.webp',
            },
          },
          {
            image: {
              srcMob: '/images/uairp-case-5.webp',
              srcDesk: '/images/uairp-case-5.webp',
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
          '/images/uairp-case-6.webp',
          '/images/uairp-case-12.webp',
          '/images/uairp-case-13.webp',
          '/images/uairp-case-14.webp',
          '/videos/uairp-video-2.mp4',
          '/images/uairp-case-15.webp',
        ]}
        classNamesSwiper={s.caseGallerySwiper}
        classNamesImageList={s.caseGalleryImageList}
      />

      <CaseGallery
        label="Website"
        title="A website with storytelling elements"
        parallaxClasses={['li:nth-child(3) img', 'li:nth-child(3) video']}
        media={[
          {
            image: {
              srcMob: '/images/uairp-case-7.webp',
              srcDesk: '/images/uairp-case-7.webp',
            },
          },
          {
            image: {
              srcMob: '/images/uairp-case-8.webp',
              srcDesk: '/images/uairp-case-8.webp',
            },
          },
          {
            video: {
              src: '/videos/uairp-video.mp4',
              type: 'video/mp4',
              poster: '/images/uairp-case-9.webp',
              fullSrc: '/videos/uairp-video.mp4',
              fullType: 'video/mp4',
            },
          },
          {
            image: {
              srcMob: '/images/uairp-case-10.webp',
              srcDesk: '/images/uairp-case-10.webp',
            },
          },
          {
            image: {
              srcMob: '/images/uairp-case-11.webp',
              srcDesk: '/images/uairp-case-11.webp',
            },
          },
        ]}
      />
      <CaseSpecifics
        title="Fonts and colors that were used on the project."
        fonts={[
          {
            name: 'Fixel',
            file: 'FixelText-Regular',
            author: 'MacPaw',
            text: '“Ukrainian-American Institute of Responsible Policy — timeless, academic, adaptable identity.”',
            list: ['Headlines - Bold', 'Bodytext - Regular'],
          },
        ]}
        colors={[
          { name: 'Blue', hex: '2F2F83', textColor: 'white', span: 2 },
          { name: 'Ivory', hex: 'FFFFFF', textColor: 'black' },
          { name: 'Grey', hex: '838383', textColor: 'white' },
          { name: 'Black', hex: '101010', textColor: 'white' },
        ]}
      />

      <CaseExpandText
        popup={{
          title: 'Ukrainian-American Institute of Responsible Policy',
          text:
            'The client wanted a classic academic style that would be understood by its target audience — officials, government officials, and politicians. At the same time, the design had to look relevant and timeless, but also be adaptable.\n' +
            'We created the logo in three formats: a coat of arms, a symbol adapted for small formats (small logo), and a text logo. Inspired by classic images, we based the design on a pen, symbolising science and involvement in the academic world, and an ear of wheat, an agricultural symbol close to both countries. These ideas are also emphasised by the dominant deep blue colour in the style of ‘Prussian blue’.\n' +
            "At the client's request, the website had to be built on a strong metaphor and visual image that would resonate with the values of the Western elites and convincingly convey the messages ‘The strength of the Western world lies in unity’ and ‘Ukraine is a bastion of democracy.’ Thus, we combined Roosevelt's quote with the US government's geopolitical concept of the ‘domino theory.’\n",
        }}
        label="Ukrainian-American Institute of Responsible Policy"
        animationDuration={{
          mobile: '100s',
          desktop: '50s',
        }}
        text={
          <>
            <p>
              {`
              The client wanted a classic academic style that would be
              understood by its target audience — officials, government
              officials, and politicians. At the same time, the design had to
              look relevant and timeless, but also be adaptable. \nWe created the
              logo in three formats: a coat of arms, a symbol adapted for small
              formats (small logo), and a text logo. Inspired by classic images,
              we based the design on a pen, symbolising science and involvement
              in the academic world, and an ear of wheat, an agricultural symbol
              close to both countries. These ideas are also emphasised by the
              dominant deep blue colour in the style of ‘Prussian blue’. \nAt the
              client's request, the website had to be built on a strong
              metaphor and visual image that would resonate with the values of
              the Western elites and convincingly convey the messages ‘The
              strength of the Western world lies in unity’ and ‘Ukraine is a
              bastion of democracy.’ Thus, we combined Roosevelt's quote
              with the US government's geopolitical concept of the ‘domino
              theory.’`}
            </p>
          </>
        }
      />

      <CaseTeam
        label="Team"
        team={[
          { position: 'Creative director', name: 'Vladyslav Artiushenko' },
          { position: 'Brand Designer', name: 'Artem Mudrenko' },
          { position: 'Developer', name: 'Sergii Samokhvalov' },
        ]}
      />
    </>
  );
}
