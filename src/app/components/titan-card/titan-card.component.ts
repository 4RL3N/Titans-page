import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Titan } from '../../models/titan';

@Component({
  selector: 'app-titan-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatProgressBarModule, 
    MatChipsModule, 
    MatIconModule
  ],
  templateUrl: './titan-card.component.html',
  styleUrls: ['./titan-card.component.scss']
})
export class TitanCardComponent {
  @Input() titan!: Titan;
}

