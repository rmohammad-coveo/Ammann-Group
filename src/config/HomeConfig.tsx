import HeroImage from '../assets/Hero.jpg'
import { RecommendationType } from './Types/ConfigTypes';

export const NavBarConfig = [
  {
    title: "FIND A RETAILER",
    redirectTo: "/home",
  },
  {
    title: "CONTACT",
    redirectTo: "/",
  },
  {
    title: "NEWS",
    redirectTo: "/",
  },
  {
    title: "CAREERS",
    redirectTo: "/",
  },
];


export const HeaderConfig = [
    {
        title: "PRODUCT & SERVICES",
        redirectTo: "/home",
      },
      {
        title: "TECHNOLOGY",
        redirectTo: "/",
      },
      {
        title: "ABOUT US",
        redirectTo: "/",
      },
      {
        title: "SHOWS & EVENTS",
        redirectTo: "/",
      }
]


export const HeroConfig = {
    title  : 'FOREFRONT OF CONSTRUCTION',
    description : 'Specialised in mechanical engineering for building and road construction',
    background : HeroImage,
    buttonText : 'Learn More',
    onClickButtonRedirect : '/search',
    
}

export const NewsRecommendationConfig : RecommendationType = {
  title: 'News',
 /*  description: 'Recommended news to have a read', */
  numberOfResults: 4,
  imageField: 'news_image',
  pipeline: 'News',
  searchHub: "AdminConsole",
  id: "Recommendation"
}

export const MainRecommendationConfig : RecommendationType= {

  title : 'Recommendations',
  /* description : "Here are your personalized recommendations", */
  numberOfResults: 4,
  imageField : 'image',
  pipeline : 'Homepage',
  searchHub: 'AdminConsole',
  id : 'Recommendation'
}

export const VideoRecommendationConfig : RecommendationType  = {

  title : 'Videos',
  /* description : "Here are your personalized recommendations", */
  numberOfResults: 4,
  imageField : 'ytthumbnailurl',
  pipeline : 'Video Rec Sidebar',
  searchHub: 'AdminConsole',
  id : 'Recommendation'
}


export const EnableAuthentication = false;