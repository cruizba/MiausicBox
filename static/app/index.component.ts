import { Component, OnInit } from 'angular2/core';
import { Router} from 'angular2/router';


@Component({
  selector: 'index-app',
  templateUrl: 'templates/index_app.html'
})

export class IndexComponent{

  constructor(private _router: Router){}

  goTo(paramsRoute:any[]){
    this._router.navigate(paramsRoute);
  }


}
