class User{
    constructor(name, gender, birth, country, email, password, photo, admin){
        this._id
        this._name = name
        this._gender = gender
        this._birth = birth
        this._country = country
        this._email = email
        this._password = password
        this._photo = photo
        this._admin = admin
        this._date = new Date()
    }

    get id(){
        return this._id
    }

    get date(){
        return this._date
    }

    set date(date){
        this._date = date
    }

    get name(){
        return this._name
    }

    get gender(){
        return this._gender
    }

    get birth(){
        return this._birth
    }

    get country(){
        return this._country
    }

    get email(){
        return this._email
    }

    get password(){
        return this._password
    }

    set photo(photo){
        this._photo = photo
    }

    get photo(){
        return this._photo
    }

    get admin(){
        return this._admin
    }

    loadFromJSON(dataUser){
        for (let name in dataUser){
            switch(name){
                case "_date":
                    console.log("entrou")
                    this[name] = new Date(dataUser[name])
                    break
                default:
                    if(name.substring(0, 1) === "_") this[name] = dataUser[name]
            }
        }
    }

    static getUsersStorage(){
        return HttpRequest.get(`/users`)
    }

    save(){
        return new Promise((resolve, reject)=>{
            let promise

            if(this.id){
                promise = HttpRequest.put(`/users/${this.id}`, this.toJSON())
                console.log()
            }else{
                promise = HttpRequest.post("users", this.toJSON())
            }
    
            promise.then(data => {
                this.loadFromJSON(data)
                resolve(this)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    toJSON(){
        let json = {}

        Object.keys(this).forEach(key=>{
            if(this[key] != undefined) json[key] = this[key]
        })

        return json
    }

    remove(){
        return HttpRequest.delete(`users/${this._id}`)
    }
}