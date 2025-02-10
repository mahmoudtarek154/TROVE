import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatrComponent } from './catr.component';

describe('CatrComponent', () => {
  let component: CatrComponent;
  let fixture: ComponentFixture<CatrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
