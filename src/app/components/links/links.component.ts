import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-links',
  standalone: true,
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'] // Correction ici
})
export class LinksComponent implements OnInit {
  links: any[] = []; // Ajout du type pour éviter des erreurs TypeScript

  constructor(private linkService: LinkService) { }

  ngOnInit(): void {
    this.linkService.getLinks().then((links) => {
      this.links = links.filter((link) => link.isVisible);
    });
  }
}
