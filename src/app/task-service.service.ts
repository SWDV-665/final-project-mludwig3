import { Injectable } from '@angular/core';
import { getName } from 'ionicons/dist/types/components/icon/utils';
import { Observable, catchError, map, Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';


@Injectable

  ({
    providedIn: 'root'
  })

//Task  class

export class TaskServiceService {
  tasks: any = [];

  dataChanged$!: Observable<boolean>;

  private dataChangeSubject!: Subject<boolean>;

  baseURL = "https://dddc-204-186-231-38.ngrok-free.app/api/taskify"; 

  constructor(private https: HttpClient) {
    console.log('Hello');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();

  }
  

  getTasks(): Observable<object[]> {

    let headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '100'
    });

    return this.https.
    get(this.baseURL,{headers :headers }).pipe(
      map(this.extractData),
      catchError(err => { throw err })
    );
  }

  private extractData(res: Response | any) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // Handle or log the error as needed
    console.error(errMsg);
    return new Observable<never>(); // You might want to return a more meaningful observable here.
  }

  removeTask(id: any) {
    let headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '100'
    });

    console.log("#### Remove Task -id =", id)
    this.https.delete(this.baseURL + "/" +id, {headers:headers }).subscribe(res => {
      this.tasks = res;
      this.dataChangeSubject.next(true);
    });
  }
  addTask(task: any) {
    console.log(task);
    this.https.post(this.baseURL, task, ).subscribe(res => {
      this.tasks = res;
      this.dataChangeSubject.next(true);
    });
  }

  editTask(task: any, index: number, id: any) {
    console.log(task)
    console.log(this.baseURL +id, task);
    this.https.put(this.baseURL + "/"  + id, task).subscribe(res => {
      console.log("RESULT");
      this.tasks = res;
      this.dataChangeSubject.next(true);
    });
  }
}