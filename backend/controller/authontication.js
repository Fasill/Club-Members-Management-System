import UserModel from '../models/UserModel.js'

export const login =(async(req,res)=>{
    try {
        // Create a random user object
        const randomUser = {
          name: 'Random User',
          userId: 'randomUser123',
          password: 'randomPassword',
          email: 'randomuser@example.com',
          role: 'devPresident', // Choose a role from your predefined roles
          division: 'dev', // Choose a division from your predefined divisions
        };
    
        // Create a new user instance using the UserModel
        const newUser = new UserModel(randomUser);
    
        // Save the user to the database
        await newUser.save();
    
        console.log('Random user added successfully');
        res.send('Random user added successfully');
      } catch (error) {
        console.error('Error adding random user:', error.message);
        res.send('Error adding random user:', error.message);
      }


})
