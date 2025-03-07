import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBox } from '../../types';
import { SelectionStore } from '../../store/selection.store';
import { defaultBox } from '../../constants';

@Component({
  selector: 'app-box-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box-item.component.html',
  styleUrl: './box-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxItemComponent {
  @Input({ required: true }) box: IBox = defaultBox;
  @Input({ required: true }) index: number = 0;
  protected readonly store = inject(SelectionStore);
}
