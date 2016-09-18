
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";



@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
		<div id="navPag">
			<logged></logged>
		</div>
		<router-outlet></router-outlet>
	`
})
export class AppComponent {

  constructor(private _router: Router, private _sanitize: DomSanitizer){
    this.routerSubscription();
  }
  
  routerSubscription(){

    this._router.events.subscribe(() => {
      var val = window.location.pathname;
      console.log(val);
      if(val == "/" || val == "/visitor" || val == "/signin"){
        document.getElementById("navPag").style.visibility = "hidden";
      }
      else{
        document.getElementById("navPag").style.visibility = "visible";
      }
    })

  }





}
