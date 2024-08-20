import React, { useState, useEffect } from "react";
import ReviewForm from "./reviewForm";
import * as reviewService from "../../services/reviewService";
import authService from "../../services/authService";

const Reviews = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    async function getReviews() {
      const reviewsData = await reviewService.getByServiceId(serviceId);
      setReviews(reviewsData);
    }
    getReviews();
  }, [serviceId]);

  useEffect(() => {
    const user = authService.getUser();
    setCurrentUser(user);
  }, []);

  const handleAddReview = async (formData) => {
    const userId = currentUser.id;
    if (userId && serviceId) {
      try {
        await reviewService.create(userId, serviceId, formData);
        const updatedReviews = await reviewService.getByServiceId(serviceId);
        setReviews(updatedReviews);
        setShowReviewForm(false);
        setSelectedReview(null);
      } catch (error) {
        console.error("Error creating review:", error);
      }
    } else {
      console.error("User ID or Service ID is missing.");
    }
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setShowReviewForm(true);
  };

  const handleUpdateReview = async (reviewId, formData) => {
    try {
      const updatedReview = await reviewService.update(reviewId, formData);
      const updatedReviews = reviews.map((review) =>
        review._id !== updatedReview._id ? review : updatedReview
      );
      setReviews(updatedReviews);
      setShowReviewForm(false);
      setSelectedReview(null);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await reviewService.remove(reviewId);
      const updatedReviews = reviews.filter((review) => review._id !== reviewId);
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const reviewFormVisible = () => {
    setShowReviewForm(!showReviewForm);
    if (!showReviewForm) {
      setSelectedReview(null);
    }
  };

  return (
    <section>
      <h2>Reviews</h2>
      <button onClick={reviewFormVisible}>
        {showReviewForm ? "Close Review Form" : "Add Review"}
      </button>

      {showReviewForm && (
        <ReviewForm
          handleAddReview={handleAddReview}
          selectedReview={selectedReview}
          handleUpdateReview={handleUpdateReview}
        />
      )}

      {!reviews.length && <p>There are no reviews yet.</p>}

      {reviews.map((review) => (
        <article key={review._id}>
          <p>
            <strong>
            {review.user.username} posted on {new Date(review.createdAt).toLocaleDateString()}
            </strong>
          </p>
          <p>{review.comment}</p>
          <p>Rating: {review.rating}</p>
          {currentUser && review.user.id === currentUser._id && (
            <>
              <button onClick={() => handleEditReview(review)}>Edit</button>
              <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
            </>
          )}
        </article>
      ))}
    </section>
  );
};

export default Reviews;
