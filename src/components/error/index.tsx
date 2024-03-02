import styles from "./error.module.css";
import ErrorSvg from "../../assets/error.svg";

const Error = () => {
  return (
    <div>
      <div className={styles.error}>
        <div className={styles.errorMessage}>
          Error! Couldn't fetch the data...
        </div>
        <div>
          <img src={ErrorSvg} />
        </div>
      </div>
    </div>
  );
};

export default Error;
