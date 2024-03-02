import styles from "./spinner.module.css"

const index = () => {
  return (
    <div>
      <div className={styles.ldsring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default index;
