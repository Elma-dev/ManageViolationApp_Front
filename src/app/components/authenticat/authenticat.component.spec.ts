import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatComponent } from './authenticat.component';

describe('AuthenticatComponent', () => {
  let component: AuthenticatComponent;
  let fixture: ComponentFixture<AuthenticatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
