import { Document } from 'mongoose';

// Tipos possíveis para ações
export enum EActionType {
  BUTTON = 'button',
  LINK = 'link',
  DROPDOWN = 'dropdown',
}

export enum EActionStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark',
  LINK = 'link',
}

export enum ETypeNotification {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  ALERT = 'alert',
  DEFAULT = 'default',
}

export enum ENotificationActionMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface INotificationAction {
  type: EActionType;
  label: string;
  action?: string; // identificador da ação no frontend
  url?: string;
  method?: ENotificationActionMethod;
  payload?: Record<string, any>;
  style?: EActionStyle;
}

export interface INotificationDTO {
  user?: string;
  title?: string;
  message?: string;
  type?: ETypeNotification;
  is_read?: boolean;
  expiresAt?: Date;
  metadata?: any;
  actions?: INotificationAction[];

  updated_by?: string;
  created_by?: string;
}

export interface INotificationDocument extends INotificationDTO, Document {}
