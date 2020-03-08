export const sortAlphabetical = (a: string, b: string): number => {
  let normalizedA = a.toLowerCase();
  let normalizedB = b.toLowerCase();
  if (normalizedA > normalizedB) { return 1; };
  if (normalizedA < normalizedB) { return -1; };
  return 0;
}

export const getUserAddressFields = (user: User): AddressFields => {
  const addressFragments = user.address.split('.'); // ['123 Sesame St', ' Denver, CO, 80200']
  const cityStateZip = addressFragments[1].split(','); // [' Denver', ' CO', ' 80200']

  return {
    line1: addressFragments[0].trim(),
    city: cityStateZip[0].trim(),
    state: cityStateZip[1].trim(),
    zip: parseInt(cityStateZip[2].trim(), 10)
  }
};
