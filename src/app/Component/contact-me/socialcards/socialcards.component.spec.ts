import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialcardsComponent } from './socialcards.component';

describe('SocialcardsComponent', () => {
  let component: SocialcardsComponent;
  let fixture: ComponentFixture<SocialcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialcardsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
