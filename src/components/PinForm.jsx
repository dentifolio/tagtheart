import React, { useState } from 'react';
import { db, storage, collection, addDoc, storageRef, uploadBytes, getDownloadURL } from '../firebase';

function PinForm({ selectedLocation }) {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file || !selectedLocation) {
      return alert('Pick a location and image');
    }
    const storageReference = storageRef(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageReference, file);
    const url = await getDownloadURL(storageReference);
    await addDoc(collection(db, 'pins'), {
      description,
      imageUrl: url,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      reports: 0,
      createdAt: new Date()
    });
    setDescription('');
    setFile(null);
    alert('Pin added!');
  };

  return (
    <form className="pin-form" onSubmit={handleSubmit}>
      <p>Click on map to select location.</p>
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">Add Pin</button>
    </form>
  );
}

export default PinForm;
