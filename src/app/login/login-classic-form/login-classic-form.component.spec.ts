import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginClassicFormComponent } from './login-classic-form.component';

describe('LoginClassicFormComponent', () => {
  let component: LoginClassicFormComponent;
  let fixture: ComponentFixture<LoginClassicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginClassicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginClassicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
