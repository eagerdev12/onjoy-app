import { StyleSheet, Dimensions } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  imagePost: { width: "100%", height: Utils.scaleWithPixel(220) },
  content: {
    // marginHorizontal: 20,
    paddingBottom: 40,
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    width: Dimensions.get("window").width,
    paddingLeft: 10,
    paddingRight: 10
  }
});
