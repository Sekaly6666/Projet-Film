export type Movie= { id: number; title: string; genre: string; year: number;rating: number; image: string; description: string; releaseDate: string; adminPublicationDate: string; };


export const heroMovie ={
  title: "Dune: Part Two",
  description: "Un grand film d'aventure a decouvrir avec une histoire forte, de l'action et beaucoup d'emotion ",
   year: 2024,
  genre: "Science-fiction",
   rating: 8.5,
  image: "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",

};


export const  popularMovies: Movie [] =[

  {
     id: 1,
    title:"Dune: Part Two",
    genre: "Science-fiction",
     year : 2024,
    rating:8.5,
    image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    description:"Paul Atreides continue son aventure sur Arrakis avec les Fremen",
      releaseDate : "28 fevrier 2024",
    adminPublicationDate :"12 mai 2026",

  } ,


  {
    id: 2,
    title:"Inside Out 2",
    genre: "Animation",
    year:2024,
       rating: 7.6,
    image:"https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    description:"Riley grandit et decouvre de nouvelles emotions dans sa vie",
      releaseDate: "14 juin 2024",
    adminPublicationDate:"12 mai 2026",

  },

  {
    id: 3,
    title: "Deadpool & Wolverine",
     genre:"Action",
    year: 2024,
     rating: 7.7,
    image: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
     description:"Deadpool et Wolverine se retrouvent dans une mission pleine d'action ",
    releaseDate: "24 juillet 2024",
    adminPublicationDate: "13 mai 2026",

  },

  {
    id: 4,
    title: "Godzilla x Kong",
    genre:" Aventure",
      year: 2024,
    rating: 7.1,
    image:"https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    description:"Godzilla et Kong doivent faire face a une nouvelle menace ",
      releaseDate: "29 mars 2024",
    adminPublicationDate: "13 mai 2026",


  },

];


export const recentMovies: Movie[] =[{

     id: 5,
    title:"Bad Boys: Ride or Die",
    genre: "Comedie",
    year: 2024,
    rating: 7.0,
     image: "https://image.tmdb.org/t/p/w500/oGythE98MYleE6mZlGs5oBGkux1.jpg",
    description:"Deux policiers reprennent du service pour une nouvelle enquete ",
    releaseDate: "5 juin 2024",
     adminPublicationDate: "14 mai 2026",

  },

  {
    id: 6,
    title: "Kingdom of the Planet of the Apes",
    genre:"Science-fiction" ,
    year: 2024,
    rating:7.1,
    image:  "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    description:  "Une nouvelle generation part a la recherche de son avenir ",
    releaseDate:"8 mai 2024",
    adminPublicationDate:"14 mai 2026"  ,

  } ,


  {
    id: 7,
    title: "The Garfield Movie",
    genre:"Famille",

     year: 2024,
    rating: 7.2,
    image:"https://image.tmdb.org/t/p/w500/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
    description: "Garfield quitte son quotidien tranquille pour une aventure familiale ",
     releaseDate: "24 mai 2024" ,
    adminPublicationDate: "15 mai 2026",
  } ,

  {
    id: 8,
    title:"A Quiet Place: Day One",
     genre:"Horreur",
    year:2024,
    rating: 6.8,
    image:"https://image.tmdb.org/t/p/w500/hU42CRk14JuPEdqZG3AWmagiPAP.jpg" ,

    description:"Le monde decouvre les premiers jours d'une invasion terrifiante " ,
    releaseDate:"26 juin 2024",
    adminPublicationDate: "15 mai 2026" ,

  },

] ;


export const allMovies= [...popularMovies, ...recentMovies ] ;
