import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userInfo: {
                name: "dummy",
                location: "dummy",
                avatar_url: "dummy",
                login: "dummy",
            }

        }

        console.log(this.props.name + " Child Constructor")
    }

    async componentDidMount() {
        const data = await fetch('https://api.github.com/users/akshaymarch7');
        const json = await data.json();
        console.log(json);

        this.setState({userInfo : json})
        console.log(this.props.name + " Child Did Mount")
    }

    componentDidUpdate(){
        console.log(this.props.name + " Child Did Update")
    }

    componentWillUnmount(){
        console.log(this.props.name + " Child Will Unmount")
    }

    render() {

        console.log(this.props.name + " Child Render")
        const {name, location, avatar_url, login} = this.state.userInfo;
        return (
            <div className="user-card">
                <img src={avatar_url} alt={name} />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Id: {login}</h4>
            </div>
        )
    }
}

export default UserClass;