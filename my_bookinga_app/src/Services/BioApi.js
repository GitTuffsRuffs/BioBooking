class BioApi {
    //conction = "https://bio.tuffsruffs.se/api/";
    conction = "http://localhost:54426/api/";

    auditoriumsPromis = null;
    auditoriumsList = [];
    cinemasPromis = null;
    cinemasList = [];
    logedin = false;
    eventFunctions = [];
    user = null;

    constructor() {
        this.auditoriumsPromis = this.getJson("auditoriums");
        this.auditoriumsPromis.then((auditoriums) => this.auditoriumsList = auditoriums);
        this.cinemasPromis = this.getJson("cinemas");
        this.cinemasPromis.then((cinemas) => this.cinemasList = cinemas);

        const token = JSON.parse(localStorage.getItem('token'));
        if(token) {
            this.logedin = true;
            this.user = token;
        }
    }
    
    async wait() {
        await this.auditoriumsPromis;
        await this.cinemasPromis;
    }

    async getJson(path) {
        const response = await fetch(this.conction+path);
        if(response.status < 200 || response.status >= 300 ) {
            throw new Error(await response.text());
        }
        return response.json();
    }

    async postJson(path, formData){
        const options = {
            method: 'POST',
            body: formData
        }
        const response = await fetch(this.conction+path, options);
        if(response.status < 200 || response.status >= 300 ) {
            throw new Error(await response.text());
        }
        return response.json();
    }

    async postString(path , formData){
        const options = {
            method: 'POST',
            body: formData
        }
        const response = await fetch(this.conction+path, options);
        
        if(response.status < 200 || response.status >= 300 ) {
            throw new Error(await response.text());
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

    email() {
        if(this.user) {
            return this.user.email;
        } else {
            return "";
        }
    }

    async login(username, password){
        let formData;
        formData = new FormData();

        formData.append('email', username);
        formData.append('password', password);

        try {
            this.user = await this.postJson("login", formData);
        }
        catch
        {
            return false;
        }

        this.logedin = true;
        localStorage.setItem('token', JSON.stringify(this.user));
        this.triggerListener();
        return this.logedin;
    }

    async register(username, password){
        let formData;
        formData = new FormData();

        formData.append('email', username);
        formData.append('password', password);

        try {
            this.user = await this.postJson("register", formData);
        }
        catch
        {
            return false;
        }

        this.logedin = true;
        localStorage.setItem('token', JSON.stringify(this.user));
        this.triggerListener();
        return this.logedin;
    }

    async reservations() {
        let formData;
        formData = new FormData();
        formData.append('token', this.user.token);

        try {
            return this.postJson("reservations", formData);
        } 
        catch 
        {
            return [];
        }
    }

    async addBookingCurrentUSer(showId, seatCount) {
        let formData = new FormData();
        formData.append('token', this.user.token);
        formData.append('show_id', showId);
        formData.append('seats', seatCount);

        return this.postJson("book", formData); 
    }

    async addBookingNewUser(showId, seatCount, email) {
        let formData = new FormData();
        formData.append('email', email);
        formData.append('show_id', showId);
        formData.append('seats', seatCount);

        return this.postJson("book", formData); 
    }

    logout(){
        this.logedin = false;
        this.user = null;
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