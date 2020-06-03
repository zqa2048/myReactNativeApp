import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee"
  },
  search: {
    position: "absolute",
    left: 20,
    right: 20,
    backgroundColor: "#A9F5F2",
    color: "#000",
    borderRadius: 5,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10
  },
  content: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  itemTitle: {
    textAlign: "left",
    flex: 1
  },
  checkBox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    alignItems: "center",
    lineHeight: 30,
    borderColor: "skyblue"
  }
});
export default styles;
