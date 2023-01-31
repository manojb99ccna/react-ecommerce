export const HOST = process.env.REACT_APP_API_URL;
export const consumer_key = process.env.REACT_APP_CONSUMER_KEY;
export const consumer_secret = process.env.REACT_APP_CONSUMER_SECRET;

export const Endpoint = { 
    GET_PRODUCT_LISTING: HOST + "/wp-json/wc/v3/products?consumer_key="+consumer_key+"&consumer_secret="+consumer_secret,
    GET_CATEGORY_LISTING_FILTER: HOST + "/wp-json/wc/v3/products/categories?consumer_key="+consumer_key+"&consumer_secret="+consumer_secret,
    ORDER_SUBMIT: HOST + "/wp-json/wc/v3/orders?consumer_key="+consumer_key+"&consumer_secret="+consumer_secret,
    SUBMIT_CONTACT_FORM: HOST + "/wp-json/contact-form-7/v1/contact-forms/2190/feedback?consumer_key="+consumer_key+"&consumer_secret="+consumer_secret,

    HOME_SLIDER_LIST: HOST + "/wp-json/react/v1/slider?consumer_key="+consumer_key+"&consumer_secret="+consumer_secret,

    /* USER LOGIN */
    USER_LOGIN: HOST + "/wp-json/custom-plugin/login?consumer_key="+consumer_key+"&consumer_secret="+consumer_secret,

    GET_ORDER_LISTING: HOST + "/wp-json/wc/v3/orders?consumer_key="+consumer_key+"&consumer_secret="+consumer_secret, 

    GET_ORDER_DETAILS: HOST + "/wp-json/wc/v3/orders",

    

}