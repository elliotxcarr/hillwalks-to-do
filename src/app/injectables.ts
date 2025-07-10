import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { Dispatcher, Events } from "@ngrx/signals/events";
import { WalkService } from "./services/walk.service";

export const getInjectableDeps = () => {
  const _events = inject(Events);
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const _dispatcher = inject(Dispatcher);
  const _walkService = inject(WalkService);

  return {
    _events,
    _authService,
    _router,
    _dispatcher,
    _walkService
  }
}