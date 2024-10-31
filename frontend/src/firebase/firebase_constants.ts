export const getGrantFileStoragePath = ({ userId, entityId, applicationId, section, fileName }) => 
    `applications/${userId}/${entityId}/${applicationId}/${section}/${fileName}`;
  