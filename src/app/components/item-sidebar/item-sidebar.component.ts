import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-item-sidebar',
    templateUrl: './item-sidebar.component.html',
    styleUrls: ['./item-sidebar.component.css']
})
export class ItemSidebarComponent implements OnInit {

    @Input() menu: any[];

    constructor() {
    }

    ngOnInit() {
    }

}
