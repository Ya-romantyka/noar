import HeroSection from "@/app/components/main/hero-section/hero-section";
import FoundSection from "@/app/components/main/found-section/found-section";
import ProjectsSection from "@/app/components/main/projects-section/projects-section";
import AnimTextRotateSection from "@/app/components/main/anim-text-rotate-section/anim-text-rotate-section";
import StatisticsSection from "@/app/components/main/statistics-section/statistics-section";
import BennettCliveScrollAnimation
    from "@/app/components/main/bennett-clive-scroll-animation/bennett-clive-scroll-animation";
import ExpertiseSection from "@/app/components/main/expertise-section/expertise-section";
import NoarAbout from "@/app/components/main/noar-about/noar-about";
import PointPinComponent from "@/app/components/main/point/Point-pin-component";

export default function Home() {
    return (
        <div>
            <HeroSection/>
            <FoundSection/>
            <ProjectsSection/>
            <AnimTextRotateSection/>
            <PointPinComponent/>
            <NoarAbout/>
            <ExpertiseSection/>
            <StatisticsSection/>
            <BennettCliveScrollAnimation/>
        </div>
    );
}
