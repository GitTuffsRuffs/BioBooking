class BioApi {
    conction = "https://bio.tuffsruffs.se/api/";
    //const conction = "http://localhost:54426/api/";

    auditoriumsPromis = null;
    cinemasPromis = null;

    constructor() {
        this.auditoriumsPromis = this.auditoriums();
        this.cinemasPromis = this.cinemas();
    }

    async movies() {
        const response = await fetch(this.conction+"movies");
        return response.json();
    }

    async movie(id) {
        const response = await fetch(this.conction+"movie/"+id);
        return response.json();
    }

    async auditoriums(){
        const response = await fetch(this.conction+"auditoriums");
        return response.json();
    }

    async auditorium(id) {
        for(const auditorium of await this.auditoriumsPromis) {
            if(id === auditorium.id){
                return auditorium;
            }
        }
    }

    async cinemas(){
        const response = await fetch(this.conction+"cinemas");
        return response.json();
    }

    async shows(movieid){
        const response = await fetch(this.conction+"movie/"+movieid+"/shows");
        return response.json();
    }
}

export default BioApi;