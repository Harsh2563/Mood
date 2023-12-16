import { SignUp, redirectToSignUp } from "@clerk/nextjs";

const signUpPage = ()=> {
    return <SignUp afterSignUpUrl={'/new-user'} redirectUrl={'/new-user'}/>
}

export default signUpPage