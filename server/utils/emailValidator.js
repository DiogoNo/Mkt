const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmail = (email) => {
    return emailRegex.test(email);
}

export default isEmail;