import {ChangeEvent, Fragment, memo, ReactEventHandler, useState} from 'react';

import {Rating} from '../../types/rating.ts';
import {useActionCreators, useAppSelector} from '../../hooks';
import {reviewsActions, reviewsSelectors} from '../../store/slices/reviews.ts';
import {offerSelectors} from '../../store/slices/offer.ts';
import {RATINGS, RequestStatus, ReviewsParams} from '../../const.ts';
import {toast} from 'react-toastify';

type THandleFormChange = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

function ReviewsForm (): JSX.Element {

  const currentOffer = useAppSelector(offerSelectors.offer);
  const posting = useAppSelector(reviewsSelectors.posting);
  const {addCommentAction} = useActionCreators(reviewsActions);
  const initialState = {rating: 0, review: ''};
  const [review, setReview] = useState(initialState);
  const [send, setSend] = useState(false);
  const handleFormElementChange: THandleFormChange = (event) => {
    const {name, value} = event.currentTarget;
    setReview({...review, [name]:value});
  };

  if (currentOffer === null || currentOffer === undefined) {
    return <>&nbsp;</>;
  }

  if (send === true) {
    if (posting === RequestStatus.Success) {
      setReview(initialState);
      setSend(false);
    } else if (posting === RequestStatus.Failed) {
      setSend(false);
      toast.warn(ReviewsParams.NoticeOfBadSending);
    }
  }

  const handleFormSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (posting !== RequestStatus.Loading) {
      addCommentAction({body:{comment: review.review, rating: parseInt(String(review.rating), 10)}, offerId: currentOffer.id});
      setSend(true);
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({value, title}: Rating) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              checked={value === Number(review.rating)}
              type="radio"
              disabled={posting === RequestStatus.Loading}
              onChange={handleFormElementChange}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={review.review}
        disabled={posting === RequestStatus.Loading}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFormElementChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.review.length < ReviewsParams.MinReviewLength || review.review.length > ReviewsParams.MaxReviewLength || review.rating === 0 || posting === RequestStatus.Loading}
        >Submit
        </button>
      </div>
    </form>
  );
}

const MemorizedReviewsForm = memo(ReviewsForm);

export default MemorizedReviewsForm;
