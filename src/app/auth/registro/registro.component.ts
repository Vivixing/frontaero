import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {


  constructor(private usuarioService: UsuarioService,
    private route: Router,
    private fb: FormBuilder,
    private toast: ToastrService
  ) { }

  registroFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(/^[A-Za-z]+$/)]],
    apellido: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(/^[A-Za-z]+$/)]],
    email: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(64), Validators.pattern(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]/)]],
    cedula: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]]
  })

  create(): void {
    const datos = this.registroFormulario.value
    const nuevoUsuario: Usuario = {
      rolUsuario_rousid: 106,
      cedula: datos.cedula,
      nombre: datos.nombre,
      apellido: datos.apellido,
      correo: datos.email,
      estado: 'Activo'
    };
    console.log(nuevoUsuario)
    this.usuarioService.crearUsuario(nuevoUsuario).subscribe(
      res => {
        this.route.navigate(['auth/login'])
        this.toast.success('¡Ingreso Exitoso!', 'Usuario Creado')
      }, (err: HttpErrorResponse) => {
        if (err.status == 400) {
          console.log(err.error);
          const mensaje = err.error.mensaje;
          this.toast.error('¡Algo salió mal!', mensaje);
        }
      })
  }
}
