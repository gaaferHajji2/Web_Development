import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

	book = {};
	
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
  }
  
  getBookDetails(id) {
  this.api.getBook(id)
    .subscribe(data => {
      console.log('data in book-detail.component.ts is: ' + data);
      this.book = data;
    });
	}


}
