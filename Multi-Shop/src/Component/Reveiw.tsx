import { useState } from "react";

const Review = () => {
  const [hoverStar, setHoverStar] = useState<number>(-1);
  const [reviews, setReviews] = useState<Array<{ reviewText: string; starRating: number }>>([]);
  const [reviewText, setReviewText] = useState<string>("");
  const [clickStar, setClickStar] = useState<number>(-1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newReviews = [...reviews, { reviewText: reviewText, starRating: clickStar }];
    setReviews(newReviews);
    setReviewText(""); 
    setClickStar(-1); 
  };

  return (
    <div>
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="p-4">
          <h3 className="font-bold">Reviews</h3>
          <div className="my-3">
          {Array.from({ length: 5 }, (_, index) => (
            <i
              key={index}
              className={`ri-star-fill   ${
                hoverStar >= index || clickStar >= index ? "text-yellow-300" : "text-gray-400"
              }`}
              onMouseEnter={() => setHoverStar(index)}
              onMouseLeave={() => setHoverStar(-1)}
              onClick={() => setClickStar(index)}
              style={{ cursor: "pointer" }}
            ></i>
          ))}
          </div>
          
          <textarea
            placeholder="Write your review here..."
            className="border rounded-md p-2 w-full h-24"
            value={reviewText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReviewText(e.target.value)}
            required
          />
          <button type="submit" className="bg-black text-white px-4 py-2 mt-2">
            Submit Review
          </button>
        </div>
      </form>
      <div>
        {reviews.map((reviewObj, index) => (
          <div key={index}>
            {/* Display the stars based on starRating */}
            {Array.from({ length: reviewObj.starRating + 1 }, (_, idx) => (
              <i key={idx} className="ri-star-fill text-yellow-400"></i>
            ))}
            <h2>{reviewObj.reviewText}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
