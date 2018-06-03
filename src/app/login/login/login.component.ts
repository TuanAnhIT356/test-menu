import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
// Service
import {UserService} from '../../service/user.service';

// Notify
import Notify from '../../utils/notify';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {

    // form login
    form: FormGroup;
    email: FormControl;
    password: FormControl;
    remember: FormControl;
    @ViewChild('inputE') inputE: ElementRef;
    @ViewChild('inputP') inputP: ElementRef;
    // loading
    loading: Boolean = false;

    constructor(private userService: UserService,public route: Router) {
    }

    ngOnInit() {
        this.createForm();
        setTimeout(() => this.inputE.nativeElement.focus(), 0);
    }

    createFormControls() {
        const email_login = localStorage.getItem('email-login');
        const password_login = localStorage.getItem('password-login');
        this.email = new FormControl(email_login, [
            Validators.required,
            Validators.email,
            Validators.minLength(6),
            Validators.maxLength(50)
        ]);
        this.password = new FormControl(password_login, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
        ]);
        this.remember = new FormControl();
    }

    createForm() {
        this.createFormControls();
        this.form = new FormGroup({
            email: this.email,
            password: this.password,
            remember: this.remember,
        });
    }

    onSubmit() {
        this.inputFocus();
        if (!this.email.valid) {
            this.inputE.nativeElement.focus();
        } else if (this.email.valid) {
            this.inputP.nativeElement.focus();
        }
        if (this.form.valid) {
            if (this.remember.value) {
                localStorage.setItem('email-login', this.email.value);
                localStorage.setItem('password-login', this.password.value);
            } else {
                localStorage.removeItem('email-login');
                localStorage.removeItem('password-login');
            }
            this.loading = true;
            this.userService.login(this.email.value, this.password.value)
                .then(res => {
                    console.log(res);
                    if(res.succ){
                        Notify('glyphicon glyphicon-warning-sign', '', 'Đăng nhập thành công', 'success');
                        localStorage.setItem('token',res.data.token);
                        this.userService.token = res.data.token;
                        setTimeout(res => {
                            this.loading = false;
                            this.route.navigate(['/home']);
                        }, 500);
                    }else {
                        this.loading = false;
                        Notify('glyphicon glyphicon-warning-sign', '', 'Đăng nhập thất bại </br>'+res.message, 'danger');
                    }

                })
                .catch(err => {
                    this.loading = false;
                    Notify('glyphicon glyphicon-warning-sign', '', 'Đăng nhập thất bại', 'danger');
                });
        }
    }

    inputFocus() {
        if (!this.email.valid) {
            this.inputE.nativeElement.focus();
        } else if (!this.password.valid) {
            this.inputP.nativeElement.focus();
        }
    }

}
