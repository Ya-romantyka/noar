import StaggerLink from "@/app/components/ui/stagger-link/stagger-link";
import styles from "./contact-info.module.scss";
import clsx from "clsx";

export default function ContactInfo() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={clsx("section-label", styles.label)}>
          Contact information
        </div>
        <h2 className={clsx("h2", styles.title)}>
          Let’s make great things happen!
        </h2>
        <p className={styles.text}>Feel free to contact us at any time</p>
      </div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <span className={styles.itemLabel}>Email</span>
          <StaggerLink
            href="mailto:contact@noar.studio"
            className={styles.itemLink}
          >
            contact@noar.studio
          </StaggerLink>
        </li>
        <li className={styles.item}>
          <span className={styles.itemLabel}>Phone | Kyiv:</span>
          <StaggerLink href="tel:+380666661488" className={styles.itemLink}>
            +38 066 666 1488
          </StaggerLink>
        </li>
        <li className={styles.item}>
          <span className={styles.itemLabel}>Phone | London:</span>
          <StaggerLink href="tel:+447342769960" className={styles.itemLink}>
            +44 73 4276 9960
          </StaggerLink>
        </li>
      </ul>
    </section>
  );
}
