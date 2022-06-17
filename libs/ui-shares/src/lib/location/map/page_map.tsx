import { useState, useEffect } from 'react';

import MapGL, {
  GeolocateControl,
  Marker,
  FlyToInterpolator,
} from '@goongmaps/goong-map-react';

import '@goongmaps/goong-js/dist/goong-js.css';
import LocationPin from './pin';
import { MapboxProps } from '@goongmaps/goong-map-react/src/goong/goong';
import { InteractiveMapProps } from '@goongmaps/goong-map-react/src/components/interactive-map';
import { CallbackEvent } from '@goongmaps/goong-map-react/src/components/draggable-control';

const geolocateStyle = {
  top: 20,
  left: 20,
};
export type LocationType = {
  latitude: number;
  longitude: number;
};
interface Props {
  defaultMarker?: LocationType;
  height?: string;
  active?: boolean;
  onLocationChange?: ({ latitude, longitude }: LocationType) => void;
}

const positionOptions = { enableHighAccuracy: true };
export const PageMap = (props: Props) => {
  const {
    onLocationChange,
    active = false,
    defaultMarker = { latitude: 10.77608, longitude: 106.659984 },
    height = '400px',
  } = props;
  const [marker, setMarker] = useState<LocationType>(defaultMarker);
  const [viewport, setViewport] = useState<MapboxProps & InteractiveMapProps>();

  useEffect(() => {
    setMarker(defaultMarker);
    setViewport({
      width: '100%',
      height: height,
      latitude: defaultMarker?.latitude ?? 10.77608,
      longitude: defaultMarker?.longitude ?? 106.659984,
      zoom: 15,
      bearing: 0,
      pitch: 0,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
    });
  }, [defaultMarker]);

  const onViewportChange = (nextViewport: MapboxProps) => {
    setViewport(nextViewport);
  };

  const onMarkerDragEnd = (event: CallbackEvent) => {
    if (!active) return;
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
    setViewport({
      ...viewport,
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
      // center: [event.lngLat[0], event.lngLat[1]],
    });
    onLocationChange?.({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  };
  return (
    <MapGL
      {...viewport}
      goongApiAccessToken={'P1rKzGMDwlGnQGQERX1wSZRIXdD99aB1ilaaS2dB'}
      onViewportChange={onViewportChange}
    >
      <GeolocateControl
        auto={false}
        trackUserLocation
        style={geolocateStyle}
        positionOptions={positionOptions}
        // onGeolocate={onGeolocate}
      />
      {marker && (
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          draggable
          onDragEnd={onMarkerDragEnd}
        >
          <LocationPin />
        </Marker>
      )}
    </MapGL>
  );
};

export default PageMap;
