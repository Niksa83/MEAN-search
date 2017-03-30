import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Hero } from './models/hero.interface';

const API_URL = '/api/heroes/search';

@Injectable()
export class SearchService {

  constructor(
        private http: Http
    ){}

	searchForHero(term :string) {
	   let params = new URLSearchParams();
	    params.set('name', term); // the user's search value

		return this.http
         .get(API_URL, { search: params });

	}

}