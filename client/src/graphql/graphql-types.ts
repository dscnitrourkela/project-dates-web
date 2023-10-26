import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

/** Refers to the various developers of the Avenue Application including the backend, frontend and mobile team */
export type DeveloperInfo = {
  __typename?: 'DeveloperInfo';
  github: Scalars['ID'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Input arguments used in createDeveloperInfo mutation */
export type DeveloperInfoCreateInputType = {
  github: Scalars['ID'];
  name: Scalars['String'];
};

/** Input arguments used in updateDeveloperInfo mutation */
export type DeveloperInfoUpdateInputType = {
  github?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Refers to the various events created by the different organisations */
export type Event = {
  __typename?: 'Event';
  contact?: Maybe<Array<Scalars['String']>>;
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  eventRegistration: Array<Maybe<EventRegistration>>;
  eventRegistrationCount: Scalars['Int'];
  id: Scalars['ID'];
  location?: Maybe<Location>;
  locationID: Scalars['ID'];
  name: Scalars['String'];
  notes: Array<Scalars['String']>;
  org: Array<Maybe<Org>>;
  orgID: Array<Scalars['ID']>;
  orgType: OrgType;
  poc: Array<Maybe<User>>;
  pocID: Array<Scalars['ID']>;
  poster: Scalars['String'];
  priority: Scalars['Int'];
  prizeMoney?: Maybe<Scalars['String']>;
  repeatDay?: Maybe<RepeatType>;
  rules?: Maybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  status: StatusType;
  subHeading?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  weekly: Scalars['Boolean'];
};

/** Input arguments used in createEvent mutation */
export type EventCreateInputType = {
  contact: Array<Scalars['String']>;
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  locationID?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  notes: Array<Scalars['String']>;
  orgID: Array<Scalars['ID']>;
  orgType: OrgType;
  pocID: Array<Scalars['ID']>;
  poster: Scalars['String'];
  priority: Scalars['Int'];
  prizeMoney?: InputMaybe<Scalars['String']>;
  repeatDay?: InputMaybe<RepeatType>;
  rules?: InputMaybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  status?: InputMaybe<StatusType>;
  subHeading?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  weekly: Scalars['Boolean'];
};

/** Refers to the registrations of a user for a particular event */
export type EventRegistration = {
  __typename?: 'EventRegistration';
  event?: Maybe<Event>;
  eventID: Scalars['ID'];
  id: Scalars['ID'];
  user?: Maybe<User>;
  userID: Scalars['ID'];
};

/** Input arguments used in createEventRegistration mutation */
export type EventRegistrationCreateInputType = {
  eventID: Scalars['ID'];
  userID: Scalars['ID'];
};

/** Input arguments used in updateEvent mutation */
export type EventUpdateInputType = {
  contact?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  locationID?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Array<Scalars['String']>>;
  orgID?: InputMaybe<Array<Scalars['ID']>>;
  orgType?: InputMaybe<OrgType>;
  pocID?: InputMaybe<Array<Scalars['ID']>>;
  poster?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<Scalars['Int']>;
  prizeMoney?: InputMaybe<Scalars['String']>;
  repeatDay?: InputMaybe<RepeatType>;
  rules?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<StatusType>;
  subHeading?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  weekly?: InputMaybe<Scalars['Boolean']>;
};

export enum GenderType {
  Female = 'FEMALE',
  Male = 'MALE',
  Others = 'OTHERS'
}

/** Refers to the various locations present in NITR */
export type Location = {
  __typename?: 'Location';
  description: Scalars['String'];
  id: Scalars['ID'];
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
};

/** Input arguments used in createLocation mutation */
export type LocationCreateInputType = {
  description: Scalars['String'];
  lat?: InputMaybe<Scalars['Float']>;
  long?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
};

/** Input arguments used in updateLocation mutation */
export type LocationUpdateInputType = {
  description?: InputMaybe<Scalars['String']>;
  lat?: InputMaybe<Scalars['Float']>;
  long?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new developer information record */
  createDeveloperInfo?: Maybe<DeveloperInfo>;
  /** Creates a new event record */
  createEvent?: Maybe<Event>;
  /** Creates an event registration record */
  createEventRegistration?: Maybe<EventRegistration>;
  /** Creates a new location record */
  createLocation?: Maybe<Location>;
  /** Creates a new organisation record */
  createOrg?: Maybe<Org>;
  /** Creates a new story record */
  createStory?: Maybe<Story>;
  /** Creates multiple/single record/s of team members */
  createTeam?: Maybe<Scalars['Int']>;
  /** Creates a new transaction record */
  createTransaction?: Maybe<Transaction>;
  /** Creates a new user record */
  createUser?: Maybe<User>;
  /** Deletes an existing developer information record */
  deleteDeveloperInfo?: Maybe<DeveloperInfo>;
  /** Deletes an existing event registration record */
  deleteEventRegistration?: Maybe<EventRegistration>;
  /** Deletes an existing location record */
  deleteLocation?: Maybe<Location>;
  /** Deletes and existing story record */
  deleteStory?: Maybe<Scalars['Boolean']>;
  /** Updates an existing developer information record */
  updateDeveloperInfo?: Maybe<DeveloperInfo>;
  /** Updates an existing event record */
  updateEvent?: Maybe<Event>;
  /** Updates the existing Location record */
  updateLocation?: Maybe<Location>;
  /** Updates an existing organisation record */
  updateOrg?: Maybe<Org>;
  /** Updates the existing team member record */
  updateTeam?: Maybe<Team>;
  /** Updates an existing user record */
  updateUser?: Maybe<User>;
};


export type MutationCreateDeveloperInfoArgs = {
  developerInfo: DeveloperInfoCreateInputType;
};


export type MutationCreateEventArgs = {
  event: EventCreateInputType;
  orgID: Scalars['ID'];
};


export type MutationCreateEventRegistrationArgs = {
  eventRegistration: EventRegistrationCreateInputType;
};


export type MutationCreateLocationArgs = {
  location: LocationCreateInputType;
};


export type MutationCreateOrgArgs = {
  org: OrgCreateInputType;
};


export type MutationCreateStoryArgs = {
  orgID: Scalars['ID'];
  story: StoryCreateInputType;
};


export type MutationCreateTeamArgs = {
  orgID: Scalars['ID'];
  team: Array<TeamCreateInputType>;
};


export type MutationCreateTransactionArgs = {
  transaction: TransactionCreateInputType;
};


export type MutationCreateUserArgs = {
  user: UserCreateInputType;
};


export type MutationDeleteDeveloperInfoArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteEventRegistrationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteLocationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteStoryArgs = {
  id: Scalars['ID'];
  orgID: Scalars['ID'];
};


export type MutationUpdateDeveloperInfoArgs = {
  developerInfo: DeveloperInfoUpdateInputType;
  id: Scalars['ID'];
};


export type MutationUpdateEventArgs = {
  event: EventUpdateInputType;
  id: Scalars['ID'];
  orgID: Scalars['ID'];
};


export type MutationUpdateLocationArgs = {
  id: Scalars['ID'];
  location: LocationUpdateInputType;
};


export type MutationUpdateOrgArgs = {
  id: Scalars['ID'];
  org: OrgUpdateInputType;
};


export type MutationUpdateTeamArgs = {
  id: Scalars['ID'];
  orgID: Scalars['ID'];
  team: TeamUpdateInputType;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  user: UserUpdateInputType;
};

/** Refers to the various groups creating several different events */
export type Org = {
  __typename?: 'Org';
  coverImg?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  endDate?: Maybe<Scalars['DateTime']>;
  fest?: Maybe<Org>;
  festID?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  location?: Maybe<Location>;
  locationID?: Maybe<Scalars['ID']>;
  logo: Scalars['String'];
  name: Scalars['String'];
  orgSubType: OrgSubType;
  orgType: OrgType;
  registrationFee: Scalars['Int'];
  startDate?: Maybe<Scalars['DateTime']>;
  status: StatusType;
  tagline?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
};

/** Input arguments used in the createOrg mutation */
export type OrgCreateInputType = {
  coverImg?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  festID?: InputMaybe<Scalars['ID']>;
  locationID?: InputMaybe<Scalars['ID']>;
  logo: Scalars['String'];
  name: Scalars['String'];
  orgSubType: OrgSubType;
  orgType: OrgType;
  registrationFee?: Scalars['Int'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  status: StatusType;
  tagline?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<Scalars['String']>;
};

export enum OrgSubType {
  Cultural = 'CULTURAL',
  Fms = 'FMS',
  Hackathon = 'HACKATHON',
  Literary = 'LITERARY',
  Sports = 'SPORTS',
  Technical = 'TECHNICAL'
}

export enum OrgType {
  Branch = 'BRANCH',
  BranchSem = 'BRANCH_SEM',
  Club = 'CLUB',
  Fest = 'FEST',
  Hostel = 'HOSTEL',
  Institute = 'INSTITUTE',
  Mess = 'MESS'
}

/** Input arguments used in the updateOrg mutation */
export type OrgUpdateInputType = {
  coverImg?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  locationID?: InputMaybe<Scalars['ID']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orgSubType?: InputMaybe<OrgSubType>;
  orgType?: InputMaybe<OrgType>;
  registrationFee?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<StatusType>;
  tagline?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<Scalars['String']>;
};

/** Paginated response for transaction query */
export type PaginatedTransactionType = {
  __typename?: 'PaginatedTransactionType';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<Transaction>>>;
};

/** Paginated response for user query */
export type PaginatedUserType = {
  __typename?: 'PaginatedUserType';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<User>>>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns a list of all the developers of the application */
  developerInfo?: Maybe<Array<Maybe<DeveloperInfo>>>;
  /** Returns as list of events depending upon the arguments */
  event?: Maybe<Array<Maybe<Event>>>;
  /** Returns a list of events depending upon the arguments */
  eventRegistration?: Maybe<Array<Maybe<EventRegistration>>>;
  /** Returns a list of all the locations depending upon the arguments */
  location?: Maybe<Array<Maybe<Location>>>;
  /** Returns a list of all the organisations depending upon the arguments */
  org?: Maybe<Array<Maybe<Org>>>;
  /** Returns a list of all the stories depending upon the parameters */
  story?: Maybe<Array<Maybe<Story>>>;
  /** Returns a list of all the team members of the given organsation */
  team?: Maybe<Array<Maybe<Team>>>;
  /** Returns a list of transactions depending upon the arguments passed */
  transaction?: Maybe<PaginatedTransactionType>;
  /** Returns a list of users depending upon the parameters passed */
  user?: Maybe<PaginatedUserType>;
};


export type QueryDeveloperInfoArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryEventArgs = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ID']>;
  orgID?: InputMaybe<Scalars['ID']>;
  orgType?: InputMaybe<OrgType>;
  pagination?: InputMaybe<PaginationInputType>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<StatusType>;
};


export type QueryEventRegistrationArgs = {
  eventID?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  orgID?: InputMaybe<Scalars['ID']>;
  pagination?: InputMaybe<PaginationInputType>;
  userID?: InputMaybe<Scalars['ID']>;
};


export type QueryLocationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryOrgArgs = {
  id?: InputMaybe<Scalars['ID']>;
  orgSubType?: InputMaybe<OrgSubType>;
  orgType?: InputMaybe<OrgType>;
  pagination?: InputMaybe<PaginationInputType>;
  status?: InputMaybe<StatusType>;
};


export type QueryStoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  orgID?: InputMaybe<Scalars['ID']>;
  pagination?: InputMaybe<PaginationInputType>;
};


export type QueryTeamArgs = {
  orgID: Scalars['ID'];
};


export type QueryTransactionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  orgID?: InputMaybe<Scalars['ID']>;
  pagination?: InputMaybe<PaginationInputType>;
  type?: InputMaybe<TransactionType>;
  userID?: InputMaybe<Scalars['ID']>;
};


export type QueryUserArgs = {
  city?: InputMaybe<Scalars['String']>;
  college?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  festID?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  isNitrStudent?: InputMaybe<Scalars['Boolean']>;
  orgID?: InputMaybe<Scalars['ID']>;
  pagination?: InputMaybe<PaginationInputType>;
  referredBy?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  stream?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['ID']>;
};

export enum RepeatType {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export enum StatusType {
  Active = 'ACTIVE',
  Draft = 'DRAFT',
  Expired = 'EXPIRED'
}

/** Refers to the various stories put by various */
export type Story = {
  __typename?: 'Story';
  id: Scalars['ID'];
  image: Scalars['String'];
  linkTo?: Maybe<Scalars['String']>;
  org: Org;
  orgID: Scalars['ID'];
};

/** Input arguments used in the createStory mutation */
export type StoryCreateInputType = {
  image: Scalars['String'];
  linkTo?: InputMaybe<Scalars['String']>;
  orgID: Scalars['ID'];
};

/** Refers to the team member part of a particular organisation */
export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  org: Org;
  orgID: Scalars['ID'];
  position?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  team?: Maybe<Scalars['String']>;
  user: User;
  userID: Scalars['ID'];
};

/** Input arguments used in the createTeam mutation */
export type TeamCreateInputType = {
  id: Scalars['ID'];
  orgID: Scalars['ID'];
  position?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<Scalars['Int']>;
  team?: InputMaybe<Scalars['String']>;
  userID: Scalars['ID'];
};

/** Input arguments used in the udpateTeam mutation */
export type TeamUpdateInputType = {
  orgID?: InputMaybe<Scalars['ID']>;
  position?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<Scalars['Int']>;
  team?: InputMaybe<Scalars['String']>;
  userID?: InputMaybe<Scalars['ID']>;
};

/** Refers to the transaction details of any sort of payment */
export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Int'];
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  org?: Maybe<Org>;
  orgID: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  transactionID: Scalars['ID'];
  type: TransactionType;
  user?: Maybe<User>;
  userID: Scalars['ID'];
};

/** Input arguments used in createTransaction mutation */
export type TransactionCreateInputType = {
  amount: Scalars['Int'];
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  orgID: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  transactionID: Scalars['ID'];
  type: TransactionType;
  userID: Scalars['ID'];
};

export enum TransactionType {
  Event = 'EVENT',
  Merch = 'MERCH',
  Registration = 'REGISTRATION'
}

/** User of the application */
export type User = {
  __typename?: 'User';
  ca: Array<Scalars['ID']>;
  city?: Maybe<Scalars['String']>;
  college?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  festID: Array<Scalars['ID']>;
  fests: Array<Org>;
  gender?: Maybe<GenderType>;
  id: Scalars['String'];
  mobile?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  referredBy?: Maybe<Scalars['String']>;
  rollNumber?: Maybe<Scalars['String']>;
  selfID?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  stream?: Maybe<Scalars['String']>;
  uid: Scalars['String'];
};

/** Input arguments used in createUser mutation */
export type UserCreateInputType = {
  city?: InputMaybe<Scalars['String']>;
  college?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  gender?: InputMaybe<GenderType>;
  mobile: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  referredBy?: InputMaybe<Scalars['String']>;
  rollNumber?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  stream?: InputMaybe<Scalars['String']>;
  uid: Scalars['String'];
};

/** Input arguments used in updateUser mutation */
export type UserUpdateInputType = {
  ca?: InputMaybe<Scalars['ID']>;
  city?: InputMaybe<Scalars['String']>;
  college?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['DateTime']>;
  festID?: InputMaybe<Scalars['ID']>;
  gender?: InputMaybe<GenderType>;
  mobile?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  referredBy?: InputMaybe<Scalars['String']>;
  rollNumber?: InputMaybe<Scalars['String']>;
  selfID?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  stream?: InputMaybe<Scalars['String']>;
};

/** Input arguments used for pagination details */
export type PaginationInputType = {
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};

export type CreateEventMutationVariables = Exact<{
  orgId: Scalars['ID'];
  event: EventCreateInputType;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'Event', name: string, description: string } | null };

export type UpdateEventMutationVariables = Exact<{
  updateEventId: Scalars['ID'];
  orgId: Scalars['ID'];
  event: EventUpdateInputType;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'Event', name: string, description: string } | null };

export type CreateOrgMutationVariables = Exact<{
  org: OrgCreateInputType;
}>;


export type CreateOrgMutation = { __typename?: 'Mutation', createOrg?: { __typename?: 'Org', name: string, description: string } | null };

export type UpdateUserMutationVariables = Exact<{
  updateUserId: Scalars['ID'];
  user: UserUpdateInputType;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', ca: Array<string> } | null };

export type EventQueryVariables = Exact<{
  eventId?: InputMaybe<Scalars['ID']>;
  orgId?: InputMaybe<Scalars['ID']>;
  orgType?: InputMaybe<OrgType>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<StatusType>;
}>;


export type EventQuery = { __typename?: 'Query', event?: Array<{ __typename?: 'Event', id: string, name: string, subHeading?: string | null, description: string, prizeMoney?: string | null, rules?: string | null, contact?: Array<string> | null, poster: string, startDate: any, endDate: any, notes: Array<string>, orgType: OrgType, weekly: boolean, repeatDay?: RepeatType | null, priority: number, type?: string | null, status: StatusType, locationID: string, orgID: Array<string>, eventRegistrationCount: number } | null> | null };

export type EventRegistrationQueryVariables = Exact<{
  eventId?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['ID']>;
  eventRegistrationId?: InputMaybe<Scalars['ID']>;
  orgId?: InputMaybe<Scalars['ID']>;
}>;


export type EventRegistrationQuery = { __typename?: 'Query', eventRegistration?: Array<{ __typename?: 'EventRegistration', user?: { __typename?: 'User', email: string, id: string, uid: string, name?: string | null, photo?: string | null, gender?: GenderType | null, dob?: any | null, state?: string | null, city?: string | null, college?: string | null, stream?: string | null, mobile?: string | null, selfID?: string | null, rollNumber?: string | null, ca: Array<string>, referredBy?: string | null } | null } | null> | null };

export type OrgQueryVariables = Exact<{
  orgID?: InputMaybe<Scalars['ID']>;
  orgType?: InputMaybe<OrgType>;
  orgSubType?: InputMaybe<OrgSubType>;
}>;


export type OrgQuery = { __typename?: 'Query', org?: Array<{ __typename?: 'Org', id: string, name: string, description: string, logo: string, tagline?: string | null, coverImg?: string | null, theme?: string | null, registrationFee: number, startDate?: any | null, endDate?: any | null, status: StatusType, orgSubType: OrgSubType, orgType: OrgType, festID?: string | null } | null> | null };

export type TransactionQueryVariables = Exact<{
  orgID?: InputMaybe<Scalars['ID']>;
  userID?: InputMaybe<Scalars['ID']>;
  pagination?: InputMaybe<PaginationInputType>;
  type?: InputMaybe<TransactionType>;
  transactionId?: InputMaybe<Scalars['ID']>;
}>;


export type TransactionQuery = { __typename?: 'Query', transaction?: { __typename?: 'PaginatedTransactionType', count?: number | null, data?: Array<{ __typename?: 'Transaction', amount: number, transactionID: string, type: TransactionType, timestamp: any, user?: { __typename?: 'User', name?: string | null, email: string, mobile?: string | null } | null } | null> | null } | null };

export type UserQueryVariables = Exact<{
  festID?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  uid?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  college?: InputMaybe<Scalars['String']>;
  stream?: InputMaybe<Scalars['String']>;
  referredBy?: InputMaybe<Scalars['String']>;
  isNitrStudent?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<PaginationInputType>;
  orgID?: InputMaybe<Scalars['ID']>;
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'PaginatedUserType', count?: number | null, data?: Array<{ __typename?: 'User', email: string, id: string, uid: string, name?: string | null, photo?: string | null, gender?: GenderType | null, dob?: any | null, state?: string | null, city?: string | null, college?: string | null, stream?: string | null, mobile?: string | null, selfID?: string | null, rollNumber?: string | null, festID: Array<string>, createdAt?: any | null, ca: Array<string>, referredBy?: string | null, fests: Array<{ __typename?: 'Org', name: string, description: string }> } | null> | null } | null };


export const CreateEventDocument = gql`
    mutation CreateEvent($orgId: ID!, $event: EventCreateInputType!) {
  createEvent(orgID: $orgId, event: $event) {
    name
    description
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      event: // value for 'event'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($updateEventId: ID!, $orgId: ID!, $event: EventUpdateInputType!) {
  updateEvent(id: $updateEventId, orgID: $orgId, event: $event) {
    name
    description
  }
}
    `;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      updateEventId: // value for 'updateEventId'
 *      orgId: // value for 'orgId'
 *      event: // value for 'event'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const CreateOrgDocument = gql`
    mutation CreateOrg($org: OrgCreateInputType!) {
  createOrg(org: $org) {
    name
    description
  }
}
    `;
export type CreateOrgMutationFn = Apollo.MutationFunction<CreateOrgMutation, CreateOrgMutationVariables>;

/**
 * __useCreateOrgMutation__
 *
 * To run a mutation, you first call `useCreateOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrgMutation, { data, loading, error }] = useCreateOrgMutation({
 *   variables: {
 *      org: // value for 'org'
 *   },
 * });
 */
export function useCreateOrgMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrgMutation, CreateOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrgMutation, CreateOrgMutationVariables>(CreateOrgDocument, options);
      }
export type CreateOrgMutationHookResult = ReturnType<typeof useCreateOrgMutation>;
export type CreateOrgMutationResult = Apollo.MutationResult<CreateOrgMutation>;
export type CreateOrgMutationOptions = Apollo.BaseMutationOptions<CreateOrgMutation, CreateOrgMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserId: ID!, $user: UserUpdateInputType!) {
  updateUser(id: $updateUserId, user: $user) {
    ca
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserId: // value for 'updateUserId'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const EventDocument = gql`
    query Event($eventId: ID, $orgId: ID, $orgType: OrgType, $startDate: DateTime, $endDate: DateTime, $status: StatusType) {
  event(
    id: $eventId
    orgID: $orgId
    orgType: $orgType
    startDate: $startDate
    endDate: $endDate
    status: $status
  ) {
    id
    name
    subHeading
    description
    prizeMoney
    rules
    contact
    poster
    startDate
    endDate
    notes
    orgType
    weekly
    repeatDay
    priority
    type
    status
    locationID
    orgID
    eventRegistrationCount
  }
}
    `;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      orgId: // value for 'orgId'
 *      orgType: // value for 'orgType'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useEventQuery(baseOptions?: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const EventRegistrationDocument = gql`
    query EventRegistration($eventId: ID, $userId: ID, $eventRegistrationId: ID, $orgId: ID) {
  eventRegistration(
    eventID: $eventId
    userID: $userId
    id: $eventRegistrationId
    orgID: $orgId
  ) {
    user {
      email
      id
      uid
      name
      photo
      gender
      dob
      state
      city
      college
      stream
      mobile
      selfID
      rollNumber
      ca
      referredBy
    }
  }
}
    `;

/**
 * __useEventRegistrationQuery__
 *
 * To run a query within a React component, call `useEventRegistrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventRegistrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventRegistrationQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      userId: // value for 'userId'
 *      eventRegistrationId: // value for 'eventRegistrationId'
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useEventRegistrationQuery(baseOptions?: Apollo.QueryHookOptions<EventRegistrationQuery, EventRegistrationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventRegistrationQuery, EventRegistrationQueryVariables>(EventRegistrationDocument, options);
      }
export function useEventRegistrationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventRegistrationQuery, EventRegistrationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventRegistrationQuery, EventRegistrationQueryVariables>(EventRegistrationDocument, options);
        }
export type EventRegistrationQueryHookResult = ReturnType<typeof useEventRegistrationQuery>;
export type EventRegistrationLazyQueryHookResult = ReturnType<typeof useEventRegistrationLazyQuery>;
export type EventRegistrationQueryResult = Apollo.QueryResult<EventRegistrationQuery, EventRegistrationQueryVariables>;
export const OrgDocument = gql`
    query Org($orgID: ID, $orgType: OrgType, $orgSubType: OrgSubType) {
  org(id: $orgID, orgType: $orgType, orgSubType: $orgSubType) {
    id
    name
    description
    logo
    tagline
    coverImg
    theme
    registrationFee
    startDate
    endDate
    status
    orgSubType
    orgType
    festID
  }
}
    `;

/**
 * __useOrgQuery__
 *
 * To run a query within a React component, call `useOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrgQuery({
 *   variables: {
 *      orgID: // value for 'orgID'
 *      orgType: // value for 'orgType'
 *      orgSubType: // value for 'orgSubType'
 *   },
 * });
 */
export function useOrgQuery(baseOptions?: Apollo.QueryHookOptions<OrgQuery, OrgQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrgQuery, OrgQueryVariables>(OrgDocument, options);
      }
export function useOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrgQuery, OrgQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrgQuery, OrgQueryVariables>(OrgDocument, options);
        }
export type OrgQueryHookResult = ReturnType<typeof useOrgQuery>;
export type OrgLazyQueryHookResult = ReturnType<typeof useOrgLazyQuery>;
export type OrgQueryResult = Apollo.QueryResult<OrgQuery, OrgQueryVariables>;
export const TransactionDocument = gql`
    query Transaction($orgID: ID, $userID: ID, $pagination: paginationInputType, $type: TransactionType, $transactionId: ID) {
  transaction(
    orgID: $orgID
    userID: $userID
    pagination: $pagination
    type: $type
    id: $transactionId
  ) {
    data {
      amount
      transactionID
      type
      timestamp
      user {
        name
        email
        mobile
      }
    }
    count
  }
}
    `;

/**
 * __useTransactionQuery__
 *
 * To run a query within a React component, call `useTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionQuery({
 *   variables: {
 *      orgID: // value for 'orgID'
 *      userID: // value for 'userID'
 *      pagination: // value for 'pagination'
 *      type: // value for 'type'
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useTransactionQuery(baseOptions?: Apollo.QueryHookOptions<TransactionQuery, TransactionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionQuery, TransactionQueryVariables>(TransactionDocument, options);
      }
export function useTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionQuery, TransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionQuery, TransactionQueryVariables>(TransactionDocument, options);
        }
export type TransactionQueryHookResult = ReturnType<typeof useTransactionQuery>;
export type TransactionLazyQueryHookResult = ReturnType<typeof useTransactionLazyQuery>;
export type TransactionQueryResult = Apollo.QueryResult<TransactionQuery, TransactionQueryVariables>;
export const UserDocument = gql`
    query User($festID: [String!], $id: ID, $uid: ID, $email: String, $city: String, $state: String, $college: String, $stream: String, $referredBy: String, $isNitrStudent: Boolean, $pagination: paginationInputType, $orgID: ID) {
  user(
    festID: $festID
    id: $id
    uid: $uid
    email: $email
    city: $city
    state: $state
    college: $college
    stream: $stream
    referredBy: $referredBy
    isNitrStudent: $isNitrStudent
    pagination: $pagination
    orgID: $orgID
  ) {
    data {
      email
      id
      uid
      name
      photo
      gender
      dob
      state
      city
      college
      stream
      mobile
      selfID
      rollNumber
      festID
      createdAt
      fests {
        name
        description
      }
      ca
      referredBy
    }
    count
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      festID: // value for 'festID'
 *      id: // value for 'id'
 *      uid: // value for 'uid'
 *      email: // value for 'email'
 *      city: // value for 'city'
 *      state: // value for 'state'
 *      college: // value for 'college'
 *      stream: // value for 'stream'
 *      referredBy: // value for 'referredBy'
 *      isNitrStudent: // value for 'isNitrStudent'
 *      pagination: // value for 'pagination'
 *      orgID: // value for 'orgID'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;