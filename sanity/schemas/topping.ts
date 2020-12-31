import { FaPepperHot } from 'react-icons/fa';

export default {
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon: FaPepperHot,
  fields: [
    {
      name: 'name',
      title: 'Topping name',
      type: 'string',
      description: 'What is the name of the topping',
    },
    {
      name: 'isVegetarian',
      title: 'Is vegetarian',
      type: 'boolean',
      default: false,
      options: {
        layout: 'checkbox',
      },
    },
  ],
  initialValue: {
    isVegetarian: true,
  },
  preview: {
    select: {
      name: 'name',
      isVegetarian: 'isVegetarian',
    },
    prepare: ({ name, isVegetarian }) => ({
      title: `${name} ${isVegetarian ? '☘' : ''}`,
    }),
  },
};
