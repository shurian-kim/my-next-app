import AppLayout from "src/components/layout/AppLayout"

const Login = (props: any): JSX.Element => {
    console.log('Login props = ', props)
    return (
        <AppLayout>
            <div>로그인</div>
        </AppLayout>
    )
}

export default Login