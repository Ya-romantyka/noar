import styles from "./case-team.module.scss";
import Container from "../../layout/container/container";
import clsx from "clsx";
import Button from "../../ui/button/button";
import BackIcon from "@/app/assets/icons/back-icon.svg";

interface TeamMember {
  position: string;
  name: string;
}

interface CaseTeamProps {
  label: string;
  team: TeamMember[];
}

const CaseTeam: React.FC<CaseTeamProps> = ({ label, team }) => {
  return (
    <section className={styles.section} data-header-white>
      <Container className={styles.container}>
        <span
          className={clsx(styles.label, "section-label section-label--white")}
        >
          {label}
        </span>

        <div className={styles.group}>
          <ul className={styles.list}>
            {team.map((member: TeamMember, index: number) => (
              <li key={index} className={styles.item}>
                <span className={styles.position}>{member.position}</span>
                <span className={styles.name}>{member.name}</span>
              </li>
            ))}
          </ul>

          <div className={styles.buttons}>
            <Button href="/projects" variant="white" className={styles.button}>
              <BackIcon />
              return
            </Button>
            <Button
              href="/contact"
              variant="outline-white"
              className={styles.button}
            >
              <BackIcon />
              next point
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CaseTeam;
