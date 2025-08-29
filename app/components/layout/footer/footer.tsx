"use client";

import React, {useRef} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import FooterMarquee from "./footerMarquee/footerMarquee";
import Container from "@/app/components/layout/container/container";
import styles from "./footer.module.scss";
import clsx from "clsx";

import Logo from "@/app/assets/icons/logo.svg";
import StaggerLink from "../../ui/stagger-link/stagger-link";

const footerData = {
  logo: "/assets/logo.svg",
  description:
    "We are an award-winning studio that builds brands through thoughtful design and immersive digital solutions.",
  locations: [
    { city: "UA, Kyiv", phone: "+38 098 38 22 12" },
    { city: "UK, London", phone: "+44 7470 597 150" },
  ],
  socials: [
    { name: "Facebook", url: "https://www.facebook.com/" },
    { name: "Instagram", url: "https://www.instagram.com/" },
    { name: "LinkedIn", url: "https://www.linkedin.com/" },
    { name: "Dribble", url: "https://dribbble.com/" },
  ],
  menu: [
    { name: "About", url: "/about" },
    { name: "Projects", url: "/projects" },
    { name: "Services & Approach", url: "/services" },
    { name: "Contact", url: "/contact" },
  ],
  legals: [
    { name: "Privacy Policy", url: "/privacy-policy" },
    { name: "Terms of Use", url: "/terms-of-use" },
  ],
  tagline: "Global Reach, Local Expertise.",
  copyright: "All Rights Reserved ⓒ Circa 2022",
};

const Footer: React.FC = () => {
  const pathname = usePathname();
  const router = useTransitionRouter();

  const linkRef = useRef<HTMLAnchorElement>(null);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function slideInOut() {
    document.documentElement.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0.2, transform: "translateY(-35%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleTransition = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    router.push(href, { onTransitionReady: slideInOut });
  };

  return (
    <footer
      className={clsx(styles.footer, {
        [styles.black]: pathname === "/contact" || pathname === "/services",
      })}
      {...(pathname === "/contact" || pathname === "/services" ? { 'data-header-white': true } : {})}
    >
      <Container>
        <div className={styles.top}>
          <div className={styles.topGroup}>
            <Link href="/" className={styles.logo} ref={linkRef}>
              <Logo />
            </Link>
            <p className={styles.text}>{footerData.description}</p>
          </div>

          <div className={styles.topRow}>
            <div className={styles.topCol}>
              <div className={styles.topTitle}>Connect</div>
              {footerData.locations.map((location, index) => (
                <ul key={index} className={styles.list}>
                  <li>{location.city}</li>
                  <li>
                    <StaggerLink
                      href={`tel: ${location.phone.replace(/\s/g, "")}`}
                    >
                      {location.phone}
                    </StaggerLink>
                  </li>
                </ul>
              ))}
            </div>

            <div className={styles.topCol}>
              <div className={styles.topTitle}>Socials</div>
              <ul className={styles.list}>
                {footerData.socials.map((social, index) => (
                  <li key={index}>
                    <StaggerLink href={social.url} target="_blank">
                      {social.name}
                    </StaggerLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.topCol}>
              <div className={styles.topTitle}>Menu</div>
              <ul className={styles.list}>
                {footerData.menu.map((item, index) => (
                  <li key={index}>
                    <StaggerLink
                      href={item.url}
                      onClick={(e) => handleTransition(e, item.url)}
                    >
                      {item.name}
                    </StaggerLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.topCol}>
              <div className={styles.topTitle}>Legals</div>
              <ul className={styles.list}>
                {footerData.legals.map((legal, index) => (
                  <li key={index}>
                    <StaggerLink
                      href={legal.url}
                      onClick={(e) => handleTransition(e, legal.url)}
                    >
                      {legal.name}
                    </StaggerLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.smText}>{footerData.tagline}</div>
          </div>
        </div>

        <div className={styles.middle}>
          <FooterMarquee />
        </div>

        <div className={styles.bottom}>
          <div className={styles.subtitle}>
            <span>Full-Circle </span>
            <span>Brand </span>
            <span>Development </span>
            <span>Studio. </span>
          </div>
          <div className={styles.bottomRow}>
            <div className={styles.copyright}>{footerData.copyright}</div>
            <StaggerLink
              href="#"
              className={styles.upLink}
              onClick={scrollToTop}
            >
              Back to top
            </StaggerLink>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
