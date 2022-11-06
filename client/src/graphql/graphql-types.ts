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
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
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
  repeatDay?: Maybe<RepeatType>;
  startDate: Scalars['DateTime'];
  status: StatusType;
  type?: Maybe<Scalars['String']>;
  weekly: Scalars['Boolean'];
};

/** Input arguments used in createEvent mutation */
export type EventCreateInputType = {
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
  repeatDay?: InputMaybe<RepeatType>;
  startDate: Scalars['DateTime'];
  status?: InputMaybe<StatusType>;
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
  repeatDay?: InputMaybe<RepeatType>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<StatusType>;
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
  /** Updates an existing record of transation */
  updateTransaction?: Maybe<Transaction>;
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


export type MutationUpdateTransactionArgs = {
  id: Scalars['ID'];
  transaction: TransactionUpdateInputType;
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
  transaction?: Maybe<Array<Maybe<Transaction>>>;
  /** Returns a list of users depending upon the parameters passed */
  user?: Maybe<Array<Maybe<User>>>;
};


export type QueryDeveloperInfoArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryEventArgs = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ID']>;
  orgID?: InputMaybe<Scalars['ID']>;
  orgType?: InputMaybe<OrgType>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<StatusType>;
};


export type QueryEventRegistrationArgs = {
  eventID?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  orgID?: InputMaybe<Scalars['ID']>;
  userID?: InputMaybe<Scalars['ID']>;
};


export type QueryLocationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryOrgArgs = {
  id?: InputMaybe<Scalars['ID']>;
  orgSubType?: InputMaybe<OrgSubType>;
  orgType?: InputMaybe<OrgType>;
};


export type QueryStoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  orgID?: InputMaybe<Scalars['ID']>;
};


export type QueryTeamArgs = {
  orgID: Scalars['ID'];
};


export type QueryTransactionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  orgID?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<TransactionType>;
};


export type QueryUserArgs = {
  city?: InputMaybe<Scalars['String']>;
  college?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  festID?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  isNitrStudent?: InputMaybe<Scalars['Boolean']>;
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
  org: Org;
  orgID: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  transactionID: Scalars['ID'];
  type: TransactionType;
  user: User;
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

/** Input arguments used in updateTransaction mutation */
export type TransactionUpdateInputType = {
  comment?: InputMaybe<Scalars['String']>;
  orgID?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<TransactionType>;
  userID?: InputMaybe<Scalars['ID']>;
};

/** User of the application */
export type User = {
  __typename?: 'User';
  ca: Array<Scalars['ID']>;
  city?: Maybe<Scalars['String']>;
  college?: Maybe<Scalars['String']>;
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
  mobile?: InputMaybe<Scalars['String']>;
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
}>;


export type UserQuery = { __typename?: 'Query', user?: Array<{ __typename?: 'User', email: string, id: string, uid: string, name?: string | null, photo?: string | null, gender?: GenderType | null, dob?: any | null, state?: string | null, city?: string | null, college?: string | null, stream?: string | null, mobile?: string | null, selfID?: string | null, rollNumber?: string | null, ca: Array<string>, referredBy?: string | null, fests: Array<{ __typename?: 'Org', name: string, description: string }> } | null> | null };


export const UserDocument = gql`
    query User($festID: [String!], $id: ID, $uid: ID, $email: String, $city: String, $state: String, $college: String, $stream: String, $referredBy: String, $isNitrStudent: Boolean) {
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
  ) {
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
    fests {
      name
      description
    }
    ca
    referredBy
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