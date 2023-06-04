import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaUsuarioComponent } from './reserva-usuario.component';

describe('ReservaUsuarioComponent', () => {
  let component: ReservaUsuarioComponent;
  let fixture: ComponentFixture<ReservaUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaUsuarioComponent]
    });
    fixture = TestBed.createComponent(ReservaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
