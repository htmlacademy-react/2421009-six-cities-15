type CardParamsType = {
  width: string;
  height: string;
  classNames: {
    'article' : string;
    'image' : string;
  };
}

export const getCardParams = (template:string): CardParamsType => {

  let classNames = {'article' : '', 'image' : ''};
  let width = '260';
  let height = '200';

  switch (template) {
    case 'mainScreen':
      classNames = {'article' : 'cities__card place-card', 'image' : 'cities__image-wrapper place-card__image-wrapper'};
      break;
    case 'offerScreen':
      classNames = {'article' : 'near-places__card place-card', 'image' : 'near-places__image-wrapper place-card__image-wrapper'};
      break;
    case 'favoriteScreen':
      classNames = {'article' : 'favorites__card place-card', 'image' : 'favorites__image-wrapper place-card__image-wrapper'};
      width = '150';
      height = '110';
      break;
    default :
      classNames = {'article' : 'place-card', 'image' : 'place-card__image-wrapper'};
  }

  return {classNames, width, height};
};

function handleMouseEnter (hovered:boolean|undefined, id:string, setActiveId: (id: string)=>void):void {
  if (hovered) {
    setActiveId(id);
  }
}

function handleMouseOut (hovered:boolean|undefined, setActiveId: ()=>void):void {
  if (hovered) {
    setActiveId();
  }
}

export {handleMouseEnter, handleMouseOut};
