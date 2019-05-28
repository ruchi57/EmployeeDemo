import React, { Component } from 'react';


class FormComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                <label>    Emp tag Number:
                <input type="text" name="tagNumber"
                        onChange={(event) => this.props.tagChangeHandler(event)} />
                </label><br /><br />

                <label>    First Name:
                <input type="text" name="fisrtname"
                        onChange={(event) => this.props.fNameChangeHandler(event)} />
                </label><br /><br />

                <label>    Last Name:
                <input type="text" name="lastName"
                        onChange={(event) => this.props.lNameChangeHandler(event)} />
                </label><br /><br />

                <lable>Email Adress:
                <input type="email"
                        name="email"
                        onChange={(event) => this.props.emailChangeHandler(event)} />
                </lable>

                <label>   Department:
                <input type="text" name="dept"
                        onChange={(event) => this.props.deptChangeHandler(event)} />
                </label><br /><br />

                <label>   Age:
                <input type="number" name="age"
                        onChange={(event) => this.props.ageChangeHandler(event)} />
                </label><br /><br />

                <label>   Designation:
                <input type="text" name="des"
                        onChange={(event) => this.props.desChangeHandler(event)} />
                </label><br /><br />

                <button onClick={this.props.handleAddEmplyeeClick}>
                    Submit
                </button>

                <button onClick={this.props.handleEditClick}>
                    Edit
                </button>
            </form>);
    }
}

export default FormComponent;