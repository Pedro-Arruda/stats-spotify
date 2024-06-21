interface RecentTracks {
  items: {
    album: {
      href: string;
      id: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      name: string;
    };
    artists: {
      id: string;
      name: string;
    }[];
    id: string;
    name: string;
  }[];
}
