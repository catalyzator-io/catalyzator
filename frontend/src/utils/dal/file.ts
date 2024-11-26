import { FileValue } from '../../types/common';
import { BaseDAL } from './base';

interface FileData {
  file: FileValue;
  uploadedAt: Date;
}

export class FileDAL extends BaseDAL<FileData> {
  private static instance: FileDAL;

  private constructor() {
    super();
  }

  static getInstance(): FileDAL {
    if (!FileDAL.instance) {
      FileDAL.instance = new FileDAL();
    }
    return FileDAL.instance;
  }

  async uploadFile(file: File): Promise<FileValue> {
    // Simulate file upload
    const fileRef: FileValue = {
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      uploaded_at: new Date()
    };

    await this.set(fileRef.url, {
      file: fileRef,
      uploadedAt: new Date()
    });

    return fileRef;
  }

  async getFile(url: string): Promise<FileValue | null> {
    const fileData = await this.get(url);
    return fileData?.file || null;
  }

  async deleteFile(url: string): Promise<void> {
    await this.delete(url);
    URL.revokeObjectURL(url);
  }
}

export const fileDAL = FileDAL.getInstance(); 