import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  nuevoUsuario :Usuario ={
    rolUsuario_rousid: 0,
    descripcion: '',
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    estado: ''
  };

  constructor(private usuarioService:UsuarioService,
              private route:Router,
              private fb:FormBuilder){}

  registroFormulario:FormGroup = this.fb.group({
    nombre:['',[Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(/^[A-Za-z]+$/)]],
    apellido:['',[Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(/^[A-Za-z]+$/)]],
    email:['',[Validators.required,Validators.minLength(15),Validators.maxLength(64),Validators.pattern(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]/)]],
    cedula:['',[Validators.required,Validators.minLength(8),Validators.maxLength(10),Validators.pattern(/^[0-9]+$/)]]
  })

}
