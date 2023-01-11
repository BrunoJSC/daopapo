import { useNavigation } from "@react-navigation/native";
import { auth, db } from "@services/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Avatar, FlatList, HStack, Text, View, Heading } from "native-base";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { GiftedChat, User } from "react-native-gifted-chat";

interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
}

export const Chat = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useLayoutEffect(() => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );
    return unsubscribe();
  }, [navigation]);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, user, text, createdAt } = messages[0];
    addDoc(collection(db, "chats"), { _id, user, text, createdAt });
  }, []);

  return (
    <>
      <HStack>
        <Heading color="white">{auth?.currentUser?.displayName}</Heading>
        <Avatar source={{ uri: `${auth?.currentUser?.photoURL}` }} />
      </HStack>

      <GiftedChat
        messages={messages}
        showUserAvatar={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: `${auth?.currentUser?.email}`,
          name: `${auth?.currentUser?.displayName}`,
          avatar: `${auth?.currentUser?.photoURL}`,
        }}
      />
    </>
  );
};
