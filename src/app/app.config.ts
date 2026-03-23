// src/app/app.config.ts

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './backend/in-memory-data.service';
import { importProvidersFrom } from '@angular/core';


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, } from '@angular/platform-browser';

/* 
  This File configures app-wide providers and settings.

  - provideRouter(routes) : enables routing
  - provideHttpClient() : enables HTTPClient for API calls
  - InMemoryWebApiModule connects out fake backend service
*/

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),

    /* 
      This Connects the fake backend to the app.
      dataEncapsulation: false keeps API responses simple.
      The API base becomes /api
    */
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
         dataEncapsulation: false 
        })
    ),
  ],
};
