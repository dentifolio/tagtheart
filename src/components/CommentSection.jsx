import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addComment, reportPin } from '../firebase';

function CommentSection({ pin }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const commentsCol = collection(db, 'pins', pin.id, 'comments');
    const unsubscribe = onSnapshot(commentsCol, snapshot => {
      const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(loaded);
    });
    return unsubscribe;
  }, [pin.id]);

  const handleAddComment = async e => {
    e.preventDefault();
    if (!text) return;
    await addComment(pin.id, text);
    setText('');
  };

  const handleReport = async () => {
    await reportPin(pin.id);
    alert('Reported pin');
  };

  return (
    <div className="comment-section">
      <h2>Comments for: {pin.description}</h2>
      <button onClick={handleReport}>Report Pin</button>
      <ul>
        {comments.map(c => (
          <li key={c.id}>{c.text}</li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Add a comment"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
);
}

export default CommentSection;
