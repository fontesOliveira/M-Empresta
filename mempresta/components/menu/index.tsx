import {
    View,
    Text,
    Pressable,
    TouchableOpacity
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

import Perfil from '../perfil';
import { styles } from './styles';
// Importação correta
import { useAuthentication } from '@/controller/context/authentication';

export default function Menu() {
  const router = useRouter();
  const [MenuOpen, setIsMenuOpen] = useState(false);

  // Hook de autenticação
  const auth = useAuthentication();

  const handleMenuToggle = () => {
    setIsMenuOpen(!MenuOpen);
  };

  const handleMenuItemPress = (item: string) => {
    switch (item) {
      case 'Ler QRCode':
        router.push('./../../readqrcode');
        break;
      case 'Histórico':
        router.push('./../../history');
        break;
      case 'Cadastros':
        router.push('./../../cadastrados');
        break;
      case 'Gerenciar Acervo':
        router.push('./../../record');
        break;
      case 'Sair':
        auth.logout(); // ✅ usa o hook
        router.replace('./../../login');
        break;
      case 'Novo Item':
        router.push('./../../record');
        break;
    }
    setIsMenuOpen(false);
  };

  const menuItems =
    auth.getAccountType() === 'G'
      ? ['Novo Item', 'Cadastros', 'Sair']
      : ['Ler QRCode', 'Histórico', 'Sair'];

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', left: 20 }}>
        <Pressable onPress={handleMenuToggle}>
          <AntDesign name="menu" size={34} color="black" />
        </Pressable>

        {MenuOpen && (
          <View style={styles.dropdown}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.item}
                onPress={() => handleMenuItemPress(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View>
        <Text style={styles.titulo}>M'Empresta</Text>
      </View>

      <View style={{ position: 'absolute', right: 20, marginTop: 60 }}>
        <Perfil width={50} height={50} />
      </View>
    </View>
  );
}
