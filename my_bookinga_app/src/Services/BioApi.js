class BioApi {
    conction = "https://bio.tuffsruffs.se/api/";
    //const conction = "http://localhost:54426/api/";

    auditoriumsPromis = null;
    auditoriumsList = [];
    cinemasPromis = null;
    cinemasList = [];
    logedin = false;
    eventFunctions = [];
    token = null;
    
    constructor() {
        this.auditoriumsPromis = this.getJson("auditoriums");
        this.auditoriumsPromis.then((auditoriums) => this.auditoriumsList = auditoriums);
        this.cinemasPromis = this.getJson("cinemas");
        this.cinemasPromis.then((cinemas) => this.cinemasList = cinemas);

        const token = localStorage.getItem('token');
        if(token) {
            this.logedin = true;
            this.token = token;
        }
    }

    async wait() {
        await this.auditoriumsPromis;
        await this.cinemasPromis;
    }

    async getJson(path) {
        const response = await fetch(this.conction+path);
        if(response.status !== 200) {
            throw new Error(response.text());
        }
        return response.json();
    }

    async postJson(path, formData){
        const options = {
            method: 'POST',
            body: formData
        }
        const response = await fetch(this.conction+path, options);
        if(response.status !== 200) {
            throw new Error(response.text());
        }
        return response.json();
    }

    async postString(path , formData){
        const options = {
            method: 'POST',
            body: formData
        }
        const response = await fetch(this.conction+path, options);
        
        if(response.status !== 200) {
            throw new Error(response.text());
        }

        return response.text();
    }

    async movies() {
        return this.getJson("movies");
    }

    async movie(id) {
        return this.getJson("movie/"+id);
    }

    auditoriums(){
        return this.auditoriumsList;
    }

    auditorium(id) {
        for(const auditorium of this.auditoriumsList) {
            if(id === auditorium.id){
                return auditorium;
            }
        }
        return null;
    }

    cinemas(){
        return this.cinemasList;
    }

    cinema(id) {
        for(const cinema of this.cinemasList) {
            if(id === cinema.id){
                return cinema;
            }
        }
        return null;
    }

    async shows(movieid){
        return this.getJson("movie/"+movieid+"/shows");
    }
    
    islogedin() {
        return this.logedin;
    }

    async login(username, password){
        let formData;
        formData = new FormData();

        formData.append('email', username);
        formData.append('password', password);

        try {
            this.token = await this.postString("login", formData);
        }
        catch
        {
            return false;
        }

        this.logedin = true;
        localStorage.setItem('token', this.token);
        this.triggerListener();
        return this.logedin;
    }

    async register(username, password){
        let formData;
        formData = new FormData();

        formData.append('email', username);
        formData.append('password', password);

        try {
            this.token = await this.postString("register", formData);
        }
        catch
        {
            return false;
        }

        this.logedin = true;
        this.triggerListener();
        return this.logedin;
    }

    async reservations() {
        let formData;
        formData = new FormData();
        formData.append('token', this.token);

        try {
            return this.postJson("reservations", formData);
        } 
        catch 
        {
            return [];
        }
    }

    logout(){
        this.logedin = false;
        this.token = null;
        localStorage.removeItem('token');
        this.triggerListener();
    }

    addListener(eventFunction){
        this.eventFunctions.push(eventFunction);
    }

    triggerListener(){
        for(const event of this.eventFunctions){
            event(this.logedin);
        }
    }
}

export default BioApi;