export const months = [
    {key: 0, text:'January', value: 'JANUARY'},
    {key: 1, text:'February', value: 'FEBRUARY'},
    {key: 2, text:'March', value: 'MARCH'},
    {key: 3, text:'April', value: 'APRIL'},
    {key: 4, text:'May', value: 'MAY'},
    {key: 5, text:'June', value: 'JUNE'},
    {key: 6, text:'July', value: 'JULY'},
    {key: 7, text:'August', value: 'AUGUST'},
    {key: 8, text: 'September', value: 'SEPTEMBER'},
    {key: 9, text:'October', value: 'OCTOBER'},
    {key: 10, text:'November', value: 'NOVEMBER'},
    {key: 11, text:'December', value: 'DECEMBER'},
];

export const types = [
    {key: 0, text: 'Income', value:  'Income'},
    {key: 1, text:'Expense', value: 'Expense'}
];

export const currencies = [
    {key: 0, text: 'USD', value:  'USD'},
    {key: 1, text: 'EUR', value:  'EUR'},
    {key: 2, text: 'MKD', value:  'MKD'},
]

export const yearList = () => {
    const year = new Date().getFullYear() - 3;
    return (
        Array.from(new Array(5), (v,i) => {
            return {value: year+i, text: year+i, key: year+i};
        })
    )
};

export const API_BASE_URL = 'https://budget-planner-backend-55c68a159767.herokuapp.com';
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';

export const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=openid%20profile%20email&state=GqlaJFjnLI7zEKpJksutU3-k35wig7TehC7TFvv47dI.lzAB8L17ARE.LYtNdAR3RHiZCgasveIu8A&response_type=code&client_id=457967919927-h67cp3jfm2cuj03578a1vo4cd8g523nt.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Frealms%2Fbudgetplannerdev%2Fbroker%2Fgoogle%2Fendpoint&nonce=Z7dgPje5cU_fVubn7LtVSA&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow\n';
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = 'https://github.com/login?client_id=71a6a7ead540d8ecb036&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D71a6a7ead540d8ecb036%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8080%252Frealms%252Fbudgetplannerdev%252Fbroker%252Fgithub%252Fendpoint%26response_type%3Dcode%26scope%3Duser%253Aemail%26state%3DtL8miVsfpdBKdW9gU4bmQNJYrcQgHttk1-bDOq_iDQw.bNEE3k1qvB0.LYtNdAR3RHiZCgasveIu8A';

export const OPEN_EXCHANGE_RATES_API_URL = `https://openexchangerates.org/api/currencies.json`;