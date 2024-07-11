import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialClinicoFilterComponent } from './historial-clinico-filter.component';

describe('HistorialClinicoFilterComponent', () => {
  let component: HistorialClinicoFilterComponent;
  let fixture: ComponentFixture<HistorialClinicoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialClinicoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialClinicoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
