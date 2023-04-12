import { comparePassword } from "../../helpers/auth.js";
import User from "../../models/user.js";
import isEmail from '../../utils/emailValidator.js';


export const validateRegisterFields = async ({ name, email, password }) => {
  const emailValidation = isEmail(email)
    const validations = [
    () => !name.trim() && 'name is required',
    () => (!email.trim() || !emailValidation) && 'email is invalid',
    async () => {
      const equalsEmail = await User.findOne({ email });
      return equalsEmail && 'email is taken';
    },
    () => (!password || password.length < 6) && 'password Invalid',
    ];
    const errors = await Promise.all(validations.map((validation) => validation()));
    return errors.filter((error) => error);
  };
  
  export const validateLoginFields = async (fields) => {
    const { email, password } = fields;
    const emailValidation = isEmail(email)
    const validations = [
      () => (!email.trim() || !emailValidation) && 'email is invalid',
      async () => {   
        const equalsEmail = await User.findOne({ email });
        if(!equalsEmail){
            return 'User not found'
        } else{
        const isValidPassword = await comparePassword(password, equalsEmail.password);
        return !isValidPassword && 'password is invalid'
        }
          }
        ];
      const errors = await Promise.all(validations.map((validation) => validation()));
      return errors.filter((error) => error);
  };