
export interface StaffProfile {
    id: number;
    name: string;
    image: string;
    booking: Booking[]
}


export interface Booking {
  id: number,
  title: string,
  start: string,
  end: string,
}
