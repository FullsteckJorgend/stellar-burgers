import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector((state) => state.ingredients.items);
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const ingredient = ingredients.find((item) => item._id === id);

  const ingredientData = ingredient;

  if (!ingredientData) {
    return <Preloader />;
  }

  const inModal = !!location.state?.background;

  return <IngredientDetailsUI ingredientData={ingredient} inModal={inModal} />;
};
