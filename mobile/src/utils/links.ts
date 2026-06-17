import { Alert, Linking } from 'react-native';

export function openRetailerUrl(url: string) {
  Linking.openURL(url).catch(() => {
    Alert.alert('Could not open link', 'This product link is unavailable right now.');
  });
}
