const Signup = () => {

  const signupHandler = () => {}

  return (
    <div>
      <form onSubmit={signupHandler}>
        <input placeholder="email"></input>
        <input placeholder="password"></input>
        <input placeholder="first name"></input>
        <input placeholder="last name"></input>
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;