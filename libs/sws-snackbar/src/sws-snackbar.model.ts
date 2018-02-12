export class Alert {
  type: AlertType;
  message: string;
}

export enum AlertType {
  Success,
  Error
}

export class AlertMessage {
  success: string;
  error: string;
  warning: string;
}
