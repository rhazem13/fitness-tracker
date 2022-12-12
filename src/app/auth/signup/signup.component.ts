import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit , OnDestroy{
  isLoading: boolean = false;
  maxDate;
  private loadingSub:Subscription;
  constructor(private authService: AuthService, private uiService: UIService){}
  ngOnDestroy(): void {
    if(this.loadingSub){
      this.loadingSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(s=>{
      this.isLoading=s;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({email: form.value.email, password: form.value.password});
  }
}
