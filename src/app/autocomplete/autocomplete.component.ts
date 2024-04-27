import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { TUser } from '../../types';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent {
  @Input() users: TUser[] = [];
  // @Input() selectedUserIndex: number | null = null;
  @Output() userSelected = new EventEmitter<TUser>();

  selectUser(user: TUser) {
    this.userSelected.emit(user);
  }
}
