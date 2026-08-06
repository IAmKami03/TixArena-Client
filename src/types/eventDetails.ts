export interface LineupArtist {
  id: string;
  name: string;
  role?: string;
  avatar: string;
}

export interface SimilarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  category: string;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  overview: string;
  heroImage: string;
  lineup: LineupArtist[];
  similarEvents: SimilarEvent[];
  ticketPrice: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
}
