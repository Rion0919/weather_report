import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/footer.module.css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <div className={styles.container}>

          <h1>Weather-Report</h1>
          <a
            href="https://github.com/Rion0919/weather_report"
            className={styles.link}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>

        <span>Created By Rion Yamada</span>
      </div>
    </>
  );
};

export default Footer;
