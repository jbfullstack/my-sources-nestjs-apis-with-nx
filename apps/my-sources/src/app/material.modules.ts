
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
    exports: [
        MatIconModule, MatToolbarModule, MatMenuModule, 
        MatTabsModule, MatCardModule, MatExpansionModule, 
        MatSelectModule, ScrollingModule, MatTooltipModule,
        MatButtonModule, MatCheckboxModule, MatProgressBarModule,
        MatButtonToggleModule, MatChipsModule, MatAutocompleteModule
    ]
})
export class MaterialsModules {

    
}