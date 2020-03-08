interface User { // todo: convert to class w/ derived address fields
  id: number,
  first_name: string,
  last_name: string,
  address: string,
  created_date: string,
  deleted_date: string | null
}

interface AddressFields {
  line1: string,
  city: string,
  state: string,
  zip: number
}
