export interface ICategories {
  id: number,
  name: string,
  short_name: string,
  plural_name: string,
  icon: {
    "prefix": string,
    "suffix": string
  }
}

export interface IPlace {
  fsq_id: string;
  categories: ICategories[];
  chains: any[];
  closed_bucket: string;
  distance: number;
  geocodes: {
    main: IGeocode;
  };
  link: string;
  location: ILocation;
  name: string;
  related_places?: {
    parent?: IRelatedPlace;
    children?: IRelatedPlace[];
  };
  timezone: string;
}

export interface IRelatedPlace {
  fsq_id: string;
  categories: ICategories[];
  name: string;
}

export interface IGeocode {
  latitude: number;
  longitude: number;
}

export interface ILocation {
  address?: string;
  country: string;
  cross_street?: string;
  formatted_address: string;
  locality: string;
  region: string;
  postcode?: string;
}

export interface IApiResponse {
  context: any;
  results: IPlace[];
}
