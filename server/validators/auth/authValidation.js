import { comparePassword } from "../../helpers/auth.js";
import User from "../../models/user.js";
import isEmail from '../../utils/emailValidator.js';
export const validateRegisterFields = async ({ name, email, password }) => {
  const emailValidation = isEmail(email)
  console.log(!email.trim() &&  !emailValidation) && 'email is invalid';
    const validations = [
      async () => !name.trim() && 'name is required',
      async () => (!email.trim() || !emailValidation) && 'email is invalid',
      async () => {
        const equalsEmail = await User.findOne({ email });
        return equalsEmail && 'email is taken';
      },
      async () => (!password || password.length < 6) && 'password Invalid',
    ];
    const errors = await Promise.all(validations.map((validation) => validation()));
    return errors.filter((error) => error);
  };
  
  export const validateLoginFields = async (fields) => {
    console.log(fields)
    const { email, password } = fields;
    const validations = [
        async () => !email.trim() && 'email is invalid',
        async () => (!password || password.length < 6) && 'password is invalid',
        async () => {
          const equalsEmail = await User.findOne({ email });
          return equalsEmail === null && 'User not found';
        },
        async () => { 
            const isValidPassword = await comparePassword(password, equalsEmail.password);
            return !isValidPassword && 'password is incorrect'
        }
        ];
        const errors = await Promise.all(validations.map((validation) => validation()));
        return errors.filter((error) => error);
  };