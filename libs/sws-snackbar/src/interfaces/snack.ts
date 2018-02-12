export interface ISnackbar {
  message?: IMesssage;
  type: IType;
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
