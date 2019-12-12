import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  tabbar: {
    backgroundColor: "white",
    height: 40
  },
  tab: {
    width: 100
  },
  indicator: {
    backgroundColor: BaseColor.primaryColor,
    height: 1
  },
  label: {
    fontWeight: "400"
  },
  containProfileItem: {
    paddingLeft: 20,
    paddingRight: 20
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingTop: 20
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: "#aaa"
  }
});
