const averageRatingDom = document.querySelector('.summary-average-number');
const averageStarsDom = document.querySelector('.summary-average-stars');
const totalReviewsDom = document.querySelector('.summary-total-reviews-number');
const reviewsGraph = document.querySelector('.reviews-graph');

const getReviewsData = async () => {
  try {
    const response = await fetch('./mockReviewsData.json');
    const { totalReviews, averageRating, ratings } = await response.json();
    const averageStarsToDisplay = Math.round(parseFloat(averageRating));

    // write summary data to DOM
    averageRatingDom.innerHTML = averageRating;
    averageStarsDom.innerHTML =
      '<span class="material-icons material-icons-star">star</span>'.repeat(
        averageStarsToDisplay
      );
    totalReviewsDom.innerHTML = totalReviews;

    // write graph data to DOM
    const reviewsGraphsElements = ratings
      .map((rating) => {
        const filldedStars =
          '<span class="material-icons material-icons-star">star</span>'.repeat(
            rating.stars
          );
        const blankStars =
          '<span class="material-icons material-icons-star">star_border</span>'.repeat(
            5 - rating.stars
          );
        const stars = filldedStars.concat(blankStars);
        const percentOfTotalReviews = Math.round(
          100 * (rating.reviews / totalReviews)
        );

        return `
        <div class="graph-item">
          <div class="graph-stars">
            ${stars}
          </div>
          <div class="graph-bar-outer">
            <div class="graph-bar-inner" style="width: ${percentOfTotalReviews}px"></div>
          </div>
          <p class="graph-total-reviews">(${rating.reviews})</p>
        </div>`;
      })
      .join('');
    reviewsGraph.innerHTML = reviewsGraphsElements;
  } catch (error) {
    console.log(error);
  }
};

getReviewsData();
