import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable()
export class BaseService {

    public baseServiceUrl;
    public headers: any;
    public options: any;
    public token = null;

    constructor(public http: Http, public route: Router, public location: Location) {
        this.baseServiceUrl = environment.url;
        this.headers = new Headers({
            'Content-Type': 'application/json'
        });
        this.options = new RequestOptions({headers: this.headers});
        this.token =   localStorage.getItem('token');
    }

    public  sendPost(url, withoutBase = false, body = null) {
        url = withoutBase ? url : this.baseServiceUrl + url;
        return this.http.post(url, body, this.options)
            .toPromise()
            .then(res => {
                return res.json();
            })
            .then(res => {
                if (!res.succ) {
                    if (res.code == 600) {
                        this.route.navigate(['/login']);
                    }
                }
                return res;
            });
    }

}
