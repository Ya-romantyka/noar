import AboutHero from "./about-hero/about-hero";
import AboutPrinciples from "./about-principles/about-principles";
import AboutServices from "./about-services/about-services";
import AboutTeam from "./about-team/about-team";
import AboutVideo from "./about-video/about-video";
import styles from "./page.module.scss";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <AboutHero />
      <AboutPrinciples/>
      <AboutVideo/>
      <AboutServices/>
      <AboutTeam />
    </div>
  );
}
