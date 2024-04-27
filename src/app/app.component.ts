import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import type { TComment, TUser } from '../types';
import { comments, users } from '../data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AutocompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'limble-project';
  comments: TComment[] = comments;
  newCommentText: string = '';
  // selectedUserIndex: number | null = null; // used for keyboard navigation
  showAutocomplete: boolean = false;
  filteredUsers: TUser[] = [];

  @ViewChild('commentInput') commentInput!: ElementRef;

  // Function to extract and alert the user name based on the @ mention
  alertUserName(commentText: string): void {
    const mentionRegex = /@(\w+)\b/g;

    let match;

    while ((match = mentionRegex.exec(commentText)) !== null) {
      const userName = match[1];
      const user = users.find(
        (u) => u.name.toLowerCase() === userName.toLowerCase()
      );

      if (user) {
        alert(`You mentioned ${user.name}`);
      }
    }
  }

  filterUsers(searchText: string): TUser[] {
    if (!searchText) return [];
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  checkForUserMention() {
    // Get the current text value
    const textValue = this.newCommentText;

    // Check if the last entered character is '@'
    const lastAtPos = textValue.lastIndexOf('@');

    // Trigger the user list if "@" is the last character typed.
    if (lastAtPos > -1) {
      const searchText = textValue.substring(lastAtPos + 1);
      // const prevFilteredUsersLength = this.filteredUsers.length;

      // Filter the users based on the search text
      this.filteredUsers = searchText ? this.filterUsers(searchText) : [];

      // Initialize selectedUserIndex only when the filtered list is first shown
      // if (this.filteredUsers.length !== prevFilteredUsersLength) {
      //   this.selectedUserIndex = 0;
      // }

      // Show the autocomplete list
      this.showAutocomplete = this.filteredUsers.length > 0;
    } else {
      // Hide the autocomplete list if "@" is not the last character typed
      this.showAutocomplete = false;

      // Clear the filtered users list
      this.filteredUsers = [];

      // Reset the index when autocomplete is not shown
      // this.selectedUserIndex = null;
    }
  }

  onUserSelected(user: TUser) {
    // Replace the last @mention with the selected user's name
    const lastAtPos = this.newCommentText.lastIndexOf('@');

    this.newCommentText =
      this.newCommentText.substring(0, lastAtPos) + `@${user.name} `;

    // Hide the autocomplete list
    this.showAutocomplete = false;

    // Put the focus back on the input field
    this.commentInput.nativeElement.focus();

    // Reset the selected user index
    // this.selectedUserIndex = null;
  }

  getUserById(userId: number) {
    return users.find((user) => user.id === userId);
  }

  addComment() {
    // Do nothing if the input is empty
    if (!this.newCommentText || this.newCommentText.trim() === '') {
      return;
    }

    // Create an object for the new comment
    const newComment: TComment = {
      id: crypto.randomUUID(),
      sender: {
        id: 5,
      },
      message: this.newCommentText,
      createdAt: new Date().toISOString(),
    };

    // Add the new comment to the list of comments
    this.comments.push(newComment);

    this.alertUserName(this.newCommentText);

    // Clear the input after adding
    this.newCommentText = '';
    this.filteredUsers = [];

    this.checkForUserMention();
  }
}
