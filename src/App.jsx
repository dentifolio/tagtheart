import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import PinForm from './components/PinForm';
import CommentSection from './components/CommentSection';
import { db, collection, onSnapshot } from './firebase';

function App() {
  const [pins, setPins] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(() => {
    const pinsCol = collection(db, 'pins');
    const unsubscribe = onSnapshot(pinsCol, snapshot => {
      const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPins(loaded);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="app-container">
      <h1>TagTheArt</h1>
      <PinForm selectedLocation={selectedLocation} />
      <Map
        pins={pins}
        onMapClick={loc => {
          setSelectedLocation(loc);
          setSelectedPin(null);
        }}
        onMarkerClick={pin => setSelectedPin(pin)}
      />
      {selectedPin && (
        <CommentSection pin={selectedPin} />
      )}
    </div>
  );
}

export default App;
