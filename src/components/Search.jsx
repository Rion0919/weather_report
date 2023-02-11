import { memo } from "react";
import styles from '../styles/search.module.css'

const Search = ({value, setValue, onClick}) => {
  return (
    <div className={styles.searchContainer}>
      <input
      className={styles.searchBox}
      placeholder="地名、住所、郵便番号から検索できます"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className={styles.searchBtn} onClick={onClick}>検索</button>
    </div>
  );
};

export default memo(Search);
