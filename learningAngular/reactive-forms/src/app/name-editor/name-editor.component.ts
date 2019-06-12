import { Component } from '@angular/core';
import { FormControl, Form } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  name = new FormControl('');
  ngOnInit() {
    debugger
    this.name.registerOnChange((value, viewToModel)=>{
      debugger
    })
  }


  updateName() {
    this.name.setValue('Nancy');
  }
}
