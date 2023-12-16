import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.taskify1',
  appName: 'taskify',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
    "plugins": {
      "PushNotifications": {
        "presentationOptions": ["badge", "sound", "alert"]
      }
    }
};

export default config;
