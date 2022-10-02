
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    exports: [MatIconModule, MatToolbarModule, MatMenuModule, MatTabsModule]
})
export class MaterialsModules {

    
}