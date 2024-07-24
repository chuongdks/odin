document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviewsContainer');
    const ratingCounts = [1, 1, 1, 0, 0]; 
    let totalRatingSum = 3 + 4 + 5; 
    let totalReviews = 3; 

    const bars = ['.bar-5','.bar-4','.bar-3','.bar-2','.bar-1'];

    function updateRatingSummary() {

        const averageRating = totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(1) : '0.0';

        document.getElementById('averageRating').textContent = averageRating;
        document.getElementById('totalReviews').textContent = totalReviews;
        document.getElementById('ratingCount5').textContent = ratingCounts[4];
        document.getElementById('ratingCount4').textContent = ratingCounts[3];
        document.getElementById('ratingCount3').textContent = ratingCounts[2];
        document.getElementById('ratingCount2').textContent = ratingCounts[1];
        document.getElementById('ratingCount1').textContent = ratingCounts[0];

        ratingCounts.slice().reverse().forEach((count, index) => {
            const barWidth = totalReviews > 0 ? (count / totalReviews * 100) : 0;
            document.querySelector(bars[index]).style.width = barWidth + '%';
        });
    }

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        const reviewText = e.target.review.value.trim();
        const rating = parseInt(e.target.rating.value, 10);
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        const reviewHeader = document.createElement('div');
        reviewHeader.className = 'review-header';
        const reviewer = document.createElement('div');
        reviewer.className = 'review-author';
        reviewer.textContent = name;
        const reviewStars = document.createElement('div');
        reviewStars.className = 'review-stars';

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.innerHTML = i < rating - 1 ? '&#9734;' : '&#9733;';
            reviewStars.appendChild(star);
        }

        reviewHeader.appendChild(reviewer);
        reviewHeader.appendChild(reviewStars);
        const reviewTextDiv = document.createElement('div');
        reviewTextDiv.className = 'review-text';
        reviewTextDiv.textContent = reviewText;
        reviewCard.appendChild(reviewHeader);
        reviewCard.appendChild(reviewTextDiv);
        reviewsContainer.appendChild(reviewCard);


        ratingCounts[rating - 1]++;
        if (rating === 5) {
            totalRatingSum += 1;
        } else if (rating === 4) {
            totalRatingSum += 2;
        } else if (rating === 3) {
            totalRatingSum += 3;
        } else if (rating === 2) {
            totalRatingSum += 4;
        } else if (rating === 1) {
            totalRatingSum += 5;
        }
        totalReviews++;

        updateRatingSummary();
        reviewForm.reset();
    });

    updateRatingSummary();
});
