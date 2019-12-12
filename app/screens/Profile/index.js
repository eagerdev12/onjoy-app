import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";
import { BaseStyle, BaseColor } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
  ProfilePerformance
} from "@components";
import styles from "./styles";
import internationalization from "../../config/internationalization";
import { I18nManager } from "react-native";

// Load sample data
import { UserData } from "@data";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      reminders: false,
      loading: false,
      userData: UserData[0]
    };
  }

  /**
   * @description Simple logout with Redux
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  onLogOut() {
    this.setState(
      {
        loading: true
      },
      () => {
        this.props.actions.authentication(false, response => {
          if (response.success) {
            this.props.navigation.navigate("Loading");
          } else {
            this.setState({ loading: false });
          }
        });
      }
    );
  }

  /**
   * @description Call when reminder option switch on/off
   */
  toggleSwitch = value => {
    this.setState({ reminders: value });
  };

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

  render() {
    const { navigation } = this.props;
    const { userData, loading } = this.state;
    const footer = "<> with ♥ in Jeddah";
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Profile"
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.primaryColor}
                style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
              />
            );
          }}
          renderRight={() => {
            return (
              <Icon name="bell" size={24} color={BaseColor.primaryColor} />
            );
          }}
          renderRightSecond={() => {
            return (
              <Icon name="envelope" size={24} color={BaseColor.primaryColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate("Notification");
          }}
          onPressRightSecond={() => {
            navigation.navigate("Messenger");
          }}
        />
        <ScrollView>
          <View style={styles.contain}>
            <ProfileDetail
              image={userData.image}
              textFirst={userData.name}
              point={userData.point}
              textSecond={userData.address}
              textThird={userData.id}
              onPress={() => navigation.navigate("ProfileExanple")}
            />
            <ProfilePerformance
              data={userData.performance}
              style={{ marginTop: 20, marginBottom: 20 }}
            />
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate("ProfileEdit");
                }}
              >
                <Text body2 style={{ fontFamily: "Cairo-Light" }}>
                  {internationalization.translate("editProfile")}
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{
                    marginLeft: 5,
                    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate("ChangePassword");
                }}
              >
                <Text body2 style={{ fontFamily: "Cairo-Light" }}>
                  {internationalization.translate("changePass")}
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{
                    marginLeft: 5,
                    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate("Currency");
                }}
              >
                <Text body2 style={{ fontFamily: "Cairo-Light" }}>
                  Currency
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text body2 grayColor style={{ fontFamily: "Cairo-Light" }}>
                    USD
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={BaseColor.primaryColor}
                    style={{
                      marginLeft: 5,
                      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.profileItem}>
                <Text body2 style={{ fontFamily: "Cairo-Light" }}>
                  Reminders
                </Text>
                <Switch
                  name="angle-right"
                  size={18}
                  trackColor={{ true: "#E9446A" }}
                  onValueChange={this.toggleSwitch}
                  value={this.state.reminders}
                />
              </View>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate("BookingHistory");
                }}
              >
                <Text body2 style={{ fontFamily: "Cairo-Light" }}>
                  Booking History
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate("Coupons");
                }}
              >
                <Text body2 style={{ fontFamily: "Cairo-Light" }}>
                  Coupons
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 20 }}></View>

            <Button full onPress={() => this.toggleLanguageonChange()}>
              <Text style={{ color: "white", fontFamily: "Cairo-Light" }}>
                {internationalization.getCurrentLocale() == "ar"
                  ? "Switch To English"
                  : "اختر اللغة العربية"}
              </Text>
            </Button>
            <View style={{ padding: 10 }}></View>
            <Button
              style={{
                height: 56,
                borderRadius: 8,
                backgroundColor: "#E9446A",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
                width: "100%"
              }}
              loading={loading}
              onPress={() => this.onLogOut()}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Cairo-Bold"
                }}
              >
                {internationalization.translate("signOut")}
              </Text>
            </Button>
            <Text style={{ marginTop: 20, marginBottom: 20, color: "#cecece" }}>
              {footer}
            </Text>
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
)(Profile);
