import { useNavigation } from "@react-navigation/native";
import { Avatar, Divider, List } from "native-base";

interface Props {
  id: string;
  title: string;
  imageSrc: string;
}

export function ChatItem({ id, title, imageSrc }: Props) {
  const navigation = useNavigation();
  return (
    <>
      <List.Item
        title={title}
        left={(props) => (
          <Avatar
            size={38}
            source={{
              uri: imageSrc,
            }}
          />
        )}
        onPress={() => navigation.navigate("chat", { id })}
      />
      <Divider />
    </>
  );
}
