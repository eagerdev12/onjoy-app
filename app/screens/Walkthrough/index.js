import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { SafeAreaView, Text, Button, Image } from "@components";
import styles from "./styles";
import Swiper from "react-native-swiper";
import { BaseColor, BaseStyle, Images } from "@config";
import * as Utils from "@utils";
import internationalization from "../../config/internationalization";

class Walkthrough extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollEnabled: true,
      slide: [
        { key: 1, image: Images.trip2 },
        { key: 2, image: Images.trip1 },
        { key: 3, image: Images.trip3 },
        { key: 4, image: Images.trip4 }
      ]
    };
  }

  toggleLanguageonChange(select) {
    if (internationalization.getCurrentLocale() == "en") {
      this.props.navigation.navigate("Loading");

      internationalization.setLocale("ar");
      internationalization.setI18nConfig();
      this.props.actions.changeAppLanguage("ar");
      this.setState({ selectedLanguage: "ar" });
      this.props.navigation.navigate("Loading");
    } else {
      this.props.navigation.navigate("Loading");

      internationalization.setLocale("en");
      internationalization.setI18nConfig();
      this.props.actions.changeAppLanguage("en");
      this.setState({ selectedLanguage: "en" });
    }
  }

  /**
   * @description Simple authentication without call any APIs
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  authentication() {
    this.setState(
      {
        loading: true
      },
      () => {
        this.props.actions.authentication(true, response => {
          if (response.success) {
            this.props.navigation.navigate("Loading");
          } else {
            this.setState({
              loading: false
            });
          }
        });
      }
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <ScrollView
          style={styles.contain}
          scrollEnabled={this.state.scrollEnabled}
          onContentSizeChange={(contentWidth, contentHeight) =>
            this.setState({
              scrollEnabled: Utils.scrollEnabled(contentWidth, contentHeight)
            })
          }
        >
          <View style={styles.wrapper}>
            {/* Images Swiper */}
            <Swiper
              dotStyle={{
                backgroundColor: BaseColor.textSecondaryColor
              }}
              activeDotColor={BaseColor.primaryColor}
              paginationStyle={styles.contentPage}
              removeClippedSubviews={false}
            >
              {this.state.slide.map((item, index) => {
                return (
                  <View style={styles.slide} key={item.key}>
                    <Image source={item.image} style={styles.img} />
                  </View>
                );
              })}
            </Swiper>
          </View>
          <View style={{ width: "100%" }}>
            <Button
              full
              style={{
                backgroundColor: BaseColor.navyBlue,
                marginTop: 20
              }}
              onPress={() => {
                this.authentication();
              }}
            >
              <Text style={{ color: "white", fontFamily: "Cairo-Regular" }}>
                {internationalization.translate("LoginFacebook")}
              </Text>
            </Button>
            <Button
              full
              style={{ marginTop: 20 }}
              loading={this.state.loading}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text style={{ color: "white", fontFamily: "Cairo-Regular" }}>
                {internationalization.translate("signIn")}
              </Text>
            </Button>
            <View style={styles.contentActionBottom}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                {/* <TouchableOpacity onPress={() => this.authentication()}> */}
                <Text
                  body1
                  primaryColor
                  style={{ fontFamily: "Cairo-Regular" }}
                >
                  {internationalization.translate("JoinNow")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleLanguageonChange()}>
                <Text body1 grayColor style={{ fontFamily: "Cairo-Light" }}>
                  {internationalization.translate("needHelp")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Walkthrough);
