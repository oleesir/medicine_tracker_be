const AuthQueries = {
    checkEmailExists: "SELECT s FROM users s WHERE s.email = $1",
    registerUser: "INSERT INTO users (first_name,last_name,email,password) VALUES ($1, $2, $3, $4) RETURNING *"
};

export default AuthQueries;