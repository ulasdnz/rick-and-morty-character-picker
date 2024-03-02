import "./App.css";
import MultiDropdown from "./components/multi-select/index.tsx";
import { useEffect } from "react";
import { getRickAndMorty } from "./features/api-slice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store.tsx";

function App() {
  const { searchValue }: InitialState = useSelector(
    (state: RootState) => state.rickAndMorty
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getRickAndMorty(searchValue));
  }, [searchValue]);

  return (
    <div>
      <MultiDropdown />
    </div>
  );
}

export default App;
