import { Text, View, StyleSheet } from "react-native";
import { W3mButton } from "@web3modal/wagmi-react-native";

export default function CustomHeader({ title }) {
  return (
    <View style={styles.overallView}>
      <Text style={{ fontSize: 20, fontWeight: "semibold" }}>{title}</Text>
      <W3mButton />
    </View>
  );
}
const styles = StyleSheet.create({
  overallView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
