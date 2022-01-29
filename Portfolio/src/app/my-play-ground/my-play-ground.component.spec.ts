import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlayGroundComponent } from './my-play-ground.component';

describe('MyPlayGroundComponent', () => {
  let component: MyPlayGroundComponent;
  let fixture: ComponentFixture<MyPlayGroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPlayGroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlayGroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
