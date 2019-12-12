import React, { Component } from "react";
import { StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { View, TouchableOpacity, ScrollView, I18nManager } from "react-native";
import { bindActionCreators } from "redux";
import { SafeAreaView, Text, Button, Image, Icon } from "@components";
import Swiper from "react-native-swiper";
import { BaseColor, BaseStyle, Images } from "@config";
import * as Utils from "@utils";
import internationalization from "../../config/internationalization";

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  image: {
    width: 320,
    height: 320
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16
  }
});

const slides = [
  {
    key: "somethun",
    title: "board1title",
    text: "board1body",
    icon: "bicycle",
    colors: ["#63E2FF", "#B066FE"]
  },
  {
    key: "somethun1",
    title: "board2title",
    text: "board2body",
    icon: "globe",
    colors: ["#A3A1FF", "#3A3897"]
  },
  {
    key: "somethun2",
    title: "board3title",
    text: "board3body",
    icon: "calendar",
    colors: ["#29ABE2", "#4F00BC"]
  }
];

class Onboarding extends Component {
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

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="check"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-right"
          size={20}
          color="white"
          style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
        />
      </View>
    );
  };
  _renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-left"
          size={20}
          color="white"
          style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
        />
      </View>
    );
  };
  _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="times"
          size={20}
          color="white"
          style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
        />
      </View>
    );
  };
  _renderItem = ({ item, dimensions }) => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          flex: 1,
          paddingTop: item.topSpacer,
          paddingBottom: item.bottomSpacer,
          width: dimensions.width
        }
      ]}
      colors={item.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <View style={{ alignItems: "center" }}>
        <Icon
          style={{ backgroundColor: "transparent", alignItems: "center" }}
          name={item.icon}
          size={200}
          color="white"
          name={item.icon}
        />
        <Text style={styles.title}>
          {internationalization.translate(`${item.title}`)}
        </Text>
        <Text style={styles.text}>
          {internationalization.translate(`${item.text}`)}
        </Text>
      </View>
    </LinearGradient>
  );

  render() {
    const { navigation } = this.props;

    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        // bottomButton
        showPrevButton
        showSkipButton
        //hidePagination
        // hideNextButton
        //hideDoneButton
        onSkip={() => navigation.navigate("Home")}
        onDone={() => navigation.navigate("Home")}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        renderPrevButton={this._renderPrevButton}
        renderSkipButton={this._renderSkipButton}
      />
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
)(Onboarding);
