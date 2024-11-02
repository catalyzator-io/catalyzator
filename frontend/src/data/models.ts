/**
 * Grants and applications
 */

type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

interface Application {
    id: string;
    formData: any;
    currentStep: number;
    startTime: Date;
    entityId: string; // id of the entity that applied for the grant
    providerId: string; // id of the provider that created the grant
    grantId: string; // id of the grant that the application is for
    status: ApplicationStatus;
}


/**
 * Users and entities
 */

type EntityType = 'Venture' | 'Catalyzor';

interface TeamMember {
    name: string;
    title: string;
    linkedin: string;
    isFounder: boolean;
}

interface User {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    entitiesIds: string[];
}


interface Entity {
    id: string;
    name: string;
    type: EntityType;
    story: string; // story of an entity is a description about the entity
    team: TeamMember[];
    applications: Application[];
}

export type { TeamMember, User, Entity, Application };