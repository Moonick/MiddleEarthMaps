export type ConnectorType = {
  type: string;
  status: string;
};

export interface PinType {
  _id: string;
  latitude: number;
  longitude: number;
  title: string;
  connectors: ConnectorType[];
}

export type LocationType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
} | null;

export type Pins = Record<string, PinType>;

export interface UserLocationState {
  location: LocationType;
}

export interface PinsState {
  pins: Pins;
  allIds: string[];
  searchResult: PinType[];
  searchQuery: string;
}

export type StateType = {
  userLocationState: UserLocationState;
  pinsState: PinsState;
};
