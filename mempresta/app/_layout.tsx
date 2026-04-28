import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homepageu"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="homepageg"
        options={{ headerShown: false,
          gestureEnabled: false,
         }}
      />
      <Stack.Screen
        name="readqrcode"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="history"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="cadastrados"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="record"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
