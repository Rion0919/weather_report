import styles from "../styles/header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Search from "./Search";

const Header = ({ value, setValue, onClick }) => {
  return (
    <div className={styles.container}>
      <Search value={value} setValue={setValue} onClick={onClick} />
      <div className={styles.titleIcon}>
        <h1>Weather-Report</h1>
        <a href="https://github.com/Rion0919/weather_report" className={styles.link}>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
};

export default Header;
