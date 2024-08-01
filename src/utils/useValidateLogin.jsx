import { useCookies } from "react-cookie";
import constantes from "../recursos/constantes";

const nombreCookie = constantes.nombreDeCookie;

// Custom hook that validates if the user is already logged in.
// If it´s not, returns false so de developer could redirect to "/"
const useValidateLogin = () => {
  let validateUser = true;
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const user =
    objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    validateUser = false;
  }
  return { validateUser, user };
};

export default useValidateLogin;
