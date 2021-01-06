//import liraries
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
const { width, height } = Dimensions.get("window");
export const MIN_HEIGHT = 150;
export const MAX_HEIGHT = height / 2;

export interface Item {
  title: string;
  subtitle: string;
  picture: number;
  top: number;
}

interface ItemProps {
  index: number;
  y: Animated.SharedValue<number>;
  item: Item;
}
// define your styles
const styles = StyleSheet.create({
  container: {
    width,
    height: MIN_HEIGHT,
    justifyContent: 'flex-end'
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  titleContainer: {
    maxHeight: MAX_HEIGHT * 0.61,
    justifyContent: 'center',
    flex: 1
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  mainTitle: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    padding: 32,
    transform: [{ translateY: 64 }],
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '500'
  },
});

// create a component
const Item = ({ index, y, item: { title, subtitle, picture, top } }: ItemProps) => {
  const style = useAnimatedStyle(() => {
    return {
      height: interpolate(
        -y.value,
        [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
        [MIN_HEIGHT, MAX_HEIGHT],
        Extrapolate.CLAMP
      ),
      top: y.value,
    };
  });
  const pictureStyle = useAnimatedStyle(() => ({
    height: MAX_HEIGHT,
    top: interpolate(
      - y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [-top, 0]
    )
  }))
  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      - y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP
    )
    return {
      opacity
    }
  })
  return (
    <Animated.View key={index} style={[styles.container, style]}>
      <Animated.Image source={picture} style={[styles.picture, pictureStyle]} />
      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>{subtitle.toUpperCase()}</Text>
        <View style={styles.mainTitle}>
          <Animated.View style={titleStyle}>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};


//make this component available to the app
export default Item;
