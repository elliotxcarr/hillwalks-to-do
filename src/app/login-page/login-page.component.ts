import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '@angular/forms'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [ FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{

  constructor (private router:Router){};

  enteredUsername: string = '';
  eneteredPassword: string = '';
  users: User[] = [];
  
  ngOnInit(): void {
      fetch('http://localhost:5001/users')
      .then(res => res.json())
      .then(data => this.users = data)
      
      .catch(error => console.error(error))
  }
  
  onSubmit(){
    //let userFound = this.findUser();
    //if(userFound){
      this.router.navigate(['home']);
    //}
    //else{
      //alert('Incorrect username or password')
    //}
  }

  findUser():object | null{
    return this.users.find(user => user.username === this.enteredUsername && user.password === this.eneteredPassword) || null;
  }
}

interface User{
  username: string;
  password: string;
  name: string;
}