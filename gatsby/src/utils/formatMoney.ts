const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatMoney = (cents: number) => formatter.format(cents / 100);

export default formatMoney;
