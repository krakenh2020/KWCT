import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ConnectionComponent } from './connection.component';

describe('ConnectionComponent', () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConnectionComponent]
    });
    fixture = TestBed.createComponent(ConnectionComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
