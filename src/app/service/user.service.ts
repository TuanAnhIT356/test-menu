import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";

@Injectable()
export class UserService extends BaseService{

    login(email: string, password: string) {
        let body = JSON.stringify({
            'email': email,
            'password': password
        });
        return this.sendPost('auth/login', false, body);
    }

    register(full_name:string,name:string,email:string,password:string){
        let body = JSON.stringify({
            'full_name': full_name,
            'name': name,
            'email':email,
            'password':password,
        });
        return this.sendPost('auth/register', false, body);
    }

    getUser(){
        console.log(this.token);
        let body = JSON.stringify({
            'token': this.token
        });
        return this.sendPost('auth/getUser', false, body);
    }


}
