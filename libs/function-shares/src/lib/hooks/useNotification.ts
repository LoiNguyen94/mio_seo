import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Dialog } from '@capacitor/dialog';
// import { Clipboard } from '@capacitor/clipboard';
import { Haptics } from '@capacitor/haptics';
// import { Dialog } from '@capacitor/dialog';
// import { LocalNotifications } from '@capacitor/local-notifications';
const isPushNotificationsAvailable =
  Capacitor.isPluginAvailable('PushNotifications');

// const writeToClipboard = async (token: string) => {
//   await Clipboard.write({
//     string: token,
//   });
// };

export const useNotification = () => {
  const isClient = typeof window === 'object';
  let permission = '';
  let tokenk = '';
  // let rrtokenk = '';

  if (Capacitor.isNative) {
    PushNotifications.requestPermissions().then((result: any) => {
      permission = JSON.stringify(result) + ' permission';
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: any) => {
    //   writeToClipboard(token['value']);
      tokenk = JSON.stringify(token);
    });

    // // Some issue with our setup and push will not work
    // PushNotifications.addListener('registrationError', (error: any) => {
    //   rrtokenk = JSON.stringify(error);
    // });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: any) => {
        await Haptics.vibrate();
        Dialog.alert({
          title: 'PushNotifications',
          message: JSON.stringify(notification),
        });
        //   handleIncomingNotification(notification);
      }
    );

    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   (res: any) => {
    //     console.log(res);
    //   }
    // );
  }
};
