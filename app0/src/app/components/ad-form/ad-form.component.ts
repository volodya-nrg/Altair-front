import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    ViewChild
} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatFullInterface, CatTreeInterface, CatWithDeepInterface} from '../../interfaces/response/cat';
import {CatService} from '../../services/cat.service';
import {PropService} from '../../services/prop.service';
import {AdService} from '../../services/ad.service';
import {ProfileService} from '../../services/profile.service';
import {ManagerService} from '../../services/manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MyErrorService} from '../../services/my-error.service';
import {Helpers} from '../../helpers';
import {PhoneInterface} from '../../interfaces/response/phone';
import {AuthService} from '../../services/auth.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-ad-form',
    templateUrl: './ad-form.component.html',
    styleUrls: ['./ad-form.component.less']
})
export class AdFormComponent implements OnInit, OnDestroy, AfterViewInit {
    =========
}
