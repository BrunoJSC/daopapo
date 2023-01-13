import { useState } from "react";
import firebase from "firebase/firestore";
import { useAuthStatechanged } from "@hooks/useAuthStatechanged";
import { auth } from "@services/firebase";
import { signOut } from "firebase/auth";

import {
  FlatList,
  Heading,
  HStack,
  Image,
  StatusBar,
  Text,
  View,
  VStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import { Chat } from "./Chat";

import { Camera, CameraType } from "expo-camera";

export function Home() {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();

  if (!hasPermission) {
    return Alert("aaaaaaaaaa");
  }

  if (!hasPermission.granted) {
    setHasPermission();
  }

  const toggleCameraType = (current: any) =>
    setType(current === CameraType.back ? CameraType.front : CameraType.back);

  const { user } = useAuthStatechanged();
  return (
    <VStack flex={1} bg="gray.900">
      <StatusBar backgroundColor="transparent" />
      <HStack
        w="100%"
        h={90}
        bg="gray.800"
        px={10}
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading color="white" fontWeight="bold" fontFamily="body">
          {user?.displayName}
        </Heading>
        <TouchableOpacity
          onPress={() => signOut(auth)}
          style={{ backgroundColor: "red" }}
        >
          <Text color="black" fontSize="2xl">
            Sair
          </Text>
        </TouchableOpacity>

        {user?.photoURL && (
          <Image
            w={45}
            h={45}
            rounded="full"
            bg="white"
            src={user?.photoURL}
            alt="user"
          />
        )}
        <TouchableOpacity onPress={toggleCameraType}>
          <Text>{<Feather name="camera" color="#fff" />}</Text>
        </TouchableOpacity>
      </HStack>
      <Chat />
    </VStack>
  );
}
