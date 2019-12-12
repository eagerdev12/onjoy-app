import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  imageBackground: {
    height: 60,
    width: "100%",
    position: "absolute"
  },
  searchForm: {
    padding: 10,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: BaseColor.fieldColor,
    // backgroundColor: "rgba(256, 256, 256,1)",
    backgroundColor: "#ffff",
    width: "70%",
    height: 50,
    shadowColor: "black",
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1
  },
  contentServiceIcon: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  contentCartPromotion: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  btnPromotion: {
    height: 25,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  contentHiking: {
    marginTop: 0,
    marginLeft: 20,
    marginBottom: 10
  },
  promotionBanner: {
    height: Utils.scaleWithPixel(100),
    width: "100%",
    marginTop: 10
  },
  line: {
    height: 1,
    backgroundColor: BaseColor.textSecondaryColor,
    marginTop: 10,
    marginBottom: 20
  },
  iconContent: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BaseColor.fieldColor,
    marginBottom: 10
  },
  promotionItem: {
    borderRadius: 8,
    width: Utils.scaleWithPixel(200),
    height: Utils.scaleWithPixel(250)
  },
  tourItem: {
    borderRadius: 8,
    width: Utils.scaleWithPixel(135),
    height: Utils.scaleWithPixel(160)
  }
});
