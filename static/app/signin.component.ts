import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';


@Component({
  selector: 'signin',
  templateUrl: 'templates/signin.html'
})

export class SignInComponent{

  constructor(private _router: Router){}

  goToIndex(){
    this._router.navigate(['Index']);
  }

}
