import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaSalasComponent } from './mapa-salas';

describe('MapaSalas', () => {
  let component: MapaSalasComponent;
  let fixture: ComponentFixture<MapaSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaSalasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaSalasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
