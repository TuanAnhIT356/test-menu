import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";

@Injectable()
export class MenuService extends BaseService {

    get(id) {
        let body = JSON.stringify({
            'token': this.token,
            'id':id
        });
        return this.sendPost('menu/get', false, body);
    }

    getMenuAll(page:number = -1,perPage:number= 10) {
        let body = JSON.stringify({
            'token': this.token,
            'page':page,
            'perPage':perPage,
        });
        return this.sendPost('menu/getMenuAll', false, body);
    }

    getMenu() {
        let body = JSON.stringify({
            'token': this.token,
        });
        return this.sendPost('menu/getMenu', false, body);
    }

    onCreate(name: string, route: string, sort: number = 0, description: string = null, parents: string = null) {
        console.log(this.token);
        let body = JSON.stringify({
            'token': this.token,
            'name': name,
            'route': route,
            'sort': sort,
            'description': description,
            'parents': parents,
        });
        return this.sendPost('menu/create', false, body);
    }

    onUpdate(id:number,name: string, route: string, sort: number = 0, description: string = null, parents: string = null) {
        console.log(this.token);
        let body = JSON.stringify({
            'token': this.token,
            'id': id,
            'name': name,
            'route': route,
            'sort': sort,
            'description': description,
            'parents': parents,
        });
        return this.sendPost('menu/update', false, body);
    }

    onDelete(id: number) {
        console.log(this.token);
        let body = JSON.stringify({
            'token': this.token,
            'id': id
        });
        return this.sendPost('menu/delete', false, body);
    }
}
