import express from 'express';
import { connectDatabase } from './database';
import authRouter from './routes/auth';
import { User, userSchema } from './models/users'; // import the User model and userSchema
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import bcrypt from 'bcryptjs'; // import the bcryptjs library
import { errorHandler } from './middlewares/errorHandler';
// import { apartmentRouter } from './routes/apartments';
// import { errorMiddleware } from './middleware/error';

connectDatabase()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();

app.use(cookieParser());
app.use(expressSession({
  secret: process.env.JWT_SECRET as string,
  resave: false,
  saveUninitialized: true,
}));

// Apply middleware
app.use(express.json());

// Apply routes
app.use('/auth', authRouter);
// app.use('/apartments', apartmentRouter);

// Apply error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

async function createUser() {
    const user = new User({
      email: 'syndic@gmail.com',
      password: 'syndic123',
    });
  
    // Hash the password before saving the user
    user.password = await bcrypt.hash(user.password, 10);
  
    try {
      const savedUser = await user.save();
      console.log(savedUser);
    } catch (error) {
      console.error(error);
    }
  }
  
//   createUser();