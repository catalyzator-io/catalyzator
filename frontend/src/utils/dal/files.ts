import { FileValue, FileReference } from '../../types/common';

export class FilesDAL {
  static async uploadFile(file: File): Promise<FileReference> {
    // Mock implementation
    const mockFileRef: FileReference = {
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      size: file.size,
      uploaded_at: new Date()
    };
    return mockFileRef;
  }

  static async deleteFile(fileRef: FileReference): Promise<void> {
    // Mock implementation
    URL.revokeObjectURL(fileRef.url);
  }
} 