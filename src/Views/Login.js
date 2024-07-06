function Login(props) {
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => props.update(true)}>Log In Button</button>
        </div>
    );
}
export default Login;