import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NotificationsService,
  Options,
  SimpleNotificationsModule,
} from 'angular2-notifications';
import { NgxLoadingModule } from 'ngx-loading';
import { AuthService } from './shared/services/auth.service';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
  LayoutModule,
  MediaMatcher,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleNotificationsModule, NgxLoadingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'musical-events';
  notificationsOptions: Options = {
    position: ['top', 'right'],
    timeOut: 3000,
  };
  authService = inject(AuthService);
  breakpointObserver = inject(BreakpointObserver);
  constructor() {
    this.authService.verifyLocalStorage();

    //implement angular cdk layout
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Matches small screen');
        } else {
          console.log('Matches large screen');
        }
      });
  }
}
