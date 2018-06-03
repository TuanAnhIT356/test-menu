import {Component, OnInit, Input} from '@angular/core';
@Component({
    selector: 'app-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

    // data
    @Input() route: string;
    @Input() page: number;
    @Input() numberPage: number;

    constructor() {
    }

    ngOnInit() {
    }

    // counter
    counter(page) {
        //noinspection TypeScriptUnresolvedFunction
        if (page <= 10) {
            return Array(parseInt(page)).fill(1, 0, parseInt(page)).map((x, i) => i + 1);
        } else {
            const array = Array();
            if (this.page < 5) {
                for (let i = 1; i <= 10 && i <= page; i++) {
                    array.push(i);
                }
                array.push("...");
                array.push(page);
            } else if (this.page > page - 5) {
                array.push(1);
                array.push("...");
                for (let i = this.page - 3; i <= this.page + 7 && i <= page; i++) {
                    array.push(i);
                }
            } else {
                array.push(1);
                array.push("...");
                for (let i = this.page - 3; i <= this.page + 7 && i <= page; i++) {
                    array.push(i);
                }
                array.push("...");
                array.push(page);
            }
            return array;
        }

    }

}
