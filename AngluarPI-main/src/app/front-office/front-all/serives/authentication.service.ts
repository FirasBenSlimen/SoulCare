import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../../../model/register-request";
import {AuthenticationResponse} from "../../../model/authentication-response";
import {VerificationRequest} from "../../../model/verification-request";
import {AuthenticationRequest} from "../../../model/authentication-request";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8085/mindCare/api/v1/auth'

  constructor(
    private http: HttpClient
  ) { }

  register(
    registerRequest: RegisterRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/register`, registerRequest);
  }

  login(
    authRequest: AuthenticationRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/authenticate`, authRequest);
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/verify`, verificationRequest);
  }
  confirm(token: string ) {
    return this.http.get<any>
    (`${this.baseUrl}/activate-account?emailtoken=${token}`);
  }
}
