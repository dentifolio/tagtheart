import React, { useEffect, useRef } from 'react';

function Map({ pins, onMapClick, onMarkerClick }) {
  const mapRef = useRef(null);
  const googleMap = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    googleMap.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 12
    });
    googleMap.current.addListener('click', e => {
      onMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
  }, []);

  useEffect(() => {
    // Clear existing markers
    markers.current.forEach(m => m.setMap(null));
    markers.current = [];

    // Render pins with fewer than 3 reports
    pins
      .filter(pin => (pin.reports || 0) < 3)
      .forEach(pin => {
        const marker = new window.google.maps.Marker({
          position: { lat: pin.lat, lng: pin.lng },
          map: googleMap.current
        });
        marker.addListener('click', () => onMarkerClick(pin));
        markers.current.push(marker);
      });
  }, [pins]);

  return <div id="map" ref={mapRef} style={{ width: '100%', height: '60vh' }} />;
}

export default Map;
