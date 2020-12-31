import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  console.log('input change', value);
  return PatchEvent.from(value === '' ? unset() : set(parseInt(value, 10)));
}

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'usd',
}).format;

const PriceInput = ({ type, value, onChange, inputComponent }) => (
  <div>
    <h4>
      {type.title} ({formatMoney(value ? value / 100 : 0)})
    </h4>
    <p>{type.description}</p>
    <input
      type={type.name}
      value={value}
      onChange={(event) => onChange(createPatchFrom(event.target.value))}
      ref={inputComponent}
    />
  </div>
);
PriceInput.focus = function () {
  this._inputElement.focus();
};

export default PriceInput;
