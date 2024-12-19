export interface Address {
  address: string;
  //number: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: Address;
}
