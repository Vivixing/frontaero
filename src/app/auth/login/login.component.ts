import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credencialesNoValidas:boolean = false

  usuario ={
    cedula: "",
    email: ""
  }

  constructor(private usuarioService:UsuarioService,
              private route:Router,
              private fb : FormBuilder){}

  loginFormulario: FormGroup = this.fb.group({
    cedula: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(10),Validators.pattern(/^[0-9]+$/)]],
    email:['',[Validators.required,Validators.minLength(20),Validators.maxLength(64),Validators.pattern(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]/)]]
  })

  iniciarSesion(){
    this.usuario.cedula = this.loginFormulario.value['cedula']
    this.usuario.email =this.loginFormulario.value['email']
    //Crear en el back obtener usuario por Cédula o implementar el del obtener usuario por Id
    this.loginFormulario.valid
  }

  usuarioExistenteEnBd(usuarioExite: Usuario){
    if(usuarioExite.rolUsuario_rousid == 1){ //el id 1 de rolUsuario es el Admin
      if(usuarioExite.correo == this.usuario.email){
        this.route.navigate(["/administrador/dashboard"])
        this.credencialesNoValidas = false
      }
      this.credencialesNoValidas = true
    }
  }
}
