import { View } from 'native-base';
import React from 'react';

interface Props {
  children: React.ReactElement;
}

/* 
Used to create a consistent margin between screens. Different styling than navigation. 
*/
export default function ScreenWrapper({ children }: Props) {
  return <View m={4}>{children}</View>;
}
