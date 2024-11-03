import { Component, Inject, inject, model, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogContent, MatDialogClose, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatFormField, MatLabel } from '@angular/material/form-field'

interface News {
  id: number | string;
  title: string;
  paragraph: string;
}

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogContent, MatFormField, MatDialogClose, MatDialogActions, MatLabel],
})
export class NewsFormComponent{

  constructor(
    private newsService: NewsService,
    public dialogRef: MatDialogRef<NewsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { news: News }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveNews(): void {
    if (this.data.news.id) {
      this.newsService.updateNews(this.data.news.id, this.data.news).subscribe((data)=>{
        this.dialogRef.close();
      });
    } else {
      this.newsService.addNews({title: this.data.news.title, paragraph: this.data.news.paragraph}).subscribe((data)=>{
        this.dialogRef.close();
      });
    }
  }
}
