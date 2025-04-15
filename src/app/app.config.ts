import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { authReducer } from './state/authState/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthEffects } from './state/authState/auth.effects';
import { AuthService } from './services/auth.service';
import { userReducer } from './state/userState/user.reducer';
import { UserEffects } from './state/userState/user.effects';
import { WalkService } from './services/walk.service';
import { UserService } from './services/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideStore({auth: authReducer, user: userReducer}),
    provideEffects(AuthEffects, UserEffects),
    provideHttpClient(withFetch()),
    AuthService,
    WalkService,
    UserService
  ]
};
