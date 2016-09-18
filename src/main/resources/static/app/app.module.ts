import { NgModule } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { routing, routedComponents, appRoutingProviders } from './app.routing';
import {IndexComponent} from "./index.component";
import {VisitorComponent} from "./visitor.component";
import {LoggedComponent} from "./logged.component";
import {UserService} from "./services/user.service";
import {LoginService} from "./services/login.service";
import {BandService} from "./services/band.service";
import {BlogService} from "./services/blog.service";
import {PrincipalService} from "./services/principal.service";
import {FollowService} from "./services/follow.service";
import {MessageService} from "./services/message.service";
import {EventService} from "./services/event.service";
import {ArtistaComponent} from "./profile.component";
import {PrincipalComponent} from "./principal.component";
import {MessagesComponent} from "./messages.component";
import {ListArtistComponent} from "./list-artist.component";
import {EventsComponent} from "./events.component";
import {ListBandsComponent} from "./list-bands.component";
import {BandComponent} from "./band.component";
import {FollowersComponent} from "./followers.component";
import {FollowingComponent} from "./following.component";
import {EventComponent} from "./event.component";
import {FollowersEvent} from "./followersEvent.component";
import {NoveltyService} from "./services/novelty.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    VisitorComponent,
    LoggedComponent,
    ArtistaComponent,
    PrincipalComponent,
    MessagesComponent,
    ListArtistComponent,
    EventsComponent,
    ListBandsComponent,
    BandComponent,
    FollowersComponent,
    FollowingComponent,
    EventComponent,
    FollowersEvent,
    routedComponents
  ],
  providers: [appRoutingProviders,
              UserService, LoginService, BandService, BlogService, PrincipalService, FollowService,
              MessageService, EventService, NoveltyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
