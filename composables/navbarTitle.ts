const navbarTitle = ref();
import { capitalize } from "lodash";

export default function useNavbarTitle() {
  function setNavbarTitle(value: string) {
    navbarTitle.value = capitalize(value.trim());
  }

  return { navbarTitle, setNavbarTitle };
}
