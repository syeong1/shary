import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { RatingComponent } from './rating/rating.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [RatingComponent],
    imports:[CommonModule],
    exports: [RatingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule{}