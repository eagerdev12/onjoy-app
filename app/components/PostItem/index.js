import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Icon } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor } from "@config";
export default class PostItem extends Component {
  render() {
    const { style, children, title, description, onPress, image } = this.props;
    return (
      <View style={style}>
        <View>
          {children}
          {image ? <Image style={styles.imagePost} source={image} /> : null}

          {/* <Image style={styles.imagePost} source={image} /> */}
          <Icon
            name="heart"
            Regular
            size={24}
            color={BaseColor.primaryColor}
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={onPress}
          />
        </View>

        <View style={styles.content}>
          {/* <Text headline semibold style={{ marginBottom: 6 }}>
            {title}
          </Text> */}
          <Text body1 style={{ paddingTop: 5, textAlign: "left" }}>
            {description}
          </Text>
        </View>
      </View>
    );
  }
}

PostItem.propTypes = {
  image: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
  onPress: PropTypes.func
};

PostItem.defaultProps = {
  image: "",
  title: "",
  description: "",
  style: {},
  onPress: () => {}
};
