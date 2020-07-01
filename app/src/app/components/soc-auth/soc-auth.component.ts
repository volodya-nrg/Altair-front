import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Helpers} from '../../helpers';

@Component({
    selector: 'app-soc-auth',
    templateUrl: './soc-auth.component.html',
    styleUrls: ['./soc-auth.component.less']
})
export class SocAuthComponent implements OnInit {
    vk: SocClass;
    ok: SocClass;
    fb: SocClass;
    ggl: SocClass;

    constructor() {
    }

    ngOnInit(): void {
        this.vk = new SocClass(environment.socAppId.vk, 'vk', '', 'https://oauth.vk.com/authorize', 'vk.com', 'mobile');
        this.ok = new SocClass(environment.socAppId.ok, 'ok', 'VALUABLE_ACCESS', 'https://connect.ok.ru/oauth/authorize', 'ok.ru', '', 'm');
        this.fb = new SocClass(environment.socAppId.fb, 'fb', 'public_profile', 'https://www.facebook.com/v7.0/dialog/oauth', 'facebook.com');
        this.ggl = new SocClass(environment.socAppId.ggl, 'ggl', 'openid profile email', 'https://accounts.google.com/o/oauth2/v2/auth', 'google.com');
        // https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email
    }
}

class SocClass {
    private data: {
        client_id: string;
        state: string;
        response_type: string;
        redirect_uri: string;
        scope: string;
        display: string;
        layout: string;
    };
    private urlAuth: string;
    private title: string;

    constructor(
        clientIdSrc: string,
        stateSrc: string,
        scopeSrc: string,
        urlAuthSrc: string,
        titleSrc: string,
        displaySrc: string = '',
        layoutSrc: string = '',
        ) {

        this.data = {
            client_id: clientIdSrc,
            state: stateSrc,
            scope: scopeSrc,
            display: displaySrc,
            layout: layoutSrc,
            redirect_uri: environment.domain + '/login',
            response_type: 'code',
        };

        this.urlAuth = urlAuthSrc;
        this.title = titleSrc;
    }

    generateUrl(): string {
        return this.urlAuth + '?' + Helpers.serializeObj(this.data);
    }

    getTitle(): string {
        return this.title;
    }
}
