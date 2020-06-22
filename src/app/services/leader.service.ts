import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }
 
 /* getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }
  
  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }*/
  
  /* getLeaders(): Promise<Leader[]> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS), 2000);
    });
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });
  }*/
  
  getLeaders(): Observable<Leader[]> {
    //return of(LEADERS).pipe(delay(2000));
	return this.http.get<Leader[]>(baseURL + 'leaders')
	.pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
   // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
	return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
