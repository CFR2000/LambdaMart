import { useReducer, useEffect } from "react";

const isBrowser = () => typeof window !== "undefined";

const getWindowDistance = () => ({ value: window.scrollY });

export type ScrollState = {
  isUp?: boolean;
  value: number;
};

/**
 * Takes in the new state and updates it while establishing whether an upward scroll has occurred
 * @param {ScrollState} prev the previous state
 * @param {ScrollState} curr the value of the recent call to dispatcher
 * @returns the updated state
 */
const reducer = (prev: ScrollState, curr: ScrollState) => ({
  isUp: prev.value < curr.value,
  value: curr.value,
});

/**
 *
 * @returns true if the scroll direction is upwards, false otherwise
 */
export default function useScrollUp() {
  const [state, setWindowDistance] = useReducer(reducer, {
    isUp: false,
    value: isBrowser() ? getWindowDistance().value : 0,
  });

  useEffect(() => {
    if (isBrowser()) {
      function handleScroll() {
        setWindowDistance(getWindowDistance());
      }
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return state.isUp;
}
