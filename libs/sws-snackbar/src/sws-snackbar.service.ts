import {Injectable} from "@angular/core";

@Injectable()
export class SwsSnackBarService {
  sm: string;
  em: string;

  constructor() {
  }

  successMessage( message: string) {
    this.sm = message;
    console.log('message su!', this.sm);
  }

  errorMessage( message: string) {
    this.em = message;
    console.log('message er!', this.em);
  }

  /*    getError( errorMessage ) {
          switch ( errorMessage.status ) {
              case 500: {
                  this.snackBar.open( 'Сервер недоступен. Попробуйте обновить позже!', 'Закрыть', {
                      duration: 5000,
                      horizontalPosition: 'right',
                      extraClasses: "snack-error"
                  } );
                  break;
              }
              case 200: {
                  this.snackBar.open( 'Некоторые данные отсутствуют на сервере.', 'Закрыть', {
                      duration: 5000,
                      horizontalPosition: 'right',
                      extraClasses: "snack-error"
                  } );
                  break;
              }
              case 0: {
                  this.snackBar.open( 'Данный url недоступен.', 'Закрыть', {
                      duration: 5000,
                      horizontalPosition: 'right',
                      extraClasses: "snack-error"
                  } );
                  break;
              }
              default: {
                  this.snackBar.open( 'Некоторые данные отсутствуют на сервере.', 'Закрыть', {
                      duration: 5000,
                      horizontalPosition: 'right',
                      extraClasses: "snack-error"
                  } );
                  break;
              }
          }
      }*/
}
