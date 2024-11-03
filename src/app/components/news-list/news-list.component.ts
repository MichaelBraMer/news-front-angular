import { Component, inject, model, OnInit, signal, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NewsFormComponent } from '../news-form/news-form.component';
import { MatDialog } from '@angular/material/dialog';

interface News {
  id: number | string;
  title: string;
  paragraph: string;
}

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})
export class NewsListComponent implements OnInit {
  news = new MatTableDataSource<News>([]);
  isLoading: Boolean = true;
  displayedColumns: string[] = ['title', 'paragraph', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private newsService: NewsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadNews()
  }

  loadNews(): void {
    this.newsService.getNews().subscribe((data) => {
      this.news = new MatTableDataSource<News>(data);
      this.isLoading = false;
    })
  }

  deleteNews(item: News): void {
    this.newsService.deleteNews(item.id).subscribe((data) => {
      this.loadNews()
    })
  }

  addNew(): void {
    const dialogRef = this.dialog.open(NewsFormComponent, {
      width: '400px',
      data: { news: {id: null, title: '', paragraph: ''}}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadNews()
    });
  }

  editNews(item: News): void {
    const dialogRef = this.dialog.open(NewsFormComponent, {
      width: '400px',
      data: { news: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadNews()
    });
  }
}
