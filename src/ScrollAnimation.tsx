//import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, withSpring } from 'react-native-reanimated';
import { clamp, snapPoint } from 'react-native-redash';
import Item, { MAX_HEIGHT } from './component/Item';
import { items } from './data';

const snapPoints = items.map((_, i) => -i * MAX_HEIGHT);
const minY = Math.min(...snapPoints);
const maxY = Math.max(...snapPoints);


// define your styles
const styles = StyleSheet.create({
  container: {
    height: items.length * MAX_HEIGHT,
    backgroundColor: 'black'
  },
});


// create a component
const ScrollAnimation = () => {
  const y = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { offsetY: number }>({
    onStart: (_, ctx) => {
      ctx.offsetY = y.value;
    },
    onActive: ({ translationY }, ctx) => {
      y.value = clamp(ctx.offsetY + translationY, minY, maxY);
    },
    onEnd: ({ velocityY }, ctx) => {
      const to = snapPoint(y.value, velocityY, snapPoints);
      y.value = withSpring(to, { overshootClamping: true })
    }
  })

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} >
      <Animated.View style={styles.container}>
        {items.map((item, index) => {
          return <Item key={index} y={y} item={item} index={index} />
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

//make this component available to the app
export default ScrollAnimation;
