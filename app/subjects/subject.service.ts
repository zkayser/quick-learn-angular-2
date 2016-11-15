import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { Deck } from '../decks/deck';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubjectService {
  private apiKey: string = 'bJm46fpjBZ97JnmI_6cIa3b9S6udG9AB';
  private decksUrl: string = 'https://api.mlab.com/api/1/databases/quick-learn/collections/decks';
  private subjectsUrl: string = 'https://api.mlab.com/api/1/databases/quick-learn/collections/subjects';
  
  constructor(private http: Http) {}
  

  getSubjects() {
    return this.http.get(this.subjectsUrl + '?apiKey=' + this.apiKey)
      .map((response: Response) => response.json());
  }
  
  getSubject(id: string) {
    let subject$ = this.http.get(this.subjectsUrl + '/' + id + '?apiKey=' + this.apiKey)
      .map((response: Response) => response.json());
    return subject$;
  }
  
  addSubject(subject: Subject) {
    let body = JSON.stringify({subject});
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.subjectsUrl + '?apiKey=' + this.apiKey, body, options)
      .map(res => res.json());
  }
}