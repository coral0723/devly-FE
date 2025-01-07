export interface Content {
  type: string;
  text: string;
  title?: string;
  imageSrc?: string;
  examples?: string[];
}

export interface Topic {
  id: number;
  title: string;
  subtitle: string;
  tags: string[];
  content: Content[];
}