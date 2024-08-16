import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User, { IUser } from './models/User';

dotenv.config();

async function createNewUser(username: string, email: string, password: string) {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    await mongoose.connect(mongoUri);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with this email');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log(`User ${username} created successfully!`);

    await mongoose.connection.close();
  } catch (err) {
    console.error('Error creating user:', err instanceof Error ? err.message : err);
    mongoose.connection.close();
  }
}

const [username, email, password] = process.argv.slice(2);

createNewUser(username, email, password);

/*
    Example: npx ts-node createUser.ts admin admin@example.com securepassword123
*/