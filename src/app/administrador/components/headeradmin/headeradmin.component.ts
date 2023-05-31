import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.css']
})
export class HeaderadminComponent {
  constructor(private router:Router){}

  cerrarSesion(){
    this.router.navigate(["/index"])
  }
}
