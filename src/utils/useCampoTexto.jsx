import { useState } from "react";
import { useDispatch } from "react-redux";

const useCampoTexto = (
  stateName,
  initialValue,
  maxLength,
  icono,
  label,
  regex
) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  const [focus, setFocus] = useState(false);
  const [highlightType, setHighlightType] = useState("");
  const [asPassword, setAsPassword] = useState(false);

  const updateStates = (_value) => {
    setValue(_value);
    dispatch({
      type: "AGREGAR",
      valor: {
        data: _value,
      },
      indice: stateName,
    });
  };

  const onKeyPress = (e) => {
    if (e.which === 42) {
      e.preventDefault();
    }
  };

  const onChange = (e) => {
    if (e.target.value.length > 0) {
      const target = e.target.value;
      const le = e.target.value.length;
      if (regex) {
        if (regex.test(target)) {
          let newValue = "";
          if (target.length === value.length - 1) {
            newValue = value.slice(0, -1);
          } else {
            newValue = value + target[le - 1];
          }
          updateStates(newValue);
        }
      }
    } else {
      updateStates("");
    }
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
    setHighlightType("");
  };

  const highlight = (type) => {
    setHighlightType(type);
  };

  const hideContent = () => {
    setAsPassword(true);
  };

  const showContent = () => {
    setAsPassword(false);
  };

  const toggleShowContent = () => {
    setAsPassword(!asPassword);
  };

  const clear = () => {
    setValue("");
  };

  return {
    value,
    focus,
    regex,
    icono,
    label,
    highlightType,
    maxLength,
    asPassword,
    hideContent,
    showContent,
    highlight,
    onChange,
    onFocus,
    onKeyPress,
    onBlur,
    toggleShowContent,
    clear,
  };
};

export default useCampoTexto;
