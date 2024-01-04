const pool = require('../server');



// user model
const User = {

    async findUserByEmail(email) {
        const [rows, fields] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    async findUserByUserId(userId) {
        const [rows, fields] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        return rows[0];
    },

    async addUser(email, passwordSalt,passswordHash,selfIntro,createTime) {
        const result = await pool.query('INSERT INTO users (email, password_salt,password_hash,self_intro,normal_token_num,management_token_num,create_time) VALUES (?,?,?,?,?,?,?)', [email,passwordSalt,passswordHash,selfIntro,0,0,createTime]);
        return result;
    },

    async updateVerificationToken(email, verificationToken) {
        try {
          const query = 'UPDATE users SET verificationToken = ? WHERE email = ?';
          const values = [verificationToken, email];
          await pool.query(query, values);
          console.log(`Verification token updated for user ${email}`);
          return true;
        } catch (error) {
          console.error(`Error updating verification token for user ${email}:`, error);
          return false;
        }
    },

    async verifyUserToken(email, token) {
        try {
            const query = 'SELECT id FROM users WHERE email = ? AND verificationToken = ?';
            const values = [email, token];
            const [rows] = await pool.query(query, values);
      
            if (rows.length === 1) {
              // Token is valid, update the user's verification status (if needed)
              const updateQuery = 'UPDATE users SET verificationToken = NULL, isVerified = 1 WHERE email = ?';
              await pool.query(updateQuery, [email]);
              
              console.log(`User ${email} has been verified.`);
              return true;
            } else {
              console.log(`Invalid verification token for user ${email}`);
              return false;
            }
        } catch (error) {
        console.error(`Error verifying user token for user ${email}:`, error);
        return false;
        }
    }

}

module.exports = User;