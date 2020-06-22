import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }
  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }

  /* getPromotion(id: string): Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  }  
   
  getPromotion(id: string): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  }
  
  getFeaturedPromotion(): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }*/
  
  /* getPromotion(id: string): Promise<Promotion[]> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(PROMOTIONS), 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    });
  }*/
 
  getPromotion(id: string): Observable<Promotion> {
    //return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
	return this.http.get<Promotion>(baseURL + 'promotions/' + id)
	.pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    //return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
	return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }
  

}
