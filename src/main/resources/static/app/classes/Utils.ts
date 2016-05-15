import {Observable} from 'rxjs/Observable';

export function withObserver<T>(data: T): Observable<T> {
  return Observable.create(observer => {
    observer.next(data);
    observer.complete();
  });
}
