/**
 * MiausicBox visitor component.
 * @component VisitorComponent
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'visitor',
  templateUrl: 'templates/principalSinLogIn.html'
})

export class VisitorComponent{

  constructor(private _router: Router){}

  goToPrincipal(){
    this._router.navigate(['/']);
  }

}
