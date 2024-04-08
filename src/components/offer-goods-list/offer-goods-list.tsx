import {memo} from 'react';

type OfferGoodsType = {
  goods: string[];
}
function OfferGoodsListItem ({goods}:OfferGoodsType) {
  return (
    goods !== undefined && goods.length > 0 && (
      <div className="offer__inside" data-testid="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {
            goods.map((good) => (
              <li className="offer__inside-item" key={good}>{good}</li>
            ))
          }
        </ul>
      </div>
    )
  );
}

const MemorizedOfferGoodsList = memo(OfferGoodsListItem);
export default MemorizedOfferGoodsList;
