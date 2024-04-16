import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'restro-help',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
