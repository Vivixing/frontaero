import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css']
})
export class CrearVueloComponent implements OnInit {

  constructor(private vueloService:VueloService,
              private fb:FormBuilder){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  vueloFormulario: FormGroup = this.fb.group({
    
  })
}
