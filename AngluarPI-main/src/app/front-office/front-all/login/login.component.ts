import {Component, Inject} from '@angular/core';
import {AuthenticationRequest} from "../../../model/authentication-request";
import {AuthenticationResponse} from "../../../model/authentication-response";
import {AuthenticationService} from "../serives/authentication.service";
import {Router} from "@angular/router";
import {VerificationRequest} from "../../../model/verification-request";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {};
  otpCode = '';
  errorMessage= '';
  authResponse: AuthenticationResponse = {};

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    @Inject(UserService) private userService: UserService // Inject UserService
  ) { }

  authenticate() {
    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled ) {

            localStorage.setItem('token', response.accessToken as string);
            this.userService.getuserID(this.authRequest.email).subscribe((id: number) => {
              // Convert ID to string before storing it in local storage
              localStorage.setItem('userID', id.toString());
              localStorage.getItem('userID');
              this.fetchUserDetailsAndNavigate();
            }, (error) => {

              console.error('Error getting user ID:', error);
            });
          }
        },
        error:(err)=>{
          this.errorMessage = 'Email or password incorrect.';
          console.log(err);
        }
      });
  }

  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken as string);
          this.fetchUserDetailsAndNavigate();
        }
      });
  }
  fetchUserDetailsAndNavigate() {
    this.userService.getUserDetails(this.authRequest.email)
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
}
