import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['Will', [
        Validators.required,
        Validators.minLength(3)
      ]],
      subtitle: ['Hello', [
        Validators.required
      ]]
    });
  }

  doSubmit() {
    if (this.form.valid) {
      // HTTP POST
      console.log(this.form.value);
    }
  }

}
