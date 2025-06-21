export interface UrlResponseDto {
  id: string;
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  userId: string;
  clickCount: number;
  createdAt: Date;
  updatedAt: Date;
}
