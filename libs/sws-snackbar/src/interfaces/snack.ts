export interface ISnackbar {
  sMessage?: any;
  sType?: any;
  eType?: any;
  eMessage?: string;
  message?: IMesssage;
  // type?: IType;
  type?: any;
  position?: IPosition;
}
export interface IMesssage {
  successMsg?: string;
  errorMsg?: string;
  warnMsg?: string;
}
export interface IType {
  successType?: boolean;
  errorType?: boolean;
  warnType?: boolean;
}
export interface IPosition {
  right?: boolean;
  left?: boolean;
}
