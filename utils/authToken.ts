import * as SecureStore from 'expo-secure-store';

let accessTokenMemory: string | null = null;

export async function saveTokens(accessToken: string, refreshToken: string) {
  accessTokenMemory = accessToken;
  await SecureStore.setItemAsync(
    process.env.EXPO_PUBLIC_REFRESH_TOKEN_SECRET!,
    refreshToken
  );
}

export function setAccessTokenToMemory(token: string | null) {
  accessTokenMemory = token;
}

export function getAccessTokenFromMemory() {
  return accessTokenMemory;
}

export async function getRefreshTokenFromSecureStore() {
  return await SecureStore.getItemAsync(
    process.env.EXPO_PUBLIC_REFRESH_TOKEN_SECRET!
  );
}

export async function deleteTokens() {
  accessTokenMemory = null;
  await SecureStore.deleteItemAsync(
    process.env.EXPO_PUBLIC_REFRESH_TOKEN_SECRET!
  );
}
