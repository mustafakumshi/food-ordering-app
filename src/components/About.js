import { Component } from "react";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

class About extends Component{
    constructor(props){
        super(props);

        // console.log("Parent Constructor")
    }

    componentDidMount(){
        // console.log("Parent Did Mount")
    }

    render(){

        // console.log("Parent Render")

        return (
            <div>
                <h1>About Namaste</h1>
                <h2>English me Hello, Hindi me Namaste!</h2>
                <div>
                    <UserContext.Consumer>
                        {({loggedInUser}) => <h2 className="font-bold">{loggedInUser}</h2>}
                    </UserContext.Consumer>
                </div>
                <UserClass name="First" location="Mumbai"/>
                {/* <UserClass name="Second" location="UK"/> */}
                {/* <UserClass name="Third" location="UK"/> */}
            </div>
        )
    }
}

export default About;