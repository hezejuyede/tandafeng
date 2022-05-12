import {getItem} from "../utils/storage";
import {TOKEN} from "../constant";

const state = {
    city: "城市名",
    token: getItem(TOKEN) || '',
    userInfo: {}
};


export default state;
