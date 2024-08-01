import { useState } from "react";

const useSwitch = (text, defaultSelected, blocked) => {
  const [selected, setSelected] = useState(defaultSelected);

  const handleChange = () => {
    if (!blocked) {
      setSelected(!selected);
    }
  };

  const select = () => {
    setSelected(true);
  };

  const unselect = () => {
    setSelected(false);
  };

  return {
    text,
    selected,
    unselect,
    select,
    handleChange,
  };
};

export default useSwitch;
