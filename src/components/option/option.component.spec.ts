import {TestBed, ComponentFixture} from "@angular/core/testing";
import {OptionComponent} from "./option.component";
import {SelectionStore} from "../../store/selection.store";

describe('OptionComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(OptionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
})