import { NgModule } from '@angular/core';
import{ CommonModule } from '@angular/common';

// containers 
import { SearchComponent } from './containers/search/search.component';

// services
import { SearchService } from './search.service';

@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        SearchService
    ],
    exports: [
        SearchComponent
    ]
})
export class SearchModule {}