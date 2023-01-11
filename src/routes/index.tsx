import { NavigationContainer } from "@react-navigation/native";
import { useAuthStatechanged } from "@hooks/useAuthStatechanged";

import { Home } from "@screens/Home";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { user } = useAuthStatechanged();
  return (
    <NavigationContainer>
      {user ? <Home /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
