import { Component } from '@angular/core';
import { add } from 'gibbon-1st-pkg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstAngularApp';
  ngOnInit() {
    debugger
    var a = add(1,1);
    console.log('hello angular');
  }
}
