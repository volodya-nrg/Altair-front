// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080',
    emailSupport: 'support@altair.uz',
    curYear: 2020,
    dirImages: '/api/v1/images',
    dirResample: '/api/v1/resample',
    minLenPassword: 6,
    minLenHash: 32,
    domain: 'https://www.altair.uz',
    ymapsPathScript: 'https://api-maps.yandex.ru/2.1/?apikey=777a18a8-eb0d-4f9b-ae88-99aed55c227b&lang=ru_RU',
    youTubeExampleLink: 'https://www.youtube.com/watch?v=zU-LndSG5RE',
    // походу массивы тут нельзя ставить
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
