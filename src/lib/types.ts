export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  tags: string[];
  aiHint?: string;
}

export interface SiteContent {
  about: {
    paragraph1: string;
    paragraph2: string;
  }
}
