import { gql } from "@apollo/client";

export const CREATE_NEW_AD = gql`
  mutation Mutation($adData: AdInput!) {
    createNewAd(adData: $adData) {
      id
    }
  }
`;

export const UPDATE_AD = gql`
  mutation Mutation($adData: AdUpdateInput!, $updateAdId: Float!) {
    updateAd(adData: $adData, id: $updateAdId) {
      id
    }
  }
`;
