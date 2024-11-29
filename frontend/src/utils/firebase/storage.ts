import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  uploadString,
  deleteObject,
  StorageReference
} from 'firebase/storage';
import { storage } from './firebase';

export interface UploadOptions {
  contentType?: string;
  customMetadata?: Record<string, string>;
}

class StorageUtils {
  /**
   * Upload a file to Firebase Storage
   */
  async uploadFile(file: File, path: string, options?: UploadOptions): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const metadata = {
        contentType: options?.contentType || file.type,
        customMetadata: options?.customMetadata
      };
      
      await uploadBytes(storageRef, file, { customMetadata: metadata.customMetadata });
      return getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  /**
   * Upload a Blob (e.g., audio recording) to Firebase Storage
   */
  async uploadBlob(blob: Blob, path: string, options?: UploadOptions): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const metadata = {
        contentType: options?.contentType || blob.type,
        customMetadata: options?.customMetadata
      };
      
      await uploadBytes(storageRef, blob, { customMetadata: metadata.customMetadata });
      return getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading blob:', error);
      throw error;
    }
  }

  /**
   * Upload base64 data to Firebase Storage
   */
  async uploadBase64(
    base64Data: string, 
    path: string, 
    options?: UploadOptions
  ): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const metadata = {
        contentType: options?.contentType,
        customMetadata: options?.customMetadata
      };
      
      await uploadString(storageRef, base64Data, 'base64', { customMetadata: metadata.customMetadata });
      return getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading base64 data:', error);
      throw error;
    }
  }

  /**
   * Delete a file from Firebase Storage
   */
  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  /**
   * Get download URL for a file
   */
  async getFileUrl(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      return getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  }

  /**
   * Get storage reference for a path
   */
  getStorageRef(path: string): StorageReference {
    return ref(storage, path);
  }
}

export const storageUtils = new StorageUtils(); 