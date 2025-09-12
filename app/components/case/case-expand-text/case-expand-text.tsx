import styles from "./case-expand-text.module.scss";
import Container from "../../layout/container/container";
import clsx from "clsx";
import ExpandableText from "../../ui/expandable-text/expandable-text";

interface IPopup {
  title: string;
  text: string;
}
interface CaseExpandTextProps {
  label: string;
  text: React.ReactNode;
  popup:IPopup
}

const CaseExpandText: React.FC<CaseExpandTextProps> = ({ label, text, popup }) => {
  return (
    <section className={styles.section} data-header-white>
      <Container className={styles.container}>
        <div className={styles.header}>
          <span
            className={clsx(styles.label, "section-label section-label--white")}
          >
            {label}
          </span>
        </div>

        <ExpandableText popup={popup}>{text}</ExpandableText>
      </Container>
    </section>
  );
};

export default CaseExpandText;
