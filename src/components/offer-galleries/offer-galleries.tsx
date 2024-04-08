import {MaxCountLimit} from '../../const.ts';
import {memo} from 'react';

type OfferGalleriesType = {
  images: string[];
  title: string;
}

function OfferGalleries ({images, title}: OfferGalleriesType) {

  const imagesLimit = images !== undefined ? images.slice(0, MaxCountLimit.OfferImages) : [];
  const imagesCount = imagesLimit.length;

  return (
    imagesCount > 0 && (
      <div className="offer__gallery-container container" data-testid="offer__gallery">
        <div className="offer__gallery">
          {imagesLimit.map((image) => (
            <div className="offer__image-wrapper" key={image}>
              <img className="offer__image" src={image} alt={title} />
            </div>
          ))}
        </div>
      </div>
    )
  );
}

const MemorizedOfferGalleries = memo(OfferGalleries);
export default MemorizedOfferGalleries;
