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
