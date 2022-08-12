const AuthQueries = {
    checkEmailExists: "SELECT * FROM users  WHERE email = $1",
    registerUser: "INSERT INTO users (first_name,last_name,email,password) VALUES ($1, $2, $3, $4) RETURNING *",
    updateRefreshToken: "UPDATE users SET refresh_token = $1 WHERE id = $2"
};

export default AuthQueries;