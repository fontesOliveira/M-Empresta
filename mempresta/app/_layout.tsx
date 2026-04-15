import { Stack, Navigator } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homepageu"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homepageg"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="readqrcode"
        options={{ headerShown: false }}
      />

    </Stack>
  );
}
