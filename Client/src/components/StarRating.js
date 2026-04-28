import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, onRatingChange }) => {
    const [hoverStar, setHoverStar] = useState(null);
    const [selectedStar, setSelectedStar] = useState(null);
    const [isHovering, setIsHovering] = useState(false);

    const setRatingValue = (value) => {
        const isSameStar = selectedStar === value;

        let ratingParam = '';
        switch(value) {
            case 1:
                ratingParam = 'r1';
                break;
            case 2:
                ratingParam = 'r2';
                break;
            case 3:
                ratingParam = 'r3';
                break;
            case 4:
                ratingParam = 'r4';
                break;
            case 5:
                ratingParam = 'r5';
                break;
            default:
                break;
        }

        const updatedRating = { ...rating, [ratingParam]: isSameStar ? rating[ratingParam] : rating[ratingParam] + 1 };

        if (selectedStar && selectedStar !== value) {
            const prevRatingParam = `r${selectedStar}`;
            updatedRating[prevRatingParam]--;
        }

        const totalRatings = Object.values(updatedRating).slice(0, 5).reduce((acc, cur) => acc + cur, 0);
        const newRat = totalRatings ? (Object.values(updatedRating).slice(0, 5).reduce((acc, cur, index) => acc + (cur * (index + 1)), 0) / totalRatings).toFixed(2) : 0;

        onRatingChange({ ...updatedRating, rat: parseFloat(newRat) });

        setSelectedStar(value);
    };

    return (
        <div className="rait" >
            <div className="rating-container">
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    let fraction = rating.rat - i;
                    fraction = fraction > 0 ? (fraction > 1 ? 1 : fraction) : 0;
                    return (
                        <label key={i} className="star-container">
                            <input
                                className="radio-star"
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setRatingValue(ratingValue)}
                            />
                            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                            <FaStar

                                className="star"
                                color={(isHovering && ratingValue <= hoverStar) || (!isHovering && ratingValue <= rating.rat) ? "#ffc107" : "#e4e5e9"}
                                size={25}
                                onMouseEnter={() => setHoverStar(ratingValue)}
                                onMouseLeave={() => setHoverStar(null)}
                                style={{ transition: "color 200ms" }}
                            />


                            {!isHovering && (
                                <div className={`partial-star ${fraction > 0 ? 'partial-star-filled' : ''}`} style={{ width: `${fraction * 100}%`, transition: "width 200ms" }}>
                                    <FaStar
                                        className="star"
                                        color="#ffc107"
                                        size={25}
                                    />
                                </div>
                            )}
                            </div>
                        </label>
                    );
                })}
            </div>
            <h2 className="rait-value">{rating.rat}</h2>
        </div>
    );
};

export default StarRating;



