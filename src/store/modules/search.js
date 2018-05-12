import axios from "axios"
import router from '@/router/index'

var serverUrl = "https://skitel.azurewebsites.net";


const state = {
    searchModel: {
        FullName: "",
        City: null,
        Country: null
    },
    searchResult: [],
    CountryList: [],
    CityList: []
}

const mutations = {
    setSearchResult(state, newResult){
        state.searchResult = newResult;
    },
    setCity(state, city){
        if(state.searchModel.City != null)
            state.searchModel.City.isSelected = false;
        state.searchModel.City = city;
        city.isSelected = true;
    },
    setCountry(state, country){
        if(state.searchModel.Country != null)
            state.searchModel.Country.isSelected = false;
        state.searchModel.Country = country;
        
        if(state.searchModel.City != null)
            state.searchModel.City.isSelected = false;

        state.CityList = []

        state.searchModel.City = null;
        country.isSelected = true;
    },
    setCountryList(state, countryList){
        state.CountryList = countryList.map(value => {
            value.isSelected = false;
            return value;   
        })
    },
    setCityList(state, cityList){
        state.CityList = cityList.map(value => {
            value.isSelected = false;
            return value;   
        })
    },
}

const actions = {
    search({commit, state, getters}){
        var params = new URLSearchParams();
        var cat = getters.getSelectedCategories;
        var model = getters.getSearchModel;
        cat.forEach(element => {
            console.log(element);
             params.append("categoryid", element.Id)
             
        });
        if(model.City != null)
            params.append("cityid", model.City.Id)
        if(model.FullName != null)
        params.append("fullname", model.FullName)
        
        axios.post(serverUrl + '/api/Account/Searcher', null, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params
        })
          .then(response => {
            console.log(response)
            commit('setSearchResult', response.data);
          })
          .catch(error => {
            console.log(error.response)
          })
    },
    setCity({dispatch, commit}, city){
        commit('setCity', city);
        dispatch('search');
    },
    loadCountries({commit, state}){
        
        axios.get(serverUrl + '/api/Country/ToList', {
           
        })
        .then(response => {
            commit("setCountryList", response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },

    changeCountry({commit, state}, country){
        var params = new URLSearchParams();
        
        params.append("countryId", country.Id)
        axios.get(serverUrl + '/api/City/CitiesInCountry/ToList', {
            params
        })
        .then(response => {
            commit("setCityList", response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

}


const getters = {
    getSearchModel(state){
        return state.searchModel;
    },
    getSearchResult(state){
        return state.searchResult;
    },
    getSelectedCity(state){
        return state.searchModel.City
    },
    getSelectedCountry(state){
        return state.searchModel.Country
    },
    getCountryList(state){
        return state.CountryList
    },
    getCityList(state){
        return state.CityList
    }
}


export default {
    state, 
    mutations,
    actions,
    getters
}