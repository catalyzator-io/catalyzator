export const getGrantFileStoragePath = ({ userId, entityId, applicationId, section, fileName }: { userId: string, entityId: string, applicationId: string, section: string, fileName: string }) => 
    `applications/${userId}/${entityId}/${applicationId}/${section}/${fileName}`;
  