import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { auth } from "@services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  ScrollView,
  VStack,
} from "native-base";
import { useState } from "react";

export function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  async function handleRegister() {
    if (password !== confirmPassword) {
      Alert("As senha não são iguais");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredencial) => {
          const user = userCredencial.user;

          updateProfile(user, {
            displayName: name,
            photoURL: user.photoURL
              ? user.photoURL
              : "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
          });
        }
      );
      navigation.navigate("home");
    } catch (e) {
      console.log(e);
    }
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
              <FormControl>
                <FormControl.Label>Nome</FormControl.Label>
                <Input
                  keyboardType="email-address"
                  color="white"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </FormControl>

              <FormControl mb={5}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  keyboardType="email-address"
                  color="white"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Senha</FormControl.Label>
                <Input
                  secureTextEntry
                  color="white"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Confirme a Senha</FormControl.Label>
                <Input
                  secureTextEntry
                  color="white"
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
              </FormControl>
              <Button mt={10} bg="darkBlue.600" onPress={handleRegister}>
                Cadastrar
              </Button>
              <HStack alignSelf="flex-end" mt={10}></HStack>
            </VStack>
          </Box>
        </Center>
      </VStack>
    </ScrollView>
  );
}
