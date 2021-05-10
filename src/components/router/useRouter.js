import { useContext } from "react";

import { RouterContext } from "./Router";

export default function useRouter() {
  return useContext(RouterContext);
}
