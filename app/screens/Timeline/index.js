import React, { Component } from "react";
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View,
  RefreshControl,
  FlatList,
  I18nManager // Container component
} from "react-native";

import { BaseStyle, BaseColor } from "@config";
import { PostItem, ProfileAuthor, SafeAreaView } from "@components";
import Tabs from "./tabs";
import postStyles from "./styles";
import internationalization from "../../config/internationalization";
import { FloatingAction } from "react-native-floating-action";

// Load sample data
import { PostData } from "@data";
import { myPostData } from "@data";

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      posts: PostData,
      myposts: myPostData
    };
  }
  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={BaseStyle.safeAreaView}>
        <Tabs>
          {/* First tab */}
          <View title="حائط جدة" style={styles.content}>
            <FlatList
              refreshControl={
                <RefreshControl
                  colors={[BaseColor.primaryColor]}
                  tintColor={BaseColor.primaryColor}
                  refreshing={this.state.refreshing}
                  onRefresh={() => {}}
                />
              }
              data={this.state.posts}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <PostItem
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  onPress={() => navigation.navigate("PostDetail")}
                >
                  <ProfileAuthor
                    image={item.authorImage}
                    name={item.name}
                    description={item.detail}
                    style={{ paddingHorizontal: 20 }}
                  />
                </PostItem>
              )}
            />
            <FloatingAction
              color="#E9446A"
              distanceToEdge={10}
              position="left"
              animated={false}
              showBackground={false}
              onPressMain={() => {
                console.log(`selected button`);
              }}
            />
          </View>
          {/* Second tab */}
          <View title="حائطك" style={styles.content}>
            <FlatList
              refreshControl={
                <RefreshControl
                  colors={[BaseColor.primaryColor]}
                  tintColor={BaseColor.primaryColor}
                  refreshing={this.state.refreshing}
                  onRefresh={() => {}}
                />
              }
              data={this.state.myposts}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <PostItem
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  onPress={() => navigation.navigate("PostDetail")}
                >
                  <ProfileAuthor
                    image={item.authorImage}
                    name={item.name}
                    description={item.detail}
                    style={{ paddingHorizontal: 20 }}
                  />
                </PostItem>
              )}
            />
            <FloatingAction
              color="#E9446A"
              distanceToEdge={10}
              position="right"
              animated={false}
              showBackground={false}
              onPressMain={() => {
                console.log(`selected button`);
              }}
            />
          </View>
        </Tabs>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  // App container
  container: {
    flex: 1, // Take up all screen
    backgroundColor: "#FFFFFF"
    // Background color
  },
  // Tab content container
  content: {
    flex: 1, // Take up all available space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#FFFFFF" // Darker background for content area
  },
  // Content header
  header: {
    margin: 10, // Add margin
    color: "#E91E63", // White color
    fontFamily: "Avenir", // Change font family
    fontSize: 26 // Bigger font size
  },
  // Content text
  text: {
    marginHorizontal: 20, // Add horizontal margin
    color: "rgba(255, 255, 255, 0.75)", // Semi-transparent text
    textAlign: "center", // Center
    fontFamily: "Avenir",
    fontSize: 18
  }
});
