import { RefObject } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./dropdown.module.css";
import { CUSTOM_API_STATUS } from "../../constants";
import Spinner from "../spinner";
import Error from "../error";
import Characters from "../characters";

type DropdownProps = {
  activeIndex: number;
  activeItemRef: RefObject<HTMLDivElement>;
};

const Dropdown = ({ activeIndex, activeItemRef }: DropdownProps) => {
  const {
    fetchedData: { status },
    isOpen,
  } = useSelector((state: RootState) => state.rickAndMorty);

  return (
    isOpen && (
      <div className={styles.wrap}>
        {status === CUSTOM_API_STATUS.FAILED && <Error />}
        {status === CUSTOM_API_STATUS.LOADING && <Spinner />}
        {status === CUSTOM_API_STATUS.SUCCEEDED && (
          <Characters activeIndex={activeIndex} activeItemRef={activeItemRef} />
        )}
      </div>
    )
  );
};

export default Dropdown;
