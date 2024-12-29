export interface BlogDetails{
  id: string; // uuid
  title: string;
  content: string;
  userId?: string; // uuid, linking to the User
  createdAt?: string; // optional, for timestamps from GORM's gorm.Model
  updatedAt?: string;
  deletedAt?: string | null;
}

