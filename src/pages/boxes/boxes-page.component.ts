import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { BoxItemComponent } from '../../components/box-item/box-item.component';
import { OptionComponent } from '../../components/option/option.component';
import { SelectionStore } from '../../store/selection.store';

@Component({
  selector: 'app-boxes-page-component',
  standalone: true,
  imports: [BoxItemComponent, OptionComponent],
  templateUrl: './boxes-page.component.html',
  styleUrl: './boxes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxesPageComponent {
  protected readonly store = inject(SelectionStore);
}
