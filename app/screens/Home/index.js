import React, { Component } from "react";
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  Image,
  Text,
  Icon,
  HotelItem,
  Card,
  Button,
  SafeAreaView
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";

// Load sample data
import { PromotionData, TourData, HotelData } from "@data";
import { connect } from "react-redux";
import internationalization from "../../config/internationalization";
import { I18nManager } from "react-native";

class Home extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      icons: [
        {
          icon: "compass",
          name: "adventure",
          route: "BusSearch"
        },
        {
          icon: "ship",
          name: "water",
          route: "Tour"
        },
        {
          icon: "hourglass",
          name: "deals",
          route: "CruiseSearch"
        },
        {
          icon: "theater-masks",
          name: "hobby",
          route: "Hotel"
        }
      ],
      promotion: PromotionData,
      tours: TourData,
      hotels: HotelData,
      heightHeader: Utils.heightHeader()
    };
    this._deltaY = new Animated.Value(0);
  }

  /**
   * @description Show icon services on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  renderIconService() {
    const { navigation } = this.props;

    return this.state.icons.map((icon, i) => {
      return (
        <TouchableOpacity
          key={i}
          style={{ alignItems: "center" }}
          activeOpacity={0.9}
          onPress={() => navigation.navigate(icon.route)}
        >
          <View style={styles.iconContent}>
            <Icon
              name={icon.icon}
              size={18}
              color={BaseColor.primaryColor}
              solid
            />
          </View>
          <Text
            caption1
            // grayColor
            style={{
              fontFamily: "Cairo-Regular",
              fontSize: 10,
              color: "#766b9d"
            }}
          >
            {internationalization.translate(icon.name)}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  static getDerivedStateFromProps(props, state) {
    // console.log(
    //   "props.lang: ",
    //   props.appLanguage,
    //   "isRTL: ",
    //   internationalization.isRTL()
    // );
    internationalization.setLocale(props.appLanguage);
    return state;
  }

  render() {
    const isRTL = I18nManager.isRTL;

    const { navigation, appLanguage } = this.props;
    const { promotion, tours, hotels, heightHeader } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(60);
    const marginTopBanner = heightImageBanner - heightHeader;
    return (
      <View style={{ flex: 1 }}>
        <Animated.Image
          source={Images.trip5}
          style={[
            styles.imageBackground,
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(10),
                  Utils.scaleWithPixel(100)
                ],
                outputRange: [heightImageBanner, heightHeader, 0]
              })
            }
          ]}
        />
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: "always" }}
        >
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this._deltaY }
                }
              }
            ])}
            onContentSizeChange={() =>
              this.setState({
                heightHeader: Utils.heightHeader()
              })
            }
            scrollEventThrottle={8}
          >
            <View style={{ alignItems: "center" }}>
              {/* <View style={[styles.searchForm, { marginTop: 40 }]}> */}
              {/* <View style={BaseStyle.textInput}>
                  <Text
                    body1
                    grayColor
                    style={
                      (!internationalization.isRTL
                        ? { textAlign: "left" }
                        : { textAlign: "right" },
                      { fontFamily: "Cairo-Regular", fontSize: 12 })
                    }
                  >
                    {internationalization.translate("whatAreLookingFor")}
                    <Icon
                      color={BaseStyle.BaseColor}
                      name="car"
                      size={20}
                      solid
                    />
                  </Text>
                </View> */}
              {/* <Text
                  style={{
                    color: "#E9446A",
                    fontFamily: "Cairo-Regular",
                    fontSize: 19,
                    textAlign: "center"
                  }}
                >
                  {internationalization.translate("header")}
                </Text> */}
              {/* <Text
                  style={{
                    color: "#3c2c73",
                    fontFamily: "Cairo-Regular",
                    fontSize: 18,
                    textAlign: "center"
                  }}
                >
                  {internationalization.translate("soonCity")}
                </Text> */}
              {/* </View> */}

              <View style={[{ height: 10 }]}></View>
            </View>

            <View>
              <View style={styles.contentServiceIcon}>
                {this.renderIconService()}
              </View>
              <View style={styles.line} />

              <Text
                title3
                semibold
                style={[
                  !internationalization.isRTL
                    ? { marginRight: 20, textAlign: "right" }
                    : { marginLeft: 20, textAlign: "left" },
                  {
                    marginVertical: 10,
                    fontFamily: "Cairo-Regular",
                    fontSize: 18,
                    color: BaseColor.primaryColor
                  }
                ]}
              >
                {internationalization.translate("featured")}
              </Text>
              <Text
                body2
                grayColor
                style={[
                  !internationalization.isRTL
                    ? { marginRight: 20, textAlign: "right" }
                    : { marginLeft: 20, textAlign: "left" },
                  {
                    fontFamily: "Cairo-Regular",
                    marginBottom: 8
                  }
                ]}
              >
                {internationalization.translate("featuredbody")}
              </Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={promotion}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <Card
                    style={[
                      styles.promotionItem,
                      // styles.tourItem,
                      index == 0
                        ? { marginHorizontal: 20 }
                        : { marginRight: 20 }
                    ]}
                    image={item.image}
                    onPress={() => navigation.navigate("HotelDetail")}
                  >
                    <Text
                      subhead
                      whiteColor
                      style={[
                        { fontFamily: "Cairo-Regular" },
                        !internationalization.isRTL
                          ? { textAlign: "right" }
                          : { textAlign: "left" }
                      ]}
                    >
                      {item.title1}
                    </Text>
                    <Text
                      title2
                      whiteColor
                      semibold
                      style={[
                        { fontFamily: "Cairo-Regular" },
                        !internationalization.isRTL
                          ? { textAlign: "right" }
                          : { textAlign: "left" }
                      ]}
                    >
                      {item.title2}
                    </Text>
                    <View style={styles.contentCartPromotion}>
                      <Button
                        style={styles.btnPromotion}
                        onPress={() => {
                          navigation.navigate("PreviewBooking");
                        }}
                      >
                        <Text
                          whiteColor
                          style={{ fontFamily: "Cairo-Bold", fontSize: 9 }}
                        >
                          {internationalization.translate("bookNow")}
                        </Text>
                      </Button>
                    </View>
                  </Card>
                )}
              />
            </View>
            {/* Hiking */}
            <View style={styles.line} />

            <View>
              <View style={styles.contentHiking}>
                <Text
                  title3
                  semibold
                  style={[
                    !internationalization.isRTL
                      ? { marginRight: 20, textAlign: "right" }
                      : { marginLeft: 20, textAlign: "left" },
                    {
                      marginVertical: 10,
                      fontFamily: "Cairo-Regular",
                      fontSize: 18,
                      color: BaseColor.primaryColor
                    }
                  ]}
                >
                  {internationalization.translate("categories")}
                </Text>
                <Text
                  body2
                  grayColor
                  style={[
                    !internationalization.isRTL
                      ? { marginRight: 20, textAlign: "right" }
                      : { marginLeft: 20, textAlign: "left" },
                    {
                      fontFamily: "Cairo-Regular",
                      marginBottom: 8
                    }
                  ]}
                >
                  {internationalization.translate("categoriesbody")}
                </Text>
              </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={tours}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <Card
                    style={[
                      styles.tourItem,
                      index == 0
                        ? { marginHorizontal: 20 }
                        : { marginRight: 20 }
                    ]}
                    image={item.image}
                    onPress={() => navigation.navigate("TourDetail")}
                  >
                    <Text
                      headline
                      whiteColor
                      semibold
                      style={[
                        !internationalization.isRTL
                          ? { textAlign: "right" }
                          : { textAlign: "left" },
                        {
                          fontFamily: "Cairo-Regular"
                        }
                      ]}
                    >
                      {item.name}
                    </Text>
                  </Card>
                )}
              />
            </View>
            {/* Promotion */}
            <View style={styles.line} />

            <Image source={Images.banner1} style={styles.promotionBanner} />
            <View
              style={{
                padding: 20
              }}
            >
              <Text
                title3
                semibold
                style={[
                  !internationalization.isRTL
                    ? { marginRight: 20, textAlign: "right" }
                    : { marginLeft: 20, textAlign: "left" },
                  {
                    marginVertical: 10,
                    fontFamily: "Cairo-Regular",
                    fontSize: 18,
                    color: BaseColor.primaryColor
                  }
                ]}
              >
                {internationalization.translate("recent")}
              </Text>
              <Text
                body2
                grayColor
                style={[
                  !internationalization.isRTL
                    ? { marginRight: 20, textAlign: "right" }
                    : { marginLeft: 20, textAlign: "left" },
                  {
                    fontFamily: "Cairo-Regular",
                    marginBottom: 8
                  }
                ]}
              >
                {internationalization.translate("recentbody")}
              </Text>

              <FlatList
                columnWrapperStyle={{ marginBottom: 20 }}
                numColumns={2}
                data={hotels}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <HotelItem
                    grid
                    image={item.image}
                    name={item.name}
                    location={item.location}
                    price={item.price}
                    available={item.available}
                    rate={item.rate}
                    rateStatus={item.rateStatus}
                    numReviews={item.numReviews}
                    services={item.services}
                    style={index % 2 ? { marginLeft: 15 } : {}}
                    onPress={() => navigation.navigate("HotelDetail")}
                  />
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth: { user: { lang = "en" } = {} } = {} }) => {
  return {
    appLanguage: lang
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
