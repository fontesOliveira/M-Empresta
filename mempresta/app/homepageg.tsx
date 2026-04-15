import {
  Pressable,
  Text,
  View
} from 'react-native';

import Menu from '../components/menu';
import Cards from '../components/cards';

export default function HomepageU() {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'column' }}>
      <Menu />
      <Cards />
      <Pressable style={{
        width: "100%",
        height: 250,
        backgroundColor: '#cfdd10',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
      }} onPress={() => console.log('Ler QRCode')}>
        <Text>Ler QRCode</Text>
      </Pressable>
    </View>
  );
}