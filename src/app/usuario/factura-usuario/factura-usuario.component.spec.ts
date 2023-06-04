import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaUsuarioComponent } from './factura-usuario.component';

describe('FacturaUsuarioComponent', () => {
  let component: FacturaUsuarioComponent;
  let fixture: ComponentFixture<FacturaUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturaUsuarioComponent]
    });
    fixture = TestBed.createComponent(FacturaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
