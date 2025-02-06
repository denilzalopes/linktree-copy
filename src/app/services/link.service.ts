import { Injectable } from '@angular/core';
import { defineOneEntry } from 'oneentry';
import { Link } from '../types/link.type';

const ONEENTRY_URL = 'https://denilza-linktree.oneentry.cloud';
const ONEENTRY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5ndWxhci1mcm9udGVuZCIsInNlcmlhbE51bWJlciI6MSwiaWF0IjoxNzM4ODQ3NTAyLCJleHAiOjE3NzAzODM0NDd9.MN9KpLfrs7ekSAYaQLv-88o3Tld6q5cOHlKFQ4WwgYo';

let { Pages } = defineOneEntry(
  ONEENTRY_URL, {
    token: ONEENTRY_TOKEN,
    langCode: 'en_us',
  });

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }

  async getLinks(): Promise<Link[]> {
    try {
      let pages = await Pages.getPages();
      return pages.map((page: any) => {
        const pageExistsOutside = page.attributeValues?.['page-exists-outside']?.value || false;

        let extractedUrl = page.pageUrl;
        if (pageExistsOutside) {
        const urlFormatted = page.localizeInfos?.['htmlContent']?.replace(/^<p>|<\/p>$/g, '') || '';
          extractedUrl = urlFormatted.match(/https?:\/\/[^\s"<>]+/)[0];
        }



        return {
          title: page.localizeInfos?.['title'] || '',
          isVisible: page.isVisible || true,
          url: extractedUrl,
          isExternal: pageExistsOutside
          //url: pageExistsOutside ? extractedUrl : page.pageUrl
        }

      })
    } catch (error) {
      console.error("Erreur en cherchant liens");
      return []
    }
  }
}
