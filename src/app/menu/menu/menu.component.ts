import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
// Service
import {UserService} from '../../service/user.service';
import {MenuService} from "../../service/menu.service";

// Notify
import Notify from '../../utils/notify';

declare let $: any;

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: [UserService, MenuService]
})
export class MenuComponent implements OnInit {

    loadingData: Boolean = true;

    // data
    name: string = '';
    email: string = '';
    avata: string = null;
    menu: any[] = [];
    breadcrumb: any[] = [];

    //
    loadingTable: Boolean = true;
    DataMenu: any[] = [];
    idUpdate: number = -1;

    page = 1;
    numberPage = 1;

    constructor(private userService: UserService, private menuService: MenuService, private activatedRoute: ActivatedRoute, public route: Router) {
    }

    ngOnInit() {
        this.getDataUser();
        this.getMenu();
        this.getParam();
    }

    getParam() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            let page = Number(params.get('page'));
            if (page != null && page != 0) {
                this.page = page;
            } else {
                this.page = 1;
            }
            this.getDataMenu();
        });
    }

    getDataUser() {
        if (localStorage.getItem('id') == null) {
            this.userService.getUser()
                .then(res => {
                    console.log(res);
                    if (res.succ) {
                        setTimeout(() => {
                            this.loadingData = false;
                            this.name = localStorage.getItem(res.data.name);
                            this.email = localStorage.getItem(res.data.email);
                            this.avata = localStorage.getItem(res.data.avata);
                            localStorage.setItem('id', res.data.id);
                            localStorage.setItem('name', res.data.name);
                            localStorage.setItem('email', res.data.email);
                            localStorage.setItem('avata', res.data.avata);
                            localStorage.setItem('time', '1');
                        }, 1000);
                    } else {
                        localStorage.removeItem('token');
                        localStorage.removeItem('id');
                        localStorage.removeItem('name');
                        localStorage.removeItem('email');
                        localStorage.removeItem('avata');
                        localStorage.removeItem('time');
                        setTimeout(res => {
                            this.route.navigate(['/login']);
                        }, 500);
                    }
                })
                .catch(err => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    localStorage.removeItem('name');
                    localStorage.removeItem('email');
                    localStorage.removeItem('avata');
                    localStorage.removeItem('time');
                    setTimeout(res => {
                        this.route.navigate(['/login']);
                    }, 500);
                })
        } else {
            this.loadingData = false;
            this.name = localStorage.getItem('name');
            this.email = localStorage.getItem('email');
            this.avata = localStorage.getItem('avata');
        }

    }

    getDataMenu() {
        this.menuService.getMenuAll(this.page, 10)
            .then(res => {
                console.log(res);
                if (res.succ) {
                    this.DataMenu = res.data.data;
                    this.numberPage = parseInt((Number(res.data.count) % 10).toString()) == 0 ? parseInt((Number(res.data.count) / 10).toString()) : parseInt((Number(res.data.count) / 10).toString()) + 1;
                } else {
                    this.DataMenu = [];
                }
                this.loadingTable = false;
            })
            .catch(err => {
                this.loadingTable = false;
            });
    }

    getMenu() {
        this.menuService.getMenu()
            .then(res => {
                console.log(res);
                if (res.succ) {
                    this.menu = res.data;
                } else {
                    this.menu = [];
                }
            })
            .catch(err => {
                this.menu = [];
            });
    }

    showModalDel(id: number) {
        this.idUpdate = id;
        $('#myModalDel').modal('show');
    }

    onDelete() {
        const id = this.idUpdate;
        this.menuService.onDelete(id)
            .then(res => {
                if (res.succ) {
                    this.DataMenu = this.DataMenu.filter(res => res.id !== id);
                    Notify('glyphicon glyphicon-warning-sign', '', 'Xóa menu thành công', 'success');
                } else {
                    Notify('glyphicon glyphicon-warning-sign', '', 'Xóa menu thất bại', 'danger');
                }
                $('#myModalDel').modal('hide');
            })
            .catch(err => {
                $('#myModalDel').modal('hide');
                Notify('glyphicon glyphicon-warning-sign', '', 'Xóa menu thất bại', 'danger');
            })
    }

}
