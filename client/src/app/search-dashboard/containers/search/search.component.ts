import { Component, OnInit } from '@angular/core';

import { Hero } from '../../models/hero.interface';
import { SearchService } from '../../search.service';

// RXJS imports
import { Subject }           from 'rxjs/Subject';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
    selector: 'alternative-search-dashboard',
    template: `
       <div class="search-form">
            <form>
                <div>
                    <input type="text" placeholder="Alternative x-men" #searchField id="search-box" (keyup)="search(searchField.value)">
                </div>
            </form>
       </div>

       <ul>
            <li *ngFor="let hero of heroes"> {{hero.name}} - ( {{ hero.nick }} )</li>
       </ul>

    `,
    styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {

    heroes:Hero[];

    /* A Subject is a producer of an observable event stream; searchTerms produces an Observable of strings, 
    the filter criteria for the name search. */
    private searchTerms = new Subject<string>();

    constructor(
        private service:SearchService
    ){ }

    ngOnInit(){

        this.searchTerms
        .debounceTime(300)        // wait for 300ms pause in events
        .distinctUntilChanged()   // ignore if next search term is same as previous
        .switchMap( query => query ? this.service.searchForHero(query) : Observable.of<any>([]))
        .map(res => res.json() as Hero[])
        .catch(error => {
            console.log(error);
            return Observable.of<Hero[]>([]);
        })
        .subscribe( (heroes : Hero[]) => {
            this.heroes = heroes;
        });       
    }

    search(term:string){
        // Push a search term into the Subject-s  observable stream.    
        if(term.length > 0) { this.searchTerms.next(term);  }
                 
    }
    


}