import axios from 'axios';

const API_URL = "https://simplon-roanne.com/api/";
const COLLECTION_API = "raoulBipEnBois";

class Api {

    static saveHistory(history){
        let bodyFormData = new FormData();
        bodyFormData.set('collection', COLLECTION_API);
        bodyFormData.set('history', JSON.stringify(history));
        return new Promise(function(resolve, reject){
            axios({
                url : API_URL + 'history.php',
                method: 'post',
                data: bodyFormData,
            }).then(response => resolve (response)).catch(error => reject(error));
        });
    }

    static getHistory(){
        return new Promise(function(resolve, reject) {
            axios.get(API_URL + 'history.php?collection='+COLLECTION_API, {})
                .then( (response) => {
                    resolve(response);
                }).catch((error) => {
                reject(error);
            });
        });
    }
}

export default Api;