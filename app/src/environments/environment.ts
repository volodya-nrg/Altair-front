// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiServer: 'http://localhost:8080',
    emailSupport: 'support@altair.uz',
    curYear: 2020,
    minLenPassword: 6,
    minLenHash: 32,
    domain: 'http://localhost:4200',
    ymapsPathScript: 'https://api-maps.yandex.ru/2.1/?apikey=777a18a8-eb0d-4f9b-ae88-99aed55c227b&lang=ru_RU',
    youTubeExampleLink: 'https://www.youtube.com/watch?v=zU-LndSG5RE',
    timeSecBlockForPhoneSend: 60,
    timeSecWaitErrorFly: 6,
    socAppId: {
        vk: '7520624',
        ok: '512000541449',
        fb: '2574751919521239',
        ggl: '775305775622-bpkkoj8u168faunlpjoai57g60puc99b.apps.googleusercontent.com',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
