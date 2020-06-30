import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NofilingsComponent } from './nofilings.component';

describe('NofilingsComponent', () => {
  let component: NofilingsComponent;
  let fixture: ComponentFixture<NofilingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NofilingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NofilingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
