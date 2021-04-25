/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable camelcase */
import React, { useCallback, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  BarCodeReadEvent,
  RNCamera,
  TakePictureOptions,
} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

import {
  View,
  TextInput,
  Vibration,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';

import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { cos } from 'react-native-reanimated';
import { Container } from '../Dashboard/styles';

interface ScannerDataProps {
  app_id: number;
  dev_id: number;
}

const Dashboard: React.FC = () => {
  const [activate, setactivate] = useState<boolean>(true);
  const navigate = useNavigation();

  const showData = (scanned: BarCodeReadEvent) => {
    Vibration.vibrate(300);
    console.log(scanned.data);
    const log: ScannerDataProps = JSON.parse(scanned.data);
    console.log(log.app_id);
    navigate.navigate('Details', log);
  };

  return (
    <>
      <Container>
        <RNCamera
          onBarCodeRead={data => showData(data)}
          style={styles.preview}
          type="back"
          useCamera2Api
        >
          <BarcodeMask
            width="85%"
            height="40%"
            edgeBorderWidth={8}
            edgeWidth={30}
            edgeHeight={30}
            edgeRadius={12}
            edgeColor="#3b9900"
            showAnimatedLine
            animatedLineColor="#3b9900"
            animatedLineWidth="80%"
            animatedLineHeight={6}
            lineAnimationDuration={800}
            outerMaskOpacity={0.8}
          />
        </RNCamera>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '120%',
  },
  stop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '0%',
  },
});

export default Dashboard;
