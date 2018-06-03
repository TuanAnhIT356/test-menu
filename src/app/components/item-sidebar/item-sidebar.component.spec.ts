import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSidebarComponent } from './item-sidebar.component';

describe('ItemSidebarComponent', () => {
  let component: ItemSidebarComponent;
  let fixture: ComponentFixture<ItemSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
