import CaseHero from "@/app/components/case/case-hero/case-hero";
import CaseFullImage from "@/app/components/case/case-full-image/case-full-image";
import CaseGallery from "@/app/components/case/case-gallery/case-gallery";
import CaseGallerySwiper from "@/app/components/case/case-gallery-swiper/case-gallery-swiper";
import CaseTeam from "@/app/components/case/case-team/case-team";
import CaseExpandText from "@/app/components/case/case-expand-text/case-expand-text";
import CaseSpecifics from "@/app/components/case/case-specifics/case-specifics";

export default function CasePage() {
    return (
        <>
            <CaseHero
                background="#D7ED5C"
                color="#101010"
                category="Identity "
                title="Acro Studio"
                description="From crafting unique identities to developing functional web and mobile applications, we bring your ideas to life in the digital realm, where brands gain clarity and impact."
                client="Acro Studio"
                services={["Graphics", "Branding", "Shooting"]}
                duration="1 months"
                year="2023"
            />
            <CaseFullImage
                // image="/images/full-image.webp
                video={
                    {
                        src: '/videos/HORIZONT.mp4',
                        type: 'video/mp4',
                    }
                }
            />
            <CaseGallery
                label="Visuals"
                title="Sophisticated and energetic cross-dimensional design."
                media={[
                    {image: "/images/case-img-1.webp"},
                    { video: { src: '/videos/HORIZONT.mp4', type: "video/mp4"}},
                    {image: "/images/case-img-3.webp"},
                    {image: "/images/case-img-4.webp"},
                    {image: "/images/case-img-5.webp"},
                ]}
            />
            <CaseGallerySwiper
                label="Identity"
                title={
                    <>
                        Logotype, Grid, <br/> Process of Building
                    </>
                }
                images={[
                    "/images/case-img-1.webp",
                    "/images/case-img-2.webp",
                    "/images/case-img-3.webp",
                    "/images/case-img-4.webp",
                    "/images/case-img-5.webp",
                ]}
            />
            <CaseSpecifics
                fonts={[
                    {
                        name: "Fixel",
                        author: "MacPaw",
                        text: "“AcroStudio is a modern gym for children and their parents”",
                        list: ["Headlines - Bold", "Bodytext - Regular"],
                    },
                    {
                        name: "DrukCyr",
                        author: "Commercial Type",
                        text: "“AcroStudio is a modern gym for children and their parents”",
                        list: ["Headlines - Bold", "Subtitles - Regular", 'Taglines - SemiBold'],
                    },
                    {
                        name: "Helvetica Neue Cyr",
                        file: 'HelveticaNeueCyr',
                        author: "Linotype",
                        text: "“AcroStudio is a modern gym for children and their parents”",
                        list: ["Headlines - Bold", "Subtitles - Regular", "Taglines - SemiBold"],
                    },
                ]}
                colors={[
                    {name: "Toxic Light Green", hex: "D7ED5C", textColor: "black"},
                    {name: "Ivory", hex: "FFFFF0", textColor: "black"},
                    {name: "Purple", hex: "5C3D80", textColor: "white"},
                    {name: "Light Gray", hex: "D6D6D8", textColor: "black"},
                    {name: "Black but not too Black", hex: "262626", textColor: "white"},
                ]}
            />
            <CaseExpandText
                label="Our approach & Ways of thinking"
                text={
                    <>
                        <p>
                            Acro Studio is a small network of gyms. Acrobatics, stretching,
                            fly yoga, fitness for adults and their children. The client&apos;s
                            request was to create an identity for use online and offline.
                        </p>
                        <p>
                            The logo was based on the idea of an acrobatic track - the main
                            attribute of this sport. The minimalistic shape combined with
                            bright green and purple colors create an image associated with
                            sports and energy, but do not burden it, preserving the childlike
                            ease.
                        </p>
                        <p>
                            In addition, a series of icons and graphic decorative elements
                            were developed for social media, which can be used to create
                            banners, flyers and posts.
                        </p>
                    </>
                }
            />

            <CaseTeam
                label="Team"
                team={[
                    {position: "Creative director", name: "Vladyslav Artiushenko"},
                    {position: "Graphic designer", name: "Artem Mudrenko"},
                ]}
            />
        </>
    );
}
