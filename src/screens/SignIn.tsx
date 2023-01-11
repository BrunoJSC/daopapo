import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { auth } from "@services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Link,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin() {
    if (email === "" || password === "") {
      Alert("Por favor coloque email ou senha");
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("home");
      setEmail(email);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function handleSignUp() {
    navigation.navigate("signup");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg="gray.900"
      >
        <Center w="100%">
          <Box w="90%" maxW={290}>
            <Heading
              fontFamily="heading"
              color="white"
              fontWeight="bold"
              mb={7}
            >
              Seja bem-vindo
            </Heading>
            <VStack>
              <FormControl mb={5}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  keyboardType="email-address"
                  color="white"
                  onChangeText={(text) => setEmail(text)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Senha</FormControl.Label>
                <Input
                  keyboardType="visible-password"
                  secureTextEntry
                  color="white"
                  onChangeText={(text) => setPassword(text)}
                />
                <Link
                  alignSelf="flex-end"
                  _text={{
                    fontSize: "md",
                    fontWeight: 500,
                    color: "darkBlue.600",
                  }}
                >
                  Esqueceu a senha
                </Link>
              </FormControl>
              <Button mt={10} bg="darkBlue.600" onPress={handleLogin}>
                Login
              </Button>
              <HStack alignSelf="flex-end" mt={10}>
                <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                  <Text color="darkBlue.600">E novo por aqui? Cadastre-se</Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </VStack>
    </ScrollView>
  );
}
