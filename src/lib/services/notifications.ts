// Notifications service
export function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission();
  }
}

export function notify(title: string, body: string) {
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  }
}
