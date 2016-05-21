
import { Component } from 'angular2/core';
import { Router } from 'angular2/router';


@Component({
  selector: 'visitor',
  templateUrl: 'templates/principalSinLogIn.html'
})
export class VisitorComponent{

  constructor(private _router: Router){};

  goToPrincipal(){
    this._router.navigate(['Index']);
  }

}
