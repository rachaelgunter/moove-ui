import React, { FC } from 'react';
import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';

interface GoogleStreetViewProps {
  height: number;
  width: number;
  position: {
    lat: number;
    lng: number;
  };
}

const GoogleStreetView: FC<GoogleStreetViewProps> = ({
  height,
  width,
  position,
}: GoogleStreetViewProps) => {
  const mapContainerStyle = {
    height: `${height}px`,
    width: `${width}px`,
  };

  return (
    <GoogleMap
      id="street-view"
      mapContainerStyle={mapContainerStyle}
      zoom={7}
      center={position}
    >
      <StreetViewPanorama
        options={{ position, visible: true, clickToGo: true }}
      />
    </GoogleMap>
  );
};

export default GoogleStreetView;
