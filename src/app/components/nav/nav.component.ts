import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {
    private links: Array<HTMLBaseElement> = [];
    private catTree = {
        'childes': [
            {
                'catId': 1,
                'name': 'Транспорт',
                'slug': 'transport',
                'parentId': 0,
                'pos': 0,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 11,
                        'name': 'Автомобили',
                        'slug': 'avtomobili',
                        'parentId': 1,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 61,
                                'name': 'С пробегом',
                                'slug': 's-probegom',
                                'parentId': 11,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 62,
                                'name': 'Новый',
                                'slug': 'novyi',
                                'parentId': 11,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 12,
                        'name': 'Мотоциклы и мототехника',
                        'slug': 'mototsikly-i-mototekhnika',
                        'parentId': 1,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 63,
                                'name': 'Багги',
                                'slug': 'baggi',
                                'parentId': 12,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 64,
                                'name': 'Вездеходы',
                                'slug': 'vezdekhody',
                                'parentId': 12,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 65,
                                'name': 'Картинг',
                                'slug': 'karting',
                                'parentId': 12,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 66,
                                'name': 'Квадроциклы',
                                'slug': 'kvadrotsikly',
                                'parentId': 12,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 67,
                                'name': 'Мопеды и скутеры',
                                'slug': 'mopedy-i-skutery',
                                'parentId': 12,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 68,
                                'name': 'Мотоциклы',
                                'slug': 'mototsikly',
                                'parentId': 12,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 69,
                                'name': 'Снегоходы',
                                'slug': 'snegokhody',
                                'parentId': 12,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 13,
                        'name': 'Грузовики и спецтехника',
                        'slug': 'gruzoviki-i-spetstekhnika',
                        'parentId': 1,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 70,
                                'name': 'Автобусы',
                                'slug': 'avtobusy',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 71,
                                'name': 'Автодома',
                                'slug': 'avtodoma',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 72,
                                'name': 'Автокраны',
                                'slug': 'avtokrany',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 73,
                                'name': 'Бульдозеры',
                                'slug': 'buldozery',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 74,
                                'name': 'Грузовики',
                                'slug': 'gruzoviki',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 75,
                                'name': 'Коммунальная техника',
                                'slug': 'kommunalnaia-tekhnika',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 76,
                                'name': 'Лёгкий транспорт',
                                'slug': 'legkii-transport',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 77,
                                'name': 'Погрузчики',
                                'slug': 'pogruzchiki',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 78,
                                'name': 'Прицепы',
                                'slug': 'pritsepy',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 79,
                                'name': 'Сельхозтехника',
                                'slug': 'selkhoztekhnika',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 80,
                                'name': 'Строительная техника',
                                'slug': 'stroitelnaia-tekhnika',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 81,
                                'name': 'Техника для лесозаготовки',
                                'slug': 'tekhnika-dlia-lesozagotovki',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 82,
                                'name': 'Тягачи',
                                'slug': 'tiagachi',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 83,
                                'name': 'Экскаваторы',
                                'slug': 'ekskavatory',
                                'parentId': 13,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 14,
                        'name': 'Водный транспорт',
                        'slug': 'vodnyi-transport',
                        'parentId': 1,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 84,
                                'name': 'Вёсельные лодки',
                                'slug': 'veselnye-lodki',
                                'parentId': 14,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 85,
                                'name': 'Гидроциклы',
                                'slug': 'gidrotsikly',
                                'parentId': 14,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 86,
                                'name': 'Катера и яхты',
                                'slug': 'katera-i-iakhty',
                                'parentId': 14,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 87,
                                'name': 'Каяки и каноэ',
                                'slug': 'kaiaki-i-kanoe',
                                'parentId': 14,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 88,
                                'name': 'Моторные лодки',
                                'slug': 'motornye-lodki',
                                'parentId': 14,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 89,
                                'name': 'Надувные лодки',
                                'slug': 'naduvnye-lodki',
                                'parentId': 14,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 15,
                        'name': 'Запчасти и аксессуары',
                        'slug': 'zapchasti-i-aksessuary',
                        'parentId': 1,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 90,
                                'name': 'Запчасти',
                                'slug': 'zapchasti',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 91,
                                'name': 'Аксессуары',
                                'slug': 'aksessuary',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 92,
                                'name': 'GPS-навигаторы',
                                'slug': 'gps-navigatory',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 93,
                                'name': 'Автокосметика и автохимия',
                                'slug': 'avtokosmetika-i-avtokhimiia',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 94,
                                'name': 'Аудио- и видеотехника',
                                'slug': 'audio--i-videotekhnika',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 95,
                                'name': 'Багажники и фаркопы',
                                'slug': 'bagazhniki-i-farkopy',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 96,
                                'name': 'Инструменты',
                                'slug': 'instrumenty',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 97,
                                'name': 'Прицепы',
                                'slug': 'pritsepy',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 98,
                                'name': 'Противоугонные устройства',
                                'slug': 'protivougonnye-ustroistva',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 99,
                                'name': 'Тюнинг',
                                'slug': 'tiuning',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 100,
                                'name': 'Шины, диски и колёса',
                                'slug': 'shiny-diski-i-kolesa',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 101,
                                'name': 'Экипировка',
                                'slug': 'ekipirovka',
                                'parentId': 15,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    }
                ]
            },
            {
                'catId': 2,
                'name': 'Недвижимость',
                'slug': 'nedvizhimost',
                'parentId': 0,
                'pos': 0,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 16,
                        'name': 'Квартиры',
                        'slug': 'kvartiry',
                        'parentId': 2,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 102,
                                'name': 'Продам',
                                'slug': 'prodam',
                                'parentId': 16,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 103,
                                'name': 'Сдам',
                                'slug': 'sdam',
                                'parentId': 16,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 104,
                                'name': 'Куплю',
                                'slug': 'kupliu',
                                'parentId': 16,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 105,
                                'name': 'Сниму',
                                'slug': 'snimu',
                                'parentId': 16,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 17,
                        'name': 'Комнаты',
                        'slug': 'komnaty',
                        'parentId': 2,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 106,
                                'name': 'Продам',
                                'slug': 'prodam',
                                'parentId': 17,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 107,
                                'name': 'Сдам',
                                'slug': 'sdam',
                                'parentId': 17,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 108,
                                'name': 'Куплю',
                                'slug': 'kupliu',
                                'parentId': 17,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 109,
                                'name': 'Сниму',
                                'slug': 'snimu',
                                'parentId': 17,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 18,
                        'name': 'Дома, дачи, коттеджи',
                        'slug': 'doma-dachi-kottedzhi',
                        'parentId': 2,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 110,
                                'name': 'Продам',
                                'slug': 'prodam',
                                'parentId': 18,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 111,
                                'name': 'Сдам',
                                'slug': 'sdam',
                                'parentId': 18,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 112,
                                'name': 'Куплю',
                                'slug': 'kupliu',
                                'parentId': 18,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 113,
                                'name': 'Сниму',
                                'slug': 'snimu',
                                'parentId': 18,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 19,
                        'name': 'Земельные участки',
                        'slug': 'zemelnye-uchastki',
                        'parentId': 2,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 114,
                                'name': 'Продам',
                                'slug': 'prodam',
                                'parentId': 19,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 115,
                                'name': 'Сдам',
                                'slug': 'sdam',
                                'parentId': 19,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 116,
                                'name': 'Куплю',
                                'slug': 'kupliu',
                                'parentId': 19,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 117,
                                'name': 'Сниму',
                                'slug': 'snimu',
                                'parentId': 19,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 20,
                        'name': 'Гаражи и машиноместа',
                        'slug': 'garazhi-i-mashinomesta',
                        'parentId': 2,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 118,
                                'name': 'Продам',
                                'slug': 'prodam',
                                'parentId': 20,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 119,
                                'name': 'Сдам',
                                'slug': 'sdam',
                                'parentId': 20,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 120,
                                'name': 'Куплю',
                                'slug': 'kupliu',
                                'parentId': 20,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 121,
                                'name': 'Сниму',
                                'slug': 'snimu',
                                'parentId': 20,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 21,
                        'name': 'Коммерческая недвижимость',
                        'slug': 'kommercheskaia-nedvizhimost',
                        'parentId': 2,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 122,
                                'name': 'Сдам',
                                'slug': 'sdam',
                                'parentId': 21,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 123,
                                'name': 'Куплю',
                                'slug': 'kupliu',
                                'parentId': 21,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 124,
                                'name': 'Сниму',
                                'slug': 'snimu',
                                'parentId': 21,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 22,
                        'name': 'Недвижимость за рубежом',
                        'slug': 'nedvizhimost-za-rubezhom',
                        'parentId': 2,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 125,
                                'name': 'Продам',
                                'slug': 'prodam',
                                'parentId': 22,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 126,
                                'name': 'Сдам',
                                'slug': 'sdam',
                                'parentId': 22,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 127,
                                'name': 'Куплю',
                                'slug': 'kupliu',
                                'parentId': 22,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 128,
                                'name': 'Сниму',
                                'slug': 'snimu',
                                'parentId': 22,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    }
                ]
            },
            {
                'catId': 3,
                'name': 'Работа',
                'slug': 'rabota',
                'parentId': 0,
                'pos': 0,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 23,
                        'name': 'Вакансии',
                        'slug': 'vakansii',
                        'parentId': 3,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 129,
                                'name': 'IT, интернет, телеком',
                                'slug': 'it-internet-telekom',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 130,
                                'name': 'Автомобильный бизнес',
                                'slug': 'avtomobilnyi-biznes',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 131,
                                'name': 'Административная работа',
                                'slug': 'administrativnaia-rabota',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 132,
                                'name': 'Банки, инвестиции',
                                'slug': 'banki-investitsii',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 133,
                                'name': 'Без опыта, студенты',
                                'slug': 'bez-opyta-studenty',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 134,
                                'name': 'Бухгалтерия, финансы',
                                'slug': 'bukhgalteriia-finansy',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 135,
                                'name': 'Высший менеджмент',
                                'slug': 'vysshii-menedzhment',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 136,
                                'name': 'Госслужба, НКО',
                                'slug': 'gossluzhba-nko',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 137,
                                'name': 'Домашний персонал',
                                'slug': 'domashnii-personal',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 138,
                                'name': 'ЖКХ, эксплуатация',
                                'slug': 'zhkkh-ekspluatatsiia',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 139,
                                'name': 'Искусство, развлечения',
                                'slug': 'iskusstvo-razvlecheniia',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 140,
                                'name': 'Консультирование',
                                'slug': 'konsultirovanie',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 141,
                                'name': 'Маркетинг, реклама, PR',
                                'slug': 'marketing-reklama-pr',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 142,
                                'name': 'Медицина, фармацевтика',
                                'slug': 'meditsina-farmatsevtika',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 143,
                                'name': 'Образование, наука',
                                'slug': 'obrazovanie-nauka',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 144,
                                'name': 'Охрана, безопасность',
                                'slug': 'okhrana-bezopasnost',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 145,
                                'name': 'Продажи',
                                'slug': 'prodazhi',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 146,
                                'name': 'Производство, сырьё, с/х',
                                'slug': 'proizvodstvo-syre-skh',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 147,
                                'name': 'Страхование',
                                'slug': 'strakhovanie',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 148,
                                'name': 'Строительство',
                                'slug': 'stroitelstvo',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 149,
                                'name': 'Транспорт, логистика',
                                'slug': 'transport-logistika',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 150,
                                'name': 'Туризм, рестораны',
                                'slug': 'turizm-restorany',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 151,
                                'name': 'Управление персоналом',
                                'slug': 'upravlenie-personalom',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 152,
                                'name': 'Фитнес, салоны красоты',
                                'slug': 'fitnes-salony-krasoty',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 153,
                                'name': 'Юриспруденция',
                                'slug': 'iurisprudentsiia',
                                'parentId': 23,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 24,
                        'name': 'Отрасли',
                        'slug': 'otrasli',
                        'parentId': 3,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 25,
                        'name': 'Резюме',
                        'slug': 'reziume',
                        'parentId': 3,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 154,
                                'name': 'IT, интернет, телеком',
                                'slug': 'it-internet-telekom',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 155,
                                'name': 'Автомобильный бизнес',
                                'slug': 'avtomobilnyi-biznes',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 156,
                                'name': 'Административная работа',
                                'slug': 'administrativnaia-rabota',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 157,
                                'name': 'Банки, инвестиции',
                                'slug': 'banki-investitsii',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 158,
                                'name': 'Без опыта, студенты',
                                'slug': 'bez-opyta-studenty',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 159,
                                'name': 'Бухгалтерия, финансы',
                                'slug': 'bukhgalteriia-finansy',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 160,
                                'name': 'Высший менеджмент',
                                'slug': 'vysshii-menedzhment',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 161,
                                'name': 'Госслужба, НКО',
                                'slug': 'gossluzhba-nko',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 162,
                                'name': 'Домашний персонал',
                                'slug': 'domashnii-personal',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 163,
                                'name': 'ЖКХ, эксплуатация',
                                'slug': 'zhkkh-ekspluatatsiia',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 164,
                                'name': 'Искусство, развлечения',
                                'slug': 'iskusstvo-razvlecheniia',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 165,
                                'name': 'Консультирование',
                                'slug': 'konsultirovanie',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 166,
                                'name': 'Маркетинг, реклама, PR',
                                'slug': 'marketing-reklama-pr',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 167,
                                'name': 'Медицина, фармацевтика',
                                'slug': 'meditsina-farmatsevtika',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 168,
                                'name': 'Образование, наука',
                                'slug': 'obrazovanie-nauka',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 169,
                                'name': 'Охрана, безопасность',
                                'slug': 'okhrana-bezopasnost',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 170,
                                'name': 'Продажи',
                                'slug': 'prodazhi',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 171,
                                'name': 'Производство, сырьё, с/х',
                                'slug': 'proizvodstvo-syre-skh',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 172,
                                'name': 'Страхование',
                                'slug': 'strakhovanie',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 173,
                                'name': 'Строительство',
                                'slug': 'stroitelstvo',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 174,
                                'name': 'Транспорт, логистика',
                                'slug': 'transport-logistika',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 175,
                                'name': 'Туризм, рестораны',
                                'slug': 'turizm-restorany',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 176,
                                'name': 'Управление персоналом',
                                'slug': 'upravlenie-personalom',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 177,
                                'name': 'Фитнес, салоны красоты',
                                'slug': 'fitnes-salony-krasoty',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 178,
                                'name': 'Юриспруденция',
                                'slug': 'iurisprudentsiia',
                                'parentId': 25,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    }
                ]
            },
            {
                'catId': 4,
                'name': 'Услуги',
                'slug': 'uslugi',
                'parentId': 0,
                'pos': 0,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 179,
                        'name': 'IT, интернет, телеком',
                        'slug': 'it-internet-telekom',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 202,
                                'name': 'Cоздание и продвижение сайтов',
                                'slug': 'cozdanie-i-prodvizhenie-saitov',
                                'parentId': 179,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 203,
                                'name': 'Мастер на все случаи',
                                'slug': 'master-na-vse-sluchai',
                                'parentId': 179,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 204,
                                'name': 'Настройка интернета и сетей',
                                'slug': 'nastroika-interneta-i-setei',
                                'parentId': 179,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 205,
                                'name': 'Установка и настройка ПО',
                                'slug': 'ustanovka-i-nastroika-po',
                                'parentId': 179,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 180,
                        'name': 'Бытовые услуги',
                        'slug': 'bytovye-uslugi',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 206,
                                'name': 'Изготовление ключей',
                                'slug': 'izgotovlenie-kliuchei',
                                'parentId': 180,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 207,
                                'name': 'Пошив и ремонт одежды',
                                'slug': 'poshiv-i-remont-odezhdy',
                                'parentId': 180,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 208,
                                'name': 'Ремонт часов',
                                'slug': 'remont-chasov',
                                'parentId': 180,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 209,
                                'name': 'Химчистка, стирка',
                                'slug': 'khimchistka-stirka',
                                'parentId': 180,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 210,
                                'name': 'Ювелирные услуги',
                                'slug': 'iuvelirnye-uslugi',
                                'parentId': 180,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 181,
                        'name': 'Деловые услуги',
                        'slug': 'delovye-uslugi',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 211,
                                'name': 'Бухгалтерия, финансы',
                                'slug': 'bukhgalteriia-finansy',
                                'parentId': 181,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 212,
                                'name': 'Консультирование',
                                'slug': 'konsultirovanie',
                                'parentId': 181,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 213,
                                'name': 'Набор и коррекция текста',
                                'slug': 'nabor-i-korrektsiia-teksta',
                                'parentId': 181,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 214,
                                'name': 'Перевод',
                                'slug': 'perevod',
                                'parentId': 181,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 215,
                                'name': 'Юридические услуги',
                                'slug': 'iuridicheskie-uslugi',
                                'parentId': 181,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 182,
                        'name': 'Искусство',
                        'slug': 'iskusstvo',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 183,
                        'name': 'Красота, здоровье',
                        'slug': 'krasota-zdorove',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 216,
                                'name': 'Услуги парикмахера',
                                'slug': 'uslugi-parikmakhera',
                                'parentId': 183,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 217,
                                'name': 'Маникюр, педикюр',
                                'slug': 'manikiur-pedikiur',
                                'parentId': 183,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 218,
                                'name': 'Макияж',
                                'slug': 'makiiazh',
                                'parentId': 183,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 219,
                                'name': 'Косметология, эпиляция',
                                'slug': 'kosmetologiia-epiliatsiia',
                                'parentId': 183,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 220,
                                'name': 'СПА-услуги, здоровье',
                                'slug': 'spa-uslugi-zdorove',
                                'parentId': 183,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 221,
                                'name': 'Тату, пирсинг',
                                'slug': 'tatu-pirsing',
                                'parentId': 183,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 222,
                                'name': 'Другое',
                                'slug': 'drugoe',
                                'parentId': 183,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 184,
                        'name': 'Курьерские поручения',
                        'slug': 'kurerskie-porucheniia',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 185,
                        'name': 'Мастер на час',
                        'slug': 'master-na-chas',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 186,
                        'name': 'Няни, сиделки',
                        'slug': 'niani-sidelki',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 187,
                        'name': 'Оборудование, производство',
                        'slug': 'oborudovanie-proizvodstvo',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 223,
                                'name': 'Аренда оборудования',
                                'slug': 'arenda-oborudovaniia',
                                'parentId': 187,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 224,
                                'name': 'Монтаж и обслуживание оборудования',
                                'slug': 'montazh-i-obsluzhivanie-oborudovaniia',
                                'parentId': 187,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 225,
                                'name': 'Производство, обработка',
                                'slug': 'proizvodstvo-obrabotka',
                                'parentId': 187,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 188,
                        'name': 'Обучение, курсы',
                        'slug': 'obuchenie-kursy',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 226,
                                'name': 'Предметы школы и ВУЗа',
                                'slug': 'predmety-shkoly-i-vuza',
                                'parentId': 188,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 227,
                                'name': 'Иностранные языки',
                                'slug': 'inostrannye-iazyki',
                                'parentId': 188,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 228,
                                'name': 'Вождение',
                                'slug': 'vozhdenie',
                                'parentId': 188,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 229,
                                'name': 'Музыка, театр',
                                'slug': 'muzyka-teatr',
                                'parentId': 188,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 230,
                                'name': 'Спорт, танцы',
                                'slug': 'sport-tantsy',
                                'parentId': 188,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 231,
                                'name': 'Рисование, дизайн, рукоделие',
                                'slug': 'risovanie-dizain-rukodelie',
                                'parentId': 188,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 232,
                                'name': 'Профессиональная подготовка',
                                'slug': 'professionalnaia-podgotovka',
                                'parentId': 188,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 233,
                                'name': 'Детское развитие, логопеды',
                                'slug': 'detskoe-razvitie-logopedy',
                                'parentId': 188,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 234,
                                'name': 'Другое',
                                'slug': 'drugoe',
                                'parentId': 188,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 189,
                        'name': 'Охрана, безопасность',
                        'slug': 'okhrana-bezopasnost',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 190,
                        'name': 'Питание, кейтеринг',
                        'slug': 'pitanie-keitering',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 191,
                        'name': 'Праздники, мероприятия',
                        'slug': 'prazdniki-meropriiatiia',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 192,
                        'name': 'Реклама, полиграфия',
                        'slug': 'reklama-poligrafiia',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 235,
                                'name': 'Маркетинг, реклама, PR',
                                'slug': 'marketing-reklama-pr',
                                'parentId': 192,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 236,
                                'name': 'Полиграфия, дизайн',
                                'slug': 'poligrafiia-dizain',
                                'parentId': 192,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 193,
                        'name': 'Ремонт и обслуживание техники',
                        'slug': 'remont-i-obsluzhivanie-tekhniki',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 237,
                                'name': 'Телевизоры',
                                'slug': 'televizory',
                                'parentId': 193,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 238,
                                'name': 'Фото-, аудио-, видеотехника',
                                'slug': 'foto--audio--videotekhnika',
                                'parentId': 193,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 239,
                                'name': 'Игровые приставки',
                                'slug': 'igrovye-pristavki',
                                'parentId': 193,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 240,
                                'name': 'Компьютерная техника',
                                'slug': 'kompiuternaia-tekhnika',
                                'parentId': 193,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 241,
                                'name': 'Крупная бытовая техника',
                                'slug': 'krupnaia-bytovaia-tekhnika',
                                'parentId': 193,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 242,
                                'name': 'Мелкая бытовая техника',
                                'slug': 'melkaia-bytovaia-tekhnika',
                                'parentId': 193,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 243,
                                'name': 'Мобильные устройства',
                                'slug': 'mobilnye-ustroistva',
                                'parentId': 193,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 194,
                        'name': 'Ремонт, строительство',
                        'slug': 'remont-stroitelstvo',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 244,
                                'name': 'Сборка и ремонт мебели',
                                'slug': 'sborka-i-remont-mebeli',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 245,
                                'name': 'Отделочные работы',
                                'slug': 'otdelochnye-raboty',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 246,
                                'name': 'Электрика',
                                'slug': 'elektrika',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 247,
                                'name': 'Сантехника',
                                'slug': 'santekhnika',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 248,
                                'name': 'Ремонт офиса',
                                'slug': 'remont-ofisa',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 249,
                                'name': 'Остекление балконов',
                                'slug': 'osteklenie-balkonov',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 250,
                                'name': 'Ремонт ванной',
                                'slug': 'remont-vannoi',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 251,
                                'name': 'Строительство бань, саун',
                                'slug': 'stroitelstvo-ban-saun',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 252,
                                'name': 'Ремонт кухни',
                                'slug': 'remont-kukhni',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 253,
                                'name': 'Строительство домов, коттеджей',
                                'slug': 'stroitelstvo-domov-kottedzhei',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 254,
                                'name': 'Ремонт квартиры',
                                'slug': 'remont-kvartiry',
                                'parentId': 194,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 195,
                        'name': 'Сад, благоустройство',
                        'slug': 'sad-blagoustroistvo',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 196,
                        'name': 'Транспорт, перевозки',
                        'slug': 'transport-perevozki',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 255,
                                'name': 'Автосервис',
                                'slug': 'avtoservis',
                                'parentId': 196,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 256,
                                'name': 'Аренда авто',
                                'slug': 'arenda-avto',
                                'parentId': 196,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 257,
                                'name': 'Коммерческие перевозки',
                                'slug': 'kommercheskie-perevozki',
                                'parentId': 196,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 258,
                                'name': 'Грузчики',
                                'slug': 'gruzchiki',
                                'parentId': 196,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 259,
                                'name': 'Переезды',
                                'slug': 'pereezdy',
                                'parentId': 196,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 260,
                                'name': 'Спецтехника',
                                'slug': 'spetstekhnika',
                                'parentId': 196,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 197,
                        'name': 'Уборка',
                        'slug': 'uborka',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 261,
                                'name': 'Вывоз мусора',
                                'slug': 'vyvoz-musora',
                                'parentId': 197,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 262,
                                'name': 'Генеральная уборка',
                                'slug': 'generalnaia-uborka',
                                'parentId': 197,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 263,
                                'name': 'Глажка белья',
                                'slug': 'glazhka-belia',
                                'parentId': 197,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 264,
                                'name': 'Мойка окон',
                                'slug': 'moika-okon',
                                'parentId': 197,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 265,
                                'name': 'Простая уборка',
                                'slug': 'prostaia-uborka',
                                'parentId': 197,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 266,
                                'name': 'Уборка после ремонта',
                                'slug': 'uborka-posle-remonta',
                                'parentId': 197,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 267,
                                'name': 'Чистка ковров',
                                'slug': 'chistka-kovrov',
                                'parentId': 197,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 268,
                                'name': 'Чистка мягкой мебели',
                                'slug': 'chistka-miagkoi-mebeli',
                                'parentId': 197,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 198,
                        'name': 'Установка техники',
                        'slug': 'ustanovka-tekhniki',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 199,
                        'name': 'Уход за животными',
                        'slug': 'ukhod-za-zhivotnymi',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 200,
                        'name': 'Фото- и видеосъёмка',
                        'slug': 'foto--i-videosieemka',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 201,
                        'name': 'Другое',
                        'slug': 'drugoe',
                        'parentId': 4,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    }
                ]
            },
            {
                'catId': 5,
                'name': 'Личные вещи',
                'slug': 'lichnye-veshchi',
                'parentId': 0,
                'pos': 0,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 26,
                        'name': 'Одежда, обувь, аксессуары',
                        'slug': 'odezhda-obuv-aksessuary',
                        'parentId': 5,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 269,
                                'name': 'Женская одежда',
                                'slug': 'zhenskaia-odezhda',
                                'parentId': 26,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 270,
                                'name': 'Мужская одежда',
                                'slug': 'muzhskaia-odezhda',
                                'parentId': 26,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 271,
                                'name': 'Аксессуары',
                                'slug': 'aksessuary',
                                'parentId': 26,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 27,
                        'name': 'Детская одежда и обувь',
                        'slug': 'detskaia-odezhda-i-obuv',
                        'parentId': 5,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 272,
                                'name': 'Для девочек',
                                'slug': 'dlia-devochek',
                                'parentId': 27,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 273,
                                'name': 'Для мальчиков',
                                'slug': 'dlia-malchikov',
                                'parentId': 27,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 28,
                        'name': 'Товары для детей и игрушки',
                        'slug': 'tovary-dlia-detei-i-igrushki',
                        'parentId': 5,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 274,
                                'name': 'Автомобильные кресла',
                                'slug': 'avtomobilnye-kresla',
                                'parentId': 28,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 275,
                                'name': 'Велосипеды и самокаты',
                                'slug': 'velosipedy-i-samokaty',
                                'parentId': 28,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 276,
                                'name': 'Детская мебель',
                                'slug': 'detskaia-mebel',
                                'parentId': 28,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 277,
                                'name': 'Детские коляски',
                                'slug': 'detskie-koliaski',
                                'parentId': 28,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 278,
                                'name': 'Игрушки',
                                'slug': 'igrushki',
                                'parentId': 28,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 279,
                                'name': 'Постельные принадлежности',
                                'slug': 'postelnye-prinadlezhnosti',
                                'parentId': 28,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 280,
                                'name': 'Товары для кормления',
                                'slug': 'tovary-dlia-kormleniia',
                                'parentId': 28,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 281,
                                'name': 'Товары для купания',
                                'slug': 'tovary-dlia-kupaniia',
                                'parentId': 28,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 282,
                                'name': 'Товары для школы',
                                'slug': 'tovary-dlia-shkoly',
                                'parentId': 28,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 29,
                        'name': 'Часы и украшения',
                        'slug': 'chasy-i-ukrasheniia',
                        'parentId': 5,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 283,
                                'name': 'Бижутерия',
                                'slug': 'bizhuteriia',
                                'parentId': 29,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 284,
                                'name': 'Часы',
                                'slug': 'chasy',
                                'parentId': 29,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 285,
                                'name': 'Ювелирные изделия',
                                'slug': 'iuvelirnye-izdeliia',
                                'parentId': 29,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 30,
                        'name': 'Красота и здоровье',
                        'slug': 'krasota-i-zdorove',
                        'parentId': 5,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 286,
                                'name': 'Косметика',
                                'slug': 'kosmetika',
                                'parentId': 30,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 287,
                                'name': 'Парфюмерия',
                                'slug': 'parfiumeriia',
                                'parentId': 30,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 288,
                                'name': 'Приборы и аксессуары',
                                'slug': 'pribory-i-aksessuary',
                                'parentId': 30,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 289,
                                'name': 'Средства гигиены',
                                'slug': 'sredstva-gigieny',
                                'parentId': 30,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 290,
                                'name': 'Средства для волос',
                                'slug': 'sredstva-dlia-volos',
                                'parentId': 30,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 291,
                                'name': 'Медицинские изделия',
                                'slug': 'meditsinskie-izdeliia',
                                'parentId': 30,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 292,
                                'name': 'Биологически активные добавки',
                                'slug': 'biologicheski-aktivnye-dobavki',
                                'parentId': 30,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 293,
                                'name': 'Услуги',
                                'slug': 'uslugi',
                                'parentId': 30,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    }
                ]
            },
            {
                'catId': 6,
                'name': 'Для дома и дачи',
                'slug': 'dlia-doma-i-dachi',
                'parentId': 0,
                'pos': 0,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 31,
                        'name': 'Бытовая техника',
                        'slug': 'bytovaia-tekhnika',
                        'parentId': 6,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 294,
                                'name': 'Для дома',
                                'slug': 'dlia-doma',
                                'parentId': 31,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 295,
                                'name': 'Для индивидуального ухода',
                                'slug': 'dlia-individualnogo-ukhoda',
                                'parentId': 31,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 296,
                                'name': 'Для кухни',
                                'slug': 'dlia-kukhni',
                                'parentId': 31,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 297,
                                'name': 'Климатическое оборудование',
                                'slug': 'klimaticheskoe-oborudovanie',
                                'parentId': 31,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 298,
                                'name': 'Другое',
                                'slug': 'drugoe',
                                'parentId': 31,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 32,
                        'name': 'Мебель и интерьер',
                        'slug': 'mebel-i-interer',
                        'parentId': 6,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 299,
                                'name': 'Компьютерные столы и кресла',
                                'slug': 'kompiuternye-stoly-i-kresla',
                                'parentId': 32,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 300,
                                'name': 'Кровати, диваны и кресла',
                                'slug': 'krovati-divany-i-kresla',
                                'parentId': 32,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 301,
                                'name': 'Кухонные гарнитуры',
                                'slug': 'kukhonnye-garnitury',
                                'parentId': 32,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 302,
                                'name': 'Освещение',
                                'slug': 'osveshchenie',
                                'parentId': 32,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 303,
                                'name': 'Подставки и тумбы',
                                'slug': 'podstavki-i-tumby',
                                'parentId': 32,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 304,
                                'name': 'Предметы интерьера, искусство',
                                'slug': 'predmety-interera-iskusstvo',
                                'parentId': 32,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 305,
                                'name': 'Столы и стулья',
                                'slug': 'stoly-i-stulia',
                                'parentId': 32,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 306,
                                'name': 'Текстиль и ковры',
                                'slug': 'tekstil-i-kovry',
                                'parentId': 32,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 307,
                                'name': 'Шкафы и комоды',
                                'slug': 'shkafy-i-komody',
                                'parentId': 32,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 308,
                                'name': 'Другое',
                                'slug': 'drugoe',
                                'parentId': 32,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 33,
                        'name': 'Посуда и товары для кухни',
                        'slug': 'posuda-i-tovary-dlia-kukhni',
                        'parentId': 6,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 309,
                                'name': 'Посуда',
                                'slug': 'posuda',
                                'parentId': 33,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 310,
                                'name': 'Товары для кухни',
                                'slug': 'tovary-dlia-kukhni',
                                'parentId': 33,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 34,
                        'name': 'Продукты питания',
                        'slug': 'produkty-pitaniia',
                        'parentId': 6,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 35,
                        'name': 'Ремонт и строительство',
                        'slug': 'remont-i-stroitelstvo',
                        'parentId': 6,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 311,
                                'name': 'Двери',
                                'slug': 'dveri',
                                'parentId': 35,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 312,
                                'name': 'Инструменты',
                                'slug': 'instrumenty',
                                'parentId': 35,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 313,
                                'name': 'Камины и обогреватели',
                                'slug': 'kaminy-i-obogrevateli',
                                'parentId': 35,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 314,
                                'name': 'Окна и балконы',
                                'slug': 'okna-i-balkony',
                                'parentId': 35,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 315,
                                'name': 'Потолки',
                                'slug': 'potolki',
                                'parentId': 35,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 316,
                                'name': 'Садовая техника',
                                'slug': 'sadovaia-tekhnika',
                                'parentId': 35,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 317,
                                'name': 'Сантехника и сауна',
                                'slug': 'santekhnika-i-sauna',
                                'parentId': 35,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 318,
                                'name': 'Стройматериалы',
                                'slug': 'stroimaterialy',
                                'parentId': 35,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 319,
                                'name': 'Другое',
                                'slug': 'drugoe',
                                'parentId': 35,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 36,
                        'name': 'Растения',
                        'slug': 'rasteniia',
                        'parentId': 6,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    }
                ]
            },
            {
                'catId': 7,
                'name': 'Бытовая электроника',
                'slug': 'bytovaia-elektronika',
                'parentId': 0,
                'pos': 0,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 37,
                        'name': 'Аудио и видео',
                        'slug': 'audio-i-video',
                        'parentId': 7,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 320,
                                'name': 'MP3-плееры',
                                'slug': 'mp3-pleery',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 321,
                                'name': 'Акустика, колонки, сабвуферы',
                                'slug': 'akustika-kolonki-sabvufery',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 322,
                                'name': 'Видео, DVD и Blu-ray плееры',
                                'slug': 'video-dvd-i-bl-ray-pleery',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 323,
                                'name': 'Видеокамеры',
                                'slug': 'videokamery',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 324,
                                'name': 'Кабели и адаптеры',
                                'slug': 'kabeli-i-adaptery',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 325,
                                'name': 'Микрофоны',
                                'slug': 'mikrofony',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 326,
                                'name': 'Музыка и фильмы',
                                'slug': 'muzyka-i-filmy',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 327,
                                'name': 'Музыкальные центры, магнитолы',
                                'slug': 'muzykalnye-tsentry-magnitoly',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 328,
                                'name': 'Наушники',
                                'slug': 'naushniki',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 329,
                                'name': 'Телевизоры и проекторы',
                                'slug': 'televizory-i-proektory',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 330,
                                'name': 'Усилители и ресиверы',
                                'slug': 'usiliteli-i-resivery',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 331,
                                'name': 'Аксессуары',
                                'slug': 'aksessuary',
                                'parentId': 37,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 38,
                        'name': 'Игры, приставки и программы',
                        'slug': 'igry-pristavki-i-programmy',
                        'parentId': 7,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 332,
                                'name': 'Игры для приставок',
                                'slug': 'igry-dlia-pristavok',
                                'parentId': 38,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 333,
                                'name': 'Игровые приставки',
                                'slug': 'igrovye-pristavki',
                                'parentId': 38,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 334,
                                'name': 'Компьютерные игры',
                                'slug': 'kompiuternye-igry',
                                'parentId': 38,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 335,
                                'name': 'Программы',
                                'slug': 'programmy',
                                'parentId': 38,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 39,
                        'name': 'Настольные компьютеры',
                        'slug': 'nastolnye-kompiutery',
                        'parentId': 7,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 40,
                        'name': 'Ноутбуки',
                        'slug': 'noutbuki',
                        'parentId': 7,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 41,
                        'name': 'Оргтехника и расходники',
                        'slug': 'orgtekhnika-i-raskhodniki',
                        'parentId': 7,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 336,
                                'name': 'МФУ, копиры и сканеры',
                                'slug': 'mfu-kopiry-i-skanery',
                                'parentId': 41,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 337,
                                'name': 'Принтеры',
                                'slug': 'printery',
                                'parentId': 41,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 338,
                                'name': 'Телефония',
                                'slug': 'telefoniia',
                                'parentId': 41,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 339,
                                'name': 'ИБП, сетевые фильтры',
                                'slug': 'ibp-setevye-filtry',
                                'parentId': 41,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 340,
                                'name': 'Уничтожители бумаг',
                                'slug': 'unichtozhiteli-bumag',
                                'parentId': 41,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 341,
                                'name': 'Расходные материалы',
                                'slug': 'raskhodnye-materialy',
                                'parentId': 41,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 342,
                                'name': 'Канцелярия',
                                'slug': 'kantseliariia',
                                'parentId': 41,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 42,
                        'name': 'Планшеты и электронные книги',
                        'slug': 'planshety-i-elektronnye-knigi',
                        'parentId': 7,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 343,
                                'name': 'Планшеты',
                                'slug': 'planshety',
                                'parentId': 42,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 344,
                                'name': 'Электронные книги',
                                'slug': 'elektronnye-knigi',
                                'parentId': 42,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 345,
                                'name': 'Аксессуары',
                                'slug': 'aksessuary',
                                'parentId': 42,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 43,
                        'name': 'Телефоны',
                        'slug': 'telefony',
                        'parentId': 7,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 346,
                                'name': 'Acer',
                                'slug': 'acer',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 347,
                                'name': 'Alcatel',
                                'slug': 'alcatel',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 348,
                                'name': 'ASUS',
                                'slug': 'ass',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 349,
                                'name': 'BlackBerry',
                                'slug': 'blackberry',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 350,
                                'name': 'BQ',
                                'slug': 'bq',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 351,
                                'name': 'DEXP',
                                'slug': 'dexp',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 352,
                                'name': 'Explay',
                                'slug': 'explay',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 353,
                                'name': 'Fly',
                                'slug': 'fly',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 354,
                                'name': 'Highscreen',
                                'slug': 'highscreen',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 355,
                                'name': 'HTC',
                                'slug': 'htc',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 356,
                                'name': 'Huawei',
                                'slug': 'haei',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 357,
                                'name': 'iPhone',
                                'slug': 'iphone',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 358,
                                'name': 'Lenovo',
                                'slug': 'lenovo',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 359,
                                'name': 'LG',
                                'slug': 'lg',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 360,
                                'name': 'Meizu',
                                'slug': 'meiz',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 361,
                                'name': 'Micromax',
                                'slug': 'micromax',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 362,
                                'name': 'Microsoft',
                                'slug': 'microsoft',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 363,
                                'name': 'Motorola',
                                'slug': 'motorola',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 364,
                                'name': 'MTS',
                                'slug': 'mts',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 365,
                                'name': 'Nokia',
                                'slug': 'nokia',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 366,
                                'name': 'Panasonic',
                                'slug': 'panasonic',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 367,
                                'name': 'Philips',
                                'slug': 'philips',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 368,
                                'name': 'Prestigio',
                                'slug': 'prestigio',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 369,
                                'name': 'Samsung',
                                'slug': 'samsng',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 370,
                                'name': 'Siemens',
                                'slug': 'siemens',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 371,
                                'name': 'SkyLink',
                                'slug': 'skylink',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 372,
                                'name': 'Sony',
                                'slug': 'sony',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 373,
                                'name': 'teXet',
                                'slug': 'texet',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 374,
                                'name': 'Vertu',
                                'slug': 'vert',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 375,
                                'name': 'Xiaomi',
                                'slug': 'xiaomi',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 376,
                                'name': 'ZTE',
                                'slug': 'zte',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 377,
                                'name': 'Другие марки',
                                'slug': 'drugie-marki',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 378,
                                'name': 'Рации',
                                'slug': 'ratsii',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 379,
                                'name': 'Стационарные телефоны',
                                'slug': 'statsionarnye-telefony',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 380,
                                'name': 'Аксессуары',
                                'slug': 'aksessuary',
                                'parentId': 43,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 44,
                        'name': 'Товары для компьютера',
                        'slug': 'tovary-dlia-kompiutera',
                        'parentId': 7,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 381,
                                'name': 'Акустика',
                                'slug': 'akustika',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 382,
                                'name': 'Веб-камеры',
                                'slug': 'veb-kamery',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 383,
                                'name': 'Джойстики и рули',
                                'slug': 'dzhoistiki-i-ruli',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 384,
                                'name': 'Клавиатуры и мыши',
                                'slug': 'klaviatury-i-myshi',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 385,
                                'name': 'Комплектующие',
                                'slug': 'komplektuiushchie',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 386,
                                'name': 'Мониторы',
                                'slug': 'monitory',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 387,
                                'name': 'Переносные жёсткие диски',
                                'slug': 'perenosnye-zhestkie-diski',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 388,
                                'name': 'Сетевое оборудование',
                                'slug': 'setevoe-oborudovanie',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 389,
                                'name': 'ТВ-тюнеры',
                                'slug': 'tv-tiunery',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 390,
                                'name': 'Флэшки и карты памяти',
                                'slug': 'fleshki-i-karty-pamiati',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 391,
                                'name': 'Аксессуары',
                                'slug': 'aksessuary',
                                'parentId': 44,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 45,
                        'name': 'Фототехника',
                        'slug': 'fototekhnika',
                        'parentId': 7,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 392,
                                'name': 'Компактные фотоаппараты',
                                'slug': 'kompaktnye-fotoapparaty',
                                'parentId': 45,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 393,
                                'name': 'Зеркальные фотоаппараты',
                                'slug': 'zerkalnye-fotoapparaty',
                                'parentId': 45,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 394,
                                'name': 'Плёночные фотоаппараты',
                                'slug': 'plenochnye-fotoapparaty',
                                'parentId': 45,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 395,
                                'name': 'Бинокли и телескопы',
                                'slug': 'binokli-i-teleskopy',
                                'parentId': 45,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 396,
                                'name': 'Объективы',
                                'slug': 'obieektivy',
                                'parentId': 45,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 397,
                                'name': 'Оборудование и аксессуары',
                                'slug': 'oborudovanie-i-aksessuary',
                                'parentId': 45,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    }
                ]
            },
            {
                'catId': 8,
                'name': 'Хобби и отдых',
                'slug': 'khobbi-i-otdykh',
                'parentId': 0,
                'pos': 0,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 46,
                        'name': 'Билеты и путешествия',
                        'slug': 'bilety-i-puteshestviia',
                        'parentId': 8,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 398,
                                'name': 'Карты, купоны',
                                'slug': 'karty-kupony',
                                'parentId': 46,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 399,
                                'name': 'Концерты',
                                'slug': 'kontserty',
                                'parentId': 46,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 400,
                                'name': 'Путешествия',
                                'slug': 'puteshestviia',
                                'parentId': 46,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 401,
                                'name': 'Спорт',
                                'slug': 'sport',
                                'parentId': 46,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 402,
                                'name': 'Театр, опера, балет',
                                'slug': 'teatr-opera-balet',
                                'parentId': 46,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 403,
                                'name': 'Цирк, кино',
                                'slug': 'tsirk-kino',
                                'parentId': 46,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 404,
                                'name': 'Шоу, мюзикл',
                                'slug': 'shou-miuzikl',
                                'parentId': 46,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 47,
                        'name': 'Велосипеды',
                        'slug': 'velosipedy',
                        'parentId': 8,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 405,
                                'name': 'Горные',
                                'slug': 'gornye',
                                'parentId': 47,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 406,
                                'name': 'Дорожные',
                                'slug': 'dorozhnye',
                                'parentId': 47,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 407,
                                'name': 'ВМХ',
                                'slug': 'vmkh',
                                'parentId': 47,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 408,
                                'name': 'Детские',
                                'slug': 'detskie',
                                'parentId': 47,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 409,
                                'name': 'Запчасти и аксессуары',
                                'slug': 'zapchasti-i-aksessuary',
                                'parentId': 47,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 48,
                        'name': 'Книги и журналы',
                        'slug': 'knigi-i-zhurnaly',
                        'parentId': 8,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 410,
                                'name': 'Журналы, газеты, брошюры',
                                'slug': 'zhurnaly-gazety-broshiury',
                                'parentId': 48,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 411,
                                'name': 'Книги',
                                'slug': 'knigi',
                                'parentId': 48,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 412,
                                'name': 'Учебная литература',
                                'slug': 'uchebnaia-literatura',
                                'parentId': 48,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 49,
                        'name': 'Коллекционирование',
                        'slug': 'kollektsionirovanie',
                        'parentId': 8,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 413,
                                'name': 'Банкноты',
                                'slug': 'banknoty',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 414,
                                'name': 'Билеты',
                                'slug': 'bilety',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 415,
                                'name': 'Вещи знаменитостей, автографы',
                                'slug': 'veshchi-znamenitostei-avtografy',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 416,
                                'name': 'Военные вещи',
                                'slug': 'voennye-veshchi',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 417,
                                'name': 'Грампластинки',
                                'slug': 'gramplastinki',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 418,
                                'name': 'Документы',
                                'slug': 'dokumenty',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 419,
                                'name': 'Жетоны, медали, значки',
                                'slug': 'zhetony-medali-znachki',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 420,
                                'name': 'Игры',
                                'slug': 'igry',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 421,
                                'name': 'Календари',
                                'slug': 'kalendari',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 422,
                                'name': 'Картины',
                                'slug': 'kartiny',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 423,
                                'name': 'Киндер-сюрприз',
                                'slug': 'kinder-siurpriz',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 424,
                                'name': 'Конверты и почтовые карточки',
                                'slug': 'konverty-i-pochtovye-kartochki',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 425,
                                'name': 'Макеты оружия',
                                'slug': 'makety-oruzhiia',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 426,
                                'name': 'Марки',
                                'slug': 'marki',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 427,
                                'name': 'Модели',
                                'slug': 'modeli',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 428,
                                'name': 'Монеты',
                                'slug': 'monety',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 429,
                                'name': 'Открытки',
                                'slug': 'otkrytki',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 430,
                                'name': 'Пепельницы, зажигалки',
                                'slug': 'pepelnitsy-zazhigalki',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 431,
                                'name': 'Пластиковые карточки',
                                'slug': 'plastikovye-kartochki',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 432,
                                'name': 'Спортивные карточки',
                                'slug': 'sportivnye-kartochki',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 433,
                                'name': 'Фотографии, письма',
                                'slug': 'fotografii-pisma',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 434,
                                'name': 'Этикетки, бутылки, пробки',
                                'slug': 'etiketki-butylki-probki',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 435,
                                'name': 'Другое',
                                'slug': 'drugoe',
                                'parentId': 49,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 50,
                        'name': 'Музыкальные инструменты',
                        'slug': 'muzykalnye-instrumenty',
                        'parentId': 8,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 436,
                                'name': 'Аккордеоны, гармони, баяны',
                                'slug': 'akkordeony-garmoni-baiany',
                                'parentId': 50,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 437,
                                'name': 'Гитары и другие струнные',
                                'slug': 'gitary-i-drugie-strunnye',
                                'parentId': 50,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 438,
                                'name': 'Духовые',
                                'slug': 'dukhovye',
                                'parentId': 50,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 439,
                                'name': 'Пианино и другие клавишные',
                                'slug': 'pianino-i-drugie-klavishnye',
                                'parentId': 50,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 440,
                                'name': 'Скрипки и другие смычковые',
                                'slug': 'skripki-i-drugie-smychkovye',
                                'parentId': 50,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 441,
                                'name': 'Ударные',
                                'slug': 'udarnye',
                                'parentId': 50,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 442,
                                'name': 'Для студии и концертов',
                                'slug': 'dlia-studii-i-kontsertov',
                                'parentId': 50,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 443,
                                'name': 'Аксессуары',
                                'slug': 'aksessuary',
                                'parentId': 50,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 51,
                        'name': 'Охота и рыбалка',
                        'slug': 'okhota-i-rybalka',
                        'parentId': 8,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 52,
                        'name': 'Спорт и отдых',
                        'slug': 'sport-i-otdykh',
                        'parentId': 8,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 444,
                                'name': 'Бильярд и боулинг',
                                'slug': 'biliard-i-bouling',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 445,
                                'name': 'Дайвинг и водный спорт',
                                'slug': 'daiving-i-vodnyi-sport',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 446,
                                'name': 'Единоборства',
                                'slug': 'edinoborstva',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 447,
                                'name': 'Зимние виды спорта',
                                'slug': 'zimnie-vidy-sporta',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 448,
                                'name': 'Игры с мячом',
                                'slug': 'igry-s-miachom',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 449,
                                'name': 'Настольные игры',
                                'slug': 'nastolnye-igry',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 450,
                                'name': 'Пейнтбол и страйкбол',
                                'slug': 'peintbol-i-straikbol',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 451,
                                'name': 'Ролики и скейтбординг',
                                'slug': 'roliki-i-skeitbording',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 452,
                                'name': 'Теннис, бадминтон, пинг-понг',
                                'slug': 'tennis-badminton-ping-pong',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 453,
                                'name': 'Туризм',
                                'slug': 'turizm',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 454,
                                'name': 'Фитнес и тренажёры',
                                'slug': 'fitnes-i-trenazhery',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 455,
                                'name': 'Спортивное питание',
                                'slug': 'sportivnoe-pitanie',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 456,
                                'name': 'Другое',
                                'slug': 'drugoe',
                                'parentId': 52,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    }
                ]
            },
            {
                'catId': 9,
                'name': 'Животные',
                'slug': 'zhivotnye',
                'parentId': 0,
                'pos': 0,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 53,
                        'name': 'Собаки',
                        'slug': 'sobaki',
                        'parentId': 9,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 54,
                        'name': 'Кошки',
                        'slug': 'koshki',
                        'parentId': 9,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 55,
                        'name': 'Птицы',
                        'slug': 'ptitsy',
                        'parentId': 9,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 56,
                        'name': 'Аквариум',
                        'slug': 'akvarium',
                        'parentId': 9,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 57,
                        'name': 'Другие животные',
                        'slug': 'drugie-zhivotnye',
                        'parentId': 9,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 457,
                                'name': 'Амфибии',
                                'slug': 'amfibii',
                                'parentId': 57,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 458,
                                'name': 'Грызуны',
                                'slug': 'gryzuny',
                                'parentId': 57,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 459,
                                'name': 'Кролики',
                                'slug': 'kroliki',
                                'parentId': 57,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 460,
                                'name': 'Лошади',
                                'slug': 'loshadi',
                                'parentId': 57,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 461,
                                'name': 'Рептилии',
                                'slug': 'reptilii',
                                'parentId': 57,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 462,
                                'name': 'С/х животные',
                                'slug': 'skh-zhivotnye',
                                'parentId': 57,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 463,
                                'name': 'Хорьки',
                                'slug': 'khorki',
                                'parentId': 57,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 464,
                                'name': 'Другое',
                                'slug': 'drugoe',
                                'parentId': 57,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 58,
                        'name': 'Товары для животных',
                        'slug': 'tovary-dlia-zhivotnykh',
                        'parentId': 9,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': null
                    }
                ]
            },
            {
                'catId': 10,
                'name': 'Для бизнеса',
                'slug': 'dlia-biznesa',
                'parentId': 0,
                'pos': 0,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 59,
                        'name': 'Готовый бизнес',
                        'slug': 'gotovyi-biznes',
                        'parentId': 10,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 465,
                                'name': 'Интернет-магазин',
                                'slug': 'internet-magazin',
                                'parentId': 59,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 466,
                                'name': 'Общественное питание',
                                'slug': 'obshchestvennoe-pitanie',
                                'parentId': 59,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 467,
                                'name': 'Производство',
                                'slug': 'proizvodstvo',
                                'parentId': 59,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 468,
                                'name': 'Развлечения',
                                'slug': 'razvlecheniia',
                                'parentId': 59,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 469,
                                'name': 'Сельское хозяйство',
                                'slug': 'selskoe-khoziaistvo',
                                'parentId': 59,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 470,
                                'name': 'Строительство',
                                'slug': 'stroitelstvo',
                                'parentId': 59,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 471,
                                'name': 'Сфера услуг',
                                'slug': 'sfera-uslug',
                                'parentId': 59,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 472,
                                'name': 'Торговля',
                                'slug': 'torgovlia',
                                'parentId': 59,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 473,
                                'name': 'Другое',
                                'slug': 'drugoe',
                                'parentId': 59,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 60,
                        'name': 'Оборудование для бизнеса',
                        'slug': 'oborudovanie-dlia-biznesa',
                        'parentId': 10,
                        'pos': 0,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 474,
                                'name': 'Для магазина',
                                'slug': 'dlia-magazina',
                                'parentId': 60,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 475,
                                'name': 'Для офиса',
                                'slug': 'dlia-ofisa',
                                'parentId': 60,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 476,
                                'name': 'Для ресторана',
                                'slug': 'dlia-restorana',
                                'parentId': 60,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 477,
                                'name': 'Для салона красоты',
                                'slug': 'dlia-salona-krasoty',
                                'parentId': 60,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 478,
                                'name': 'Промышленное',
                                'slug': 'promyshlennoe',
                                'parentId': 60,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 479,
                                'name': 'Другое',
                                'slug': 'drugoe',
                                'parentId': 60,
                                'pos': 0,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    }
                ]
            }
        ]
    };
    private detachClick: () => void;
    isActive: boolean = false;
    catTreeHTML: string = '';
    @ViewChild('nav', {static: true}) nav: ElementRef;
    @ViewChild('button', {static: true}) button: ElementRef;

    constructor(
        private renderer: Renderer2,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.catTreeHTML = this.walkOnCats(this.catTree.childes, '/cat');
    }

    ngOnDestroy(): void {
        this.toggleEventOnLink(false);
    }

    ngAfterViewInit() {
        this.toggleEventOnLink(true);
    }

    toggleEventOnLink(isAdd: boolean): void {
        if (!this.links.length) {
            const elements = this.nav.nativeElement.querySelectorAll('.nav_tree a');
            for (let element of elements) {
                this.links.push(element);
            }
        }

        for (let i = 0; i < this.links.length; i++) {
            if (isAdd) {
                this.links[i].addEventListener('click', (e) => this.onClickToLink(e));
            } else {
                this.links[i].removeEventListener('click', null);
            }
        }

        if (!isAdd) {
            this.links.length = 0;
        }
    }

    onClickToLink({target}): void {
        var brothers = target.parentNode.querySelector(':scope > ul');

        if (!brothers) {
            const url = target.getAttribute('routerLink');
            this.router.navigate([url]).then((ok) => {
                ok ? this.hideMenu() : alert('Error in route navigate');
            });
            return;
        }

        var grandFather = target.closest('ul');
        var matches = grandFather.querySelectorAll(':scope > li > a');
        for (let elem of matches) {
            elem.classList.remove('sx-active');
        }

        target.classList.add('sx-active');
    }

    toggleMenu(): void {
        !this.isActive ? this.openMenu() : this.hideMenu();
    }

    openMenu(): void {
        this.isActive = true;
        this.detachClick = this.renderer.listen('document', 'click', (e) => {
            const inZone = e.target.closest('.nav_tree');
            if (e.target != this.button.nativeElement && !inZone) {
                this.hideMenu();
            }
        });
    }

    hideMenu(): void {
        this.isActive = false;

        this.detachClick();
        for (let i = 0; i < this.links.length; i++) {
            this.links[i].classList.remove('sx-active');
        }
    }

    walkOnCats(aCats, url): string {
        let result = '<ul>';

        for (let cat of aCats) {
            const urlNew = url + '/' + cat.slug;
            const hasChildes = cat.childes && cat.childes.length;
            const sxHasChilds = hasChildes ? ' sx-has-childes' : '';
            const routerLink = !hasChildes ? ' routerLink="' + urlNew + '"' : '';
            const href = !hasChildes ? ' href="javascript:void(0);"' : '';

            result += '<li><a class="text-eclipse' + sxHasChilds + '"' + routerLink + href + ' title="' + cat.name + '">' + cat.name + '</a>';

            if (hasChildes) {
                result += this.walkOnCats(cat.childes, urlNew);
            }

            result += '</li>';
        }

        result += '</ul>';

        return result;
    }
}
