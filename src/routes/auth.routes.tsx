import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chat } from "@screens/Chat";
import { Home } from "@screens/Home";

import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";
import { useTheme } from "native-base";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  const { colors } = useTheme();
  return (
    <Navigator>
      <Screen
        name="signin"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="signup"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: colors.darkBlue["500"],
          },
          headerTintColor: colors.white,
        }}
      />
      <Screen name="home" component={Home} />
      <Screen name="chat" component={Chat} />
    </Navigator>
  );
}
