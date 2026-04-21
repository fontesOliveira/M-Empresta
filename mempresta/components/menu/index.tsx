import { useNavigation } from '@react-navigation/native';

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
import Authentication from '@/context/authentication';

export default function Menu() {
    const router = useRouter();

    const [MenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!MenuOpen);
        console.log('Menu toggled:', !MenuOpen);
    }

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
        switch (item) {
            case 'Ler QRCode':
                router.push('./../../readqrcode');
                break;
            case 'Histórico':
                router.push('./../../history');
                break;
            case 'Sair':
                const auth = new Authentication();
                auth.logout();
                router.replace('./../../login');
                break;
        }
        setIsMenuOpen(false);
    };


    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', left: 20 }}>
                <Pressable onPress={handleMenuToggle} >
                    <AntDesign name="menu" size={34} color="black" />
                </Pressable>

                {/* Menu suspenso */}
                {MenuOpen && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.item} onPress={() => handleMenuItemPress('Ler QRCode')}>
                            <Text style={styles.itemText}>Ler QRCode</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item } onPress={() => handleMenuItemPress('Histórico')}>
                            <Text style={styles.itemText}>Histórico</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => handleMenuItemPress('Sair')}>
                            <Text style={styles.itemText}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
            <View>
                <Text style={styles.titulo}>M'Empresta</Text>
            </View>
            <View style={{ position: 'absolute', right: 20, marginTop: 60 }}>
                <Perfil width={50} height={50} />
            </View>
        </View >
    )
}