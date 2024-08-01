/* eslint-disable */
import { useHistory } from "react-router-dom";

const useRedirect = (route) => {
  const history = useHistory();
  const redirect = (routeParams) => {
    history.push(route, {
      ...routeParams,
    });
  };
  const redirectRoot = (routeParams) => {
    history.push("/", {
      ...routeParams,
    });
  };
  const redirectMisPolizas = (routeParams) => {
    history.push("/mis-polizas", {
      ...routeParams,
    });
  };

  const goBack = () => {
    history.goBack();
  };

  const redirectPathWithState = (path, routeParams) => {
    history.push(path, {
      ...routeParams,
    });
  };

  return {
    redirect,
    redirectMisPolizas,
    redirectRoot,
    goBack,
    redirectPathWithState,
  };
};

export default useRedirect;
