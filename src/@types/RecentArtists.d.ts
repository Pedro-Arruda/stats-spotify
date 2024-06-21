interface RecentArtists {
  items: {
    followers: {
      total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];

    name: string;
    type: string;
  }[];
}
