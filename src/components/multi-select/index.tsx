import { useSelector, useDispatch } from "react-redux";
// import { CUSTOM_API_STATUS } from "../../constants";
import { RootState } from "../../redux/store";
import { useRef } from "react";
import { setIsOpen } from "../../features";
import Input from "../input";
import styles from "./multiSelect.module.css";
import useOutSideClick from "../../hooks/useOutSideClick.ts";
import Dropdown from "../dropdown/index.tsx";

const index = () => {
  const { fetchedData, isOpen } = useSelector(
    (state: RootState) => state.rickAndMorty
  );
  const dispatch = useDispatch();

  const ref = useRef<HTMLInputElement>(null);
  useOutSideClick(ref, () => dispatch(setIsOpen(false)));
  console.log("fetchedData ", fetchedData);
  console.log("isOpen ", isOpen);

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.input}>
        <Input />
        <Dropdown />
      </div>

      {/* {fetchedData.status === CUSTOM_API_STATUS.LOADING && (
        <div>loading...</div>
      )}
      {fetchedData.status === CUSTOM_API_STATUS.SUCCEEDED &&
        fetchedData.data && (
          <div className={styles.input}>
            {fetchedData.data.results.map((item: Character, index: number) => (
              <div key={index}>{item.name}</div>
            ))}
            <Input />
          </div>
        )} */}
    </div>
  );
};

export default index;
