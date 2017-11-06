import notification  from 'antd/lib/notification';

export default class NotificationUtils {
  static notificationError = (message: any, description: any, duration:any) => {
    return notification.error({
      message,
      description,
      duration: duration || 3
    });
  }

  static notificationSuccess = (message: any, description: any, duration:any) => {
    return notification.success({
      message,
      description,
      duration: duration || 3
    })
  }
}
