import React from "react";

class Form extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    changeInputValue(event){
        // Cập nhật state
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    validationForm() {
        let returnData = {
            error : false,
            msg: ''
        }
        const {email, password} = this.state
        //Kiểm tra email
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            returnData = {
                error: true,
                msg: 'Không đúng định dạng email'
            }
        }
        //Kiểm tra password
        if(password.length < 8) {
            returnData = {
                error: true,
                msg: 'Mật khẩu phải lớn hơn 8 ký tự'
            }
        }
        return returnData;
    }
    submitForm(event) {
        //Chặn sự kiện mặc định của form
        event.preventDefault()
        const validation = this.validationForm()
        if (validation.error) {
            alert(validation.msg)
        }else{
            alert('Submit form success')
        }
        //In ra giá trị của input trong form
        console.log(this.state)
    }
    render() {
        return (
            <div className="container" style={{ paddingTop: "5%" }}>
                <form
                    onSubmit={e => {
                        this.submitForm(e);
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="text">Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Enter email"
                            onChange={e => this.changeInputValue(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter password"
                            onChange={e => this.changeInputValue(e)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>

            </div>
        );
    }
}
export default Form;

