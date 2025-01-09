import {TestBed, ComponentFixture} from "@angular/core/testing";
import {BoxItemComponent} from "./box-item.component";
import {SelectionStore} from "../../store/selection.store";

describe('OptionComponent', () => {
  let component: BoxItemComponent;
  let fixture: ComponentFixture<BoxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxItemComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BoxItemComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
})