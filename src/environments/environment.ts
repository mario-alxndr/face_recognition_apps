// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const defaultEndpoint = 'http://192.168.199.201:5000';
// const defaultEndpoint = 'http://127.0.0.1:5000/';

export const environment = {
  production: false,
  endPointConstant: {
    loginEndPoint:defaultEndpoint+'/login',
    predictEndPoint:defaultEndpoint+'/predict',
    absenlistEndPoint:defaultEndpoint+'/absenlist'
  },
  tokenKeyStorage: {
    userid: 'user-id'
  },
  fullNameUser: [
    'Alandi Jaya',
    'Alvin Valenciano',
    'Andreas Agustinus',
    'Bella Anggraini',
    'Effi Marsela',
    'Frans Imanuel',
    'James Christian',
    'Dhammajoti',
    'Mario Alexander',
    'Matthew Evans',
    'Meilona',
    'Moya',
    'Niki Emersan',
    'Priskila',
    'Michael Roni'
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
