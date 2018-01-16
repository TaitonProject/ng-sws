export interface IModalOptions {
  title?: string; 
  width?: string;
  type?: IModalBtnType;
  dataModal?: any;
}
export interface IModalBtnType {
  block?: boolean;
  delete?: boolean; 
  read?: boolean;
}