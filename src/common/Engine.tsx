import {buildSearchEngine} from '@coveo/headless';
import {
  PlatformClient,
  RestUserIdType,
  TokenModel,
} from '@coveord/platform-client';
import { KEY_NAME_CONTEXT_DATA, KEY_NAME_PROFILE_SELECTED } from '../Components/CustomContext/InitialData';


const PROFILE_SELECTED : string | null = localStorage.getItem(KEY_NAME_PROFILE_SELECTED);
const CONTEXT_DATA = localStorage.getItem(KEY_NAME_CONTEXT_DATA);
let USER_ID_EMAIL = "";


if(CONTEXT_DATA !==null && CONTEXT_DATA.length > 0 && typeof PROFILE_SELECTED === 'string'){
  USER_ID_EMAIL =  JSON.parse(CONTEXT_DATA).filter((item : any)=>{
    return item.name === JSON.parse(PROFILE_SELECTED);
  })[0].email;
}






const getEndpointToLocalServer = () => {
  if (!process.env.REACT_APP_SERVER_PORT) {
    throw new Error('Undefined "REACT_APP_SERVER_PORT" environment variable');
  }
  const port = process.env.REACT_APP_SERVER_PORT;
  const pathname = '/token';
  return `http://localhost:${port}${pathname}`;
};

const getTokenEndpoint = () => {
  return process.env.REACT_APP_TOKEN_ENDPOINT || getEndpointToLocalServer();
};

export async function getSearchToken() {

  
  /* const res = await fetch(getTokenEndpoint()); */
  /* const {token} = await res.json(); */

  const res = await ensureClientTokenGenerated();
  const {token} = res;

  return token;
}

export async function initializeHeadlessEngine() {

  return buildSearchEngine({
    configuration: {
      platformUrl: process.env.REACT_APP_PLATFORM_URL,
      organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
      accessToken: await getSearchToken(),
      renewAccessToken: getSearchToken,
      search :{
        searchHub : process.env.REACT_APP_SEARCH_HUB!,
        pipeline: process.env.REACT_APP_SEARCH_ENGINE_PIPELINE!
      }
    },
  });
}


async function ensureClientTokenGenerated() {
  const platform: PlatformClient = new PlatformClient({
      /**
       * The Plaform URL to use.
       * https://platform.cloud.coveo.com is the default platform host.
       * However, you can target a different environment by changing the host value.
       *
       * Example:
       * Use "https://platformhipaa.cloud.coveo.com" if you want to target the HIPAA environment.
       *
       * You can also target a different region (e.g. https://platform-au.cloud.coveo.com)
       * See https://docs.coveo.com/en/2976/coveo-solutions/deployment-regions-and-strategies#data-residency
       */
      host: process.env.REACT_APP_PLATFORM_URL,
      /**
       * The unique identifier of your Coveo organization.
       * To retrieve your org ID, see https://docs.coveo.com/en/148/manage-an-organization/retrieve-the-organization-id
       */
      organizationId: process.env.REACT_APP_ORGANIZATION_ID,
      /**
       * An API key with the impersonate privilege in the target organization.
       * See https://docs.coveo.com/en/1718/manage-an-organization/manage-api-keys#add-an-api-key
       */
      accessToken: process.env.REACT_APP_API_KEY!,
    });

  /*   try{ */

  const response  = await platform.search.createToken({
      /****** Mandatory parameters ******/
      /**
       * The security identities to impersonate when authenticating a query with this search token.
       * The userIds array should contain at least one security indentity.
       * See https://docs.coveo.com/en/56/#userids-array-of-restuserid-required
       */
      userIds: [
        {
          name: USER_ID_EMAIL? USER_ID_EMAIL : process.env.REACT_APP_USER_EMAIL!,
          provider: 'Email Security Provider',
          type: RestUserIdType.User,
        },
      ],

      /****** Optional parameters ******/
      /**
       * The name of the search hub to enforce when authenticating a query with this search token.
       * The search hub is a descriptive name of the search interface on which the token is to be used.
       *See https://docs.coveo.com/en/56/#searchhub-string-optional

       * Example:
       * searchHub: 'supporthub',
       */
       /* searchHub: 'Finance', */
      /**
       * The filter query expression to apply when authenticating a query with this search token.
       * See https://docs.coveo.com/en/56/#filter-string-optional
       *
       * Example:
       * filter: 'NOT @source="my secured source"',
       */
    })
   /*  .then((data: TokenModel) => {
      token =  data.token;
    })
    .catch((err) => {
     console.log('error in token ',err)
     token = null
    }); */
      return response;
    
 /*  } */
  /* catch(err){
    console.log('error in generating search token')
    return 'error'
  } */
}