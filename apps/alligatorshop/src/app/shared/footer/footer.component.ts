import { Component } from '@angular/core';
import * as moment from 'moment';


@Component({
    selector: 'alligatorshop-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    currentYear = moment().year();
}
