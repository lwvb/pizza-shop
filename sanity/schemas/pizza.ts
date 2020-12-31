import { MdLocalPizza } from 'react-icons/md';
import PriceInput from '../components/PriceInput';
import topping from './topping';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon: MdLocalPizza,
  fields: [
    {
      name: 'name',
      title: 'Pizza name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000),
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      nrOfToppings: 'toppings.length',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
    },
    prepare: ({ title, media, nrOfToppings, ...toppings }) => {
      const toppingsString = Object.values(toppings).filter(Boolean).join(', ');
      return {
        title,
        media,
        subtitle: `${toppingsString} ${
          nrOfToppings > 3 ? ` +${nrOfToppings - 3} more` : ''
        }`,
      };
    },
  },
};
