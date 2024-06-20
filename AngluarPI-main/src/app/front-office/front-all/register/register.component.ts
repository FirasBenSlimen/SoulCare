import {Component, Inject} from '@angular/core';
import {RegisterRequest} from "../../../model/register-request";
import {AuthenticationResponse} from "../../../model/authentication-response";
import {AuthenticationService} from "../serives/authentication.service";
import {Router} from "@angular/router";
import {VerificationRequest} from "../../../model/verification-request";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  message = '';
  otpCode = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    @Inject(UserService) private userService: UserService
  ) {
  }

  registerUser() {
    this.message = '';
    this.authService.register(this.registerRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.authResponse = response;
          } else {
            // inform the user
            console.log(this.registerRequest);
            this.message = 'Account created please check your mail to activate your account\nYou will be redirected to the Login page in 5 seconds';
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 5000)
          }
        }
      });

  }
  fetchUserDetailsAndNavigate() {
    console.log(this.registerRequest.email);
    this.userService.getUserDetails(this.registerRequest.email)
      .subscribe({
        next: (userDetails: any) => { // Type assertion to any
          const role = userDetails.role;
          console.log(role)
          this.navigateToAppropriateUrl(role);
        },
        error: (err) => {
          console.error('Failed to fetch user details:', err);
          // Handle error
        }
      });
  }
  navigateToAppropriateUrl(role: string | undefined) {
    console.log(role);
    if (role === 'Admin') {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['home']);
    }
  }
  verifyTfa() {
    this.message = '';
    const verifyRequest: VerificationRequest = {
      email: this.registerRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          this.message = 'Account created successfully\nYou will be redirected to the Welcome page in 3 seconds';
          setTimeout(() => {
            localStorage.setItem('token', response.accessToken as string);

            this.router.navigate(['login']);
          }, 3000);
        }
      });
  }
}
