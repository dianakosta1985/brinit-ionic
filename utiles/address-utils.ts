export function findAddressNumber(
  addressComponents: {
    long_name: string;
    short_name: string;
    types: string[];
  }[]
): string {
  return findAddressComponent(addressComponents, 'street_number');
}

export function findCity(
  addressComponents: {
    long_name: string;
    short_name: string;
    types: string[];
  }[]
): string {
  let level_3 = findAddressComponent(
    addressComponents,
    'administrative_area_level_3'
  ); // Smaller city name - sometimes missing
  //   let level_2 = findAddressComponent(
  //     addressComponents,
  //     'administrative_area_level_2'
  //   ); // Higher level name
  return level_3;
  // return level_3 ? level_3 + ', ' + level_2 : level_2;
}

export function findNeighborhood(
  addressComponents: {
    long_name: string;
    short_name: string;
    types: string[];
  }[]
): string {
  return (
    findAddressComponent(addressComponents, 'sublocality') ||
    findAddressComponent(addressComponents, 'sublocality_level_1')
  );
}

export function findState(
  addressComponents: {
    long_name: string;
    short_name: string;
    types: string[];
  }[]
): string {
  return findAddressComponent(addressComponents, 'administrative_area_level_1');
}

export function findStreet(
  addressComponents: {
    long_name: string;
    short_name: string;
    types: string[];
  }[]
): string {
  return findAddressComponent(addressComponents, 'route');
}

export function findCountry(
  addressComponents: {
    long_name: string;
    short_name: string;
    types: string[];
  }[]
): string {
  return findAddressComponent(addressComponents, 'country');
}

export function findZipCode(
  addressComponents: {
    long_name: string;
    short_name: string;
    types: string[];
  }[]
): string {
  let element = '';
  addressComponents.forEach((a: any) => {
    let hasZipCode = a.types.some((t: any) => t == 'postal_code');
    if (hasZipCode) {
      element = a.long_name;
    }
  });

  return element;
}

export function findAddressComponent(
  addressComponents: {
    long_name: string;
    short_name: string;
    types: string[];
  }[],
  type: string
): string {
  let element = addressComponents.find((a) =>
    a.types.some((t: any) => t == type)
  );
  return element ? element.long_name : '';
}

export function findAddressComponentShortName(
  addressComponents: {
    long_name: string;
    short_name: string;
    types: string[];
  }[],
  type: string
): string {
  let element = addressComponents.find((a) =>
    a.types.some((t: any) => t == type)
  );
  return element ? element.short_name : '';
}
