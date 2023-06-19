import { FacetConfig, FieldToIncludesInSearchResults } from "../SearchConfig";

export interface DefaultSideBarRecommendationConfigType {
    pipeline: string,
    searchHub : string,
    NumberofResults: number,
    title: string
    videoRecommendation? : boolean
    imageField? : typeof FieldToIncludesInSearchResults[number]
  }



type FacetFieldValue = typeof FacetConfig[number]['field']

export interface FacetConfigType {
  field : string,
  title : string
}  


export interface FileTypeIconsConfigType {
  imageRef : string; 
}


export interface sideBarRecommendationConfigType {
  pipeline : string;
  searchHub : string;
  NumberofResults: number;
  title: string;
  videoRecommendation? : boolean
  imageField? : typeof FieldToIncludesInSearchResults[number]
}

export interface SearchPageTabConfigType {
  caption : string;
  expression : string;
  isActive : boolean;
  sideBarRecommendationConfig? : sideBarRecommendationConfigType[];
  facetToInclude? : FacetFieldValue[];
}

export interface RecommendationType {
  title? : string,
  description? : string,
  numberOfResults?: number,
  imageField? : typeof FieldToIncludesInSearchResults[number],
  pipeline? : string,
  id? : string,
  searchHub : string,
}