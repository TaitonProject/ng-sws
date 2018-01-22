export abstract class LoadingState {
  public loading: boolean;
  public notFound: boolean;
  public error: boolean;

  finishLoad(data: any) {
    console.log('finishLoad')
    this.error = false;
    this.loading = false;
    if (data == null) {
      this.notFound = true;
    } else {
      this.notFound = false;
    }
  }

  startLoad() {
    console.log('startLoad')
    this.error = false;
    this.notFound = false;
    this.loading = true;
  }

  errorLoad(error: any){
    console.log('errorLoad')
    this.error = true;
    this.loading = false;
    console.error(error);
  }
}
