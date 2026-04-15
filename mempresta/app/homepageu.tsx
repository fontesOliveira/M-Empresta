import {
  Pressable,
  Text,
  View
} from 'react-native';

import { useRouter } from 'expo-router';

import Menu from '../components/menu';
import Cards from '../components/cards';

export default function HomepageU() {
  const router = useRouter();


  const handleLerQRCode = () => {
    router.push('/readqrcode');
  }


  return (
    <View style={{ alignItems: 'center', flexDirection: 'column' }}>
      <Menu />
      <Cards />
      <Pressable style={{
        width: "100%",
        height: 250,
        backgroundColor: '#0fc865',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
      }} onPress={handleLerQRCode}>
        <Text>Ler QRCode</Text>
      </Pressable>
    </View>
  );
}