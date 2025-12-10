import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TitanCardComponent } from './components/titan-card/titan-card.component';
import { TitanService } from './services/titan.service';
import { Titan } from './models/titan';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatTabsModule, 
    MatExpansionModule,
    TitanCardComponent, 
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private titanService = inject(TitanService);
  
  titans = signal<Titan[]>([]);
  loading = signal<boolean>(true);

  constructor() {
    this.loadData();
  }

  loadData() {
    this.titanService.getTitans().subscribe(data => {
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      this.titans.set(sorted);
      this.loading.set(false);
    });
  }
}