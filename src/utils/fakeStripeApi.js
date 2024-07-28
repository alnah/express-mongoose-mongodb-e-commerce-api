const fakeStripeApi = async ({ amount, currency }) => {
  const clientSecret = "someRandomValue";
  return { clientSecret, amount };
};

module.exports = fakeStripeApi;
