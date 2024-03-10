import "./App.css";
import MultiDropdown from "./components/multi-select/index.tsx";
import { useEffect } from "react";
import { getRickAndMorty } from "./features/api-slice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store.tsx";

const SEARCH_DELAY_MS = 300;

function App() {
  const { searchValue }: InitialState = useSelector(
    (state: RootState) => state.rickAndMorty
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // Search once typing pauses, and cancel the previous search when a new one
    // starts, so a slow, older response can never replace newer results.
    let request: { abort: () => void } | undefined;
    const timer = setTimeout(() => {
      request = dispatch(getRickAndMorty(searchValue.trim()));
    }, SEARCH_DELAY_MS);

    return () => {
      clearTimeout(timer);
      request?.abort();
    };
  }, [dispatch, searchValue]);

  return (
    <div>
      <MultiDropdown />
    </div>
  );
}

export default App;
