import { useState } from "react";

const useAlertaCombo = (show) => {
  const [started, setStarted] = useState(show);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [stage, setStage] = useState(1);
  const [error, setError] = useState(null);

  const start = () => {
    setStarted(true);
  };

  const finish = () => {
    setStage(1);
    setStarted(false);
  };

  const load = (val) => {
    setLoading(val);
  };

  return {
    started,
    data,
    stage,
    loading,
    error,
    setError,
    setStage,
    load,
    setData,
    start,
    finish,
  };
};

export default useAlertaCombo;
