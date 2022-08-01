import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import base64url from "base64url";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http:HttpClient){}
  title = 'fido';
  form: any ={
    displayName: null,
    email: null
  }
  onUser(details: {email:any , username:any}){

    // const data = {}
    // // data.append('username', details.email);
    // // data.append('displayName', details.username);
    
    // data{'attType', 'none');
    // data.append('authType', '');
    // data.append('userVerification', 'required');
    // data.append('requireResidentKey', 'false'); 
    const data={
      // email:details.email,
      // username:details.username,
      attType: 'none',
      aythType: "",
      requireResidentKey: false,
      userVerification: 'required',
    }

    // let authresponse 
    this.http.post(`https://localhost:7125/api/Login/makeCredintialsOptions?DisplayName=${details.username}&UserName=${details.email}`,data)
    .subscribe(async(result)=>{
        const publicKey = this.preformatMakeCredReq(result);
        console.log('register: make cred request:', publicKey);
         const a:any=await navigator.credentials.create({publicKey}).then((authresponse:any)=>{
          console.log(authresponse)
          // let a= decode(authresponse.rawId)
          // authresponse.rawId = new Uint8Array(32);
          // window.crypto.getRandomValues(authresponse.rawId);
          var ab2str = require('arraybuffer-to-string')
 
var uint8 = new Uint8Array(authresponse.rawId)
var uint9 = new Uint8Array(authresponse.response.attestationObject)
var uint10 = new Uint8Array(authresponse.response.clientDataJSON)

 
// ab2str(uint8) // 'Hello World!'
ab2str(uint8, 'base64') // 'SGVsbG8gV29ybGQh'
console.log(ab2str(uint8, 'base64'))
ab2str(uint9, 'base64') // 'SGVsbG8gV29ybGQh'
console.log(ab2str(uint9, 'base64'))
ab2str(uint10, 'base64') // 'SGVsbG8gV29ybGQh'
console.log(ab2str(uint10, 'base64'))
// ab2str(uint8, 'hex') // '48656c6c6f20576f726c6421'
// ab2str(uint8, 'iso-8859-2')
// console.log(ab2str(uint8, 'base64') )
         
          let data_auth = {
            id: authresponse.id,  
            rawId: ab2str(uint8, 'base64'),
            type: authresponse.type,
            response: {
              attestation: ab2str(uint9, 'base64'),
              clientDataJSON:ab2str(uint10, 'base64')
            }
           
          }
          console.log(data_auth)
         
          this.http.post(`https://localhost:7125/pwmakeCredential`,data_auth)
          .subscribe(async(result)=>{
              const publicKey = this.preformatMakeCredReq(result);
              console.log('register: make cred request:', publicKey);
               const a:any=await navigator.credentials.create({publicKey}).then(authresponse=>{
                console.log(authresponse)
               })
         })
         
       })
   
         
       })
      

      }

      private preformatMakeCredReq(makeCredReq:any) {
        makeCredReq.challenge = new Uint8Array(32);
        window.crypto.getRandomValues(makeCredReq.challenge);
        makeCredReq.user.id = new Uint8Array(32);
        window.crypto.getRandomValues(makeCredReq.user.id);
        

        return makeCredReq;
      }


  // onSubmit()
  // {
  //   this.http.post('https://localhost:44326/pwmakeCredentialOptions,this.form.displayName,this.form.displayName)
  //   .subscribe((result)=>{
  //     console.warn("result",result)
  //   })
  //   // console.log(this.form.displayName);
  //   // console.log(this.form.email);
    
  // }
}
