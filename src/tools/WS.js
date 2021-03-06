import ajax from 'eam-components/dist/tools/ajax';

/**
 * Handles all calls to REST Api
 */
class WS {

    //
    // GENERAL
    //
    getUserData(currentScreen, screenCode, config = {}) {
        return this._get(`/users?currentScreen=${currentScreen}&screenCode=${screenCode}`, config);
    }

    getApplicationData(config = {}) {
        return this._get('/application/applicationdata', config);
    }

    getScreenLayout(entity, systemFunction, userFunction, tabs, config = {}) {
        if (tabs)
            tabs = 'tabname=' + tabs.join('&tabname=');
        return this._get('/application/screenlayout/' + entity + '/' + systemFunction + '/' + userFunction + '?' + tabs, config)
    }

    getGISLink(workorderNumber, locationCode, config = {}) {
        return this._get('/workordersmisc/gislink?workorder=' + workorderNumber + "&location=" + locationCode, config);
    }

    login(username, password, organization, config = {}) {
        return this._get('/login', {
            headers: {
                INFOR_USER: username,
                INFOR_PASSWORD: password,
                INFOR_ORGANIZATION: organization
            }
        });
    }

    //
    //
    //
    getMyOpenWorkOrders(config = {}) {
        return this._get('/myworkorders/my', config)
    }

    getMyTeamWorkOrders(config = {}) {
        return this._get('/myworkorders/myteam', config)
    }

    getSearchData(keyword, config = {}) {
        keyword = encodeURIComponent(keyword);
        return ajax.get(process.env.REACT_APP_BACKEND + '/index?s=' + keyword, config);
    }

    getSearchSingleResult(keyword, config = {}) {
        return ajax.get(process.env.REACT_APP_BACKEND + '/index/singleresult?s=' + keyword, config);
    }

    //
    //COMMON AUTOCOMPLETES
    //

    autocompleteEmployee = (filter, config = {}) => {
        return this._get('/autocomplete/employee/' + filter, config);
    };

    autocompleteClass = (entity, filter, config = {}) => {
        return this._get(`/autocomplete/class/${entity}/${filter}`, config);
    };

    autocompleteDepartment = (filter, config = {}) => {
        filter = encodeURIComponent(filter);
        return this._get(`/autocomplete/department/${filter}`, config);
    };

    autocompleteLocation = (filter, config = {}) => {
        filter = encodeURIComponent(filter);
        return this._get(`/autocomplete/location?s=${filter}`, config);
    };


    //
    //
    //
    _get(url, config = {}) {
        return ajax.get(process.env.REACT_APP_BACKEND + url, config);
    }

    _post(url, data, config = {}) {
        return ajax.post(process.env.REACT_APP_BACKEND + url, data, config);
    }

    _put(url, data, config = {}) {
        return ajax.put(process.env.REACT_APP_BACKEND + url, data, config);
    }

    _delete(url, config = {}) {
        return ajax.delete(process.env.REACT_APP_BACKEND + url, config);
    }

}

export default new WS();
