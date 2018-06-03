import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
// Service
import {UserService} from '../../service/user.service';
import {MenuService} from "../../service/menu.service";

// Notify
import Notify from '../../utils/notify';

@Component({
    selector: 'app-create-menu',
    templateUrl: './create-menu.component.html',
    styleUrls: ['./create-menu.component.css'],
    providers: [UserService, MenuService]
})
export class CreateMenuComponent implements OnInit {

    loadingData: Boolean = true;

    // data
    name: string = 'tuấn anh';
    email: string = 'tuananh@gmail.com';
    avata: string = '';
    menu: any[] = [];
    breadcrumb: any[] = [];

    // form
    form: FormGroup;
    inputname: FormControl;
    inputroute: FormControl;
    inputsort: FormControl;
    inputdescription: FormControl;
    inputparents: FormControl;
    @ViewChild('inputN') inputN: ElementRef;
    @ViewChild('inputR') inputR: ElementRef;
    // loading
    loading: Boolean = false;

    constructor(private userService: UserService, private menuService: MenuService,
                public route: Router,private location: Location) {
    }

    ngOnInit() {
        this.createForm();
        this.getMenu();
        this.getDataUser();
    }

    getDataUser() {
        if (localStorage.getItem('id') == null) {
            this.userService.getUser()
                .then(res => {
                    console.log(res);
                    if (res.succ) {
                        setTimeout(() => {
                            this.loadingData = false;
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

    createFormControls() {
        this.inputname = new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)
        ]);
        this.inputroute = new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
        ]);
        this.inputsort = new FormControl();
        this.inputdescription = new FormControl();
        this.inputparents = new FormControl();
    }

    createForm() {
        this.createFormControls();
        this.form = new FormGroup({
            inputname: this.inputname,
            inputroute: this.inputroute,
            inputsort: this.inputsort,
            inputdescription: this.inputdescription,
            inputparents: this.inputparents,
        });
    }

    // keyPress
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    onSubmit(){
        this.inputFocus();
        if(this.form.valid){
            this.loading = true;
            this.menuService.onCreate(this.inputname.value,this.inputroute.value,this.inputsort.value,
                this.inputdescription.value,this.inputparents.value)
                .then(res=>{
                    console.log(res);
                    if(res.succ){
                        this.route.navigate(['/home']);
                        Notify('glyphicon glyphicon-warning-sign', '', 'Thêm mới thành công', 'success');
                    }else {
                        Notify('glyphicon glyphicon-warning-sign', '', 'Thêm mới thất bại', 'danger');
                    }
                    this.loading = false;
                })
                .catch(err=>{
                    this.loading = false;
                    Notify('glyphicon glyphicon-warning-sign', '', 'Thêm mới thất bại', 'danger');
                })
        }
    }

    inputFocus() {
        if (!this.inputname.valid) {
            this.inputN.nativeElement.focus();
        } else if (!this.inputroute.valid) {
            this.inputR.nativeElement.focus();
        }
    }

    onBack() {
        this.location.back();
    }
}
