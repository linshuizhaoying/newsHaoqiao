import { notification } from 'antd';

export default class NotificationUtils {
  static notificationError = (message: any, description: any, duration:any) => {
    notification.error({
      message,
      description,
      duration: duration || 3
    });
  }

  static notificationSuccess = (message: any, description: any, duration:any) => {
    notification.success({
      message,
      description,
      duration: duration || 3
    })
  }
}
