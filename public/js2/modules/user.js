class User {
    constructor(object) {
        this.id = object.id;
        this.email = object.email;
        this.name = object.name;
        this.rating = object.rating;
    }

    getProfileData() {
        return {
            'email': this.email,
            'name': this.name,
            'rating': this.rating
        }
    }
}

export default User;