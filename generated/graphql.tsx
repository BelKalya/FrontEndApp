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
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
};


export type MutationRegisterArgs = {
  options: UserDetails;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  company: Scalars['String'];
  contactName: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  facebook: Scalars['String'];
  id: Scalars['Float'];
  instagram: Scalars['String'];
  password: Scalars['String'];
  twitter: Scalars['String'];
};

export type UserDetails = {
  company?: InputMaybe<Scalars['String']>;
  contactName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  facebook?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  twitter?: InputMaybe<Scalars['String']>;
};

export type RegisterMutationVariables = Exact<{
  options: UserDetails;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: number, email: string, password: string, company: string, description: string, contactName: string, facebook: string, instagram: string, twitter: string } };


export const RegisterDocument = gql`
    mutation Register($options: UserDetails!) {
  register(options: $options) {
    id
    email
    password
    company
    description
    contactName
    facebook
    instagram
    twitter
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;