import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index.component';
import { VisitorComponent} from "./visitor.component";
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

const appRoutes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'visitor',
    component: VisitorComponent
  },
  {
    path: 'artist/:id',
    component: ArtistaComponent
  },
  {
    path: 'principal',
    component: PrincipalComponent
  },
  {
    path: 'messages/:id',
    component: MessagesComponent
  },
  {
    path: 'listArtist',
    component: ListArtistComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'listBands',
    component: ListBandsComponent
  },
  {
    path: 'band/:id',
    component: BandComponent
  },
  {
    path: 'followers/:id',
    component: FollowersComponent
  },
  {
    path: 'following/:id',
    component: FollowingComponent
  },
  {
    path: 'event/:id',
    component: EventComponent
  },
  {
    path: 'followersEvent/:id',
    component: FollowersEvent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [IndexComponent, VisitorComponent, ArtistaComponent, PrincipalComponent,
                                    MessagesComponent, ListArtistComponent, ListBandsComponent,
                                    EventsComponent, BandComponent, FollowersComponent, FollowingComponent,
                                    EventComponent, FollowersEvent];

