import { useState, useEffect } from 'react';
const ReviewForm = ({ handleAddReview, selectedReview, handleUpdateReview }) => {
  const [formData, setFormData] = useState({
    comment: '',
    rating: 5,
  });

  useEffect(() => {
    if (selectedReview) {
      setFormData({
        comment: selectedReview.comment,
        rating: selectedReview.rating,
      });
    }
  }, [selectedReview]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedReview) {
      await handleUpdateReview(selectedReview._id, formData); 
    } else {
      await handleAddReview(formData);
    }
    setFormData({ comment: '', rating: 5 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Comment:</label>
      <textarea
        id="comment"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        required
      />

      <label htmlFor="rating">Rating:</label>
      <select id="rating" name="rating" value={formData.rating} onChange={handleChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>

      <button type="submit">
        {selectedReview ? 'Update Review' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
