import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// Service
import {UserService} from '../../service/user.service';

// Notify
import Notify from '../../utils/notify';

@Component({
    selector: 'app-top-header',
    templateUrl: './top-header.component.html',
    styleUrls: ['./top-header.component.css'],
    providers: [UserService]
})
export class TopHeaderComponent implements OnInit {

    @Input() name: string = '';
    @Input() email: string = '';
    @Input() avata: string = null;

    constructor(public userService: UserService,public route: Router) {
    }

    ngOnInit() {
    }

    logOut() {
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('avata');
        localStorage.removeItem('time');
        localStorage.removeItem('token');
        this.userService.token = null;
        setTimeout(res => {
            this.route.navigate(['/login']);
        }, 500);
        // Notify('glyphicon glyphicon-warning-sign', '', 'Log out thành công', 'success');
    }

}
