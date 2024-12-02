import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { Location } from '@angular/common'; // For going back after saving

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: any;
  book: any = {
    isbn: '',
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    publisher: ''
  };

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.loadBookData();
    }
  }

  loadBookData(): void {
    this.crudService.GetBookById(this.bookId).subscribe(
      (res) => {
        this.book = res;
      },
      (error) => {
        console.error('Error fetching book:', error);
      }
    );
  }

  // Method to handle the form submission and update the book details
  onUpdate(): void {
    this.crudService.UpdateBook(this.bookId, this.book).subscribe(
      (res) => {
        console.log('Book updated successfully:', res);
        this.router.navigate(['/books-list']); // Redirect back to the book list
      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  }
}
