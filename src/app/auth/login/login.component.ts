import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credencialesNoValidas: boolean = false

  usuario = {
    cedula: "",
    email: ""
  }

  constructor(private usuarioService: UsuarioService,
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    ) { }

  loginFormulario: FormGroup = this.fb.group({
    cedula: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
    email: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(64), Validators.pattern(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]/)]]
  })

  iniciarSesion() {
    this.usuario.cedula = this.loginFormulario.value['cedula']
    this.usuario.email = this.loginFormulario.value['email']
    //Crear en el back obtener usuario por Cédula o implementar el del obtener usuario por Id
    this.usuarioService.obtenerUsuarioByCorreoYCedula(this.usuario.email, this.usuario.cedula).subscribe((response) => {
      if (response !== null) {
        this.usuarioExistenteEnBd(response)
      } else {
        this.credencialesNoValidas = true
        alert('No existen esas credenciales');
      }
    })
    this.loginFormulario.valid
  }

  usuarioExistenteEnBd(usuarioExite: Usuario) {
    if (usuarioExite.rolUsuario_rousid == 1) { //el id 1 de rolUsuario es el Admin
      if (usuarioExite.correo === this.usuario.email && usuarioExite.cedula === this.usuario.cedula) {
        alert('Bienvenido Administrador')
        this.route.navigate(["/administrador/dashboardAdmin"])
        this.credencialesNoValidas = false
      }
      this.credencialesNoValidas = true
    } else if (usuarioExite.rolUsuario_rousid != 1) {
      if (usuarioExite.correo === this.usuario.email && usuarioExite.cedula === this.usuario.cedula) {
        this.route.navigate(["/usuario/escogerVuelo"])
        if (usuarioExite.usuaId != null) {
          const userId = usuarioExite.usuaId
          this.authService.login(userId)
        }
        this.credencialesNoValidas = false;
      }
      alert('No existen esas credenciales');
      this.credencialesNoValidas = true;
    }
  }
}
