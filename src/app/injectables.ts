import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { WalkStore } from "./store/walk/walks.store";
import { UserStore } from "./store/user/user.store";
import { Router } from "@angular/router";
import { Dispatcher, Events } from "@ngrx/signals/events";
import { WalkService } from "./services/walk.service";

export const getInjectableDeps = () => {
  const _events = inject(Events);
  const _authService = inject(AuthService);
  const _walkStore = inject(WalkStore);
  const _userStore = inject(UserStore);
  const _router = inject(Router);
  const _dispatcher = inject(Dispatcher);
  const _walkService = inject(WalkService);

  return {
    _events,
    _authService,
    _walkStore,
    _userStore,
    _router,
    _dispatcher,
    _walkService
  }
}