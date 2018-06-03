import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
// Service
import {UserService} from '../../service/user.service';

// Notify
import Notify from '../../utils/notify';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    providers: [UserService]
})
export class SigninComponent implements OnInit {

    // form login
    form: FormGroup;
    name: FormControl;
    fullname: FormControl;
    email: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
    @ViewChild('inputN') inputN: ElementRef;
    @ViewChild('inputFN') inputFN: ElementRef;
    @ViewChild('inputE') inputE: ElementRef;
    @ViewChild('inputP') inputP: ElementRef;
    @ViewChild('inputCP') inputCP: ElementRef;

    // loading
    loading: Boolean = false;

    constructor(private userService: UserService,public route: Router) {
    }

    ngOnInit() {
        this.createForm();
        setTimeout(() => this.inputN.nativeElement.focus(), 0);
    }

    createFormControls() {
        this.name = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
        ]);
        this.fullname = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
        ]);
        this.email = new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.minLength(6),
            Validators.maxLength(50)
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
        ]);
        this.confirmPassword = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
        ]);
    }

    createForm() {
        this.createFormControls();
        this.form = new FormGroup({
            name: this.name,
            fullname: this.fullname,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
        });
    }

    onSubmit() {
        this.inputFocus();
        if (this.form.valid) {
            this.loading = true;
            this.userService.register(this.fullname.value, this.name.value, this.email.value, this.password.value)
                .then(res=>{
                    console.log(res);
                    if(res.succ){
                        Notify('glyphicon glyphicon-warning-sign', '', 'Đăng Ký thành công', 'success');
                        setTimeout(res => {
                            this.loading = false;
                            this.route.navigate(['/login']);
                        }, 500);
                    }else{
                        this.loading = false;
                        Notify('glyphicon glyphicon-warning-sign', '' , 'Đăng Ký thất bại </br>'+res.message, 'danger');
                    }
                })
                .catch(err => {
                    this.loading = false;
                    Notify('glyphicon glyphicon-warning-sign', '' , 'Đăng Ký thất bại', 'danger');
                });
        }
    }

    inputFocus() {
        if (!this.name.valid) {
            this.inputN.nativeElement.focus();
        } else if (!this.fullname.valid) {
            this.inputFN.nativeElement.focus();
        } else if (!this.email.valid) {
            this.inputE.nativeElement.focus();
        } else if (!this.password.valid) {
            this.inputP.nativeElement.focus();
        } else if (!this.confirmPassword.valid || this.password.value != this.confirmPassword.value) {
            this.inputCP.nativeElement.focus();
        }
    }
}
