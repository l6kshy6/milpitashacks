const Login = () => {

  const loginHandler = () => {}

  return (
    <div>
      <form onSubmit={loginHandler}>
        <input placeholder="email"></input>
        <input placeholder="password"></input>
        <input placeholder="first name"></input>
        <input placeholder="last name"></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;