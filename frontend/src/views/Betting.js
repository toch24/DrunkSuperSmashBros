import React, {useEffect, useState} from 'react';
import "./Home.css";
import { post_data,} from '../Utilities/FetchFunction';

class Betting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bet: 0, isSubmitted: false, players: ["test player1", "test player2", "test player3"], 
            betFor: "", message: ""}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIn = this.handleIn.bind(this);
    }

    handleIn = (e) => {
        e.preventDefault();
        window.location.assign("/")
    }

    handleChange(event) {
        console.log("change occur");
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if(!this.state.players.includes(this.state.betFor)){
            this.setState({message: "Please enter player name in the list."})
            this.setState({isSubmitted: false})
        }
        else if (this.state.bet > 10 || this.state.bet < 0){
            this.setState({message: "Bet between 0 and 10."})
            this.setState({isSubmitted: false})
        }
        else {
            this.setState({isSubmitted: true})
            this.setState({message: ""})
        }
       
        console.log(this.state.message)

        //creating form to send data to the backend
        let form_data = new FormData()
        let keys = Object.keys(this.state)
        keys.forEach(key => {
            form_data.append(key, this.state[key])
        })
        post_data(form_data, "betting") 
        
    }

    render(){
        const isSubmitted = this.state.isSubmitted;
        let returnContent;
        
        while (!isSubmitted)
        {
            return(
                <div className = "betting">
                    <form className='bt-form' onSubmit={this.handleSubmit}>
                        Bet for Players: { this.state.players.map((val) =>
                        <div>
                            <p key={val}>{val}</p>
                        </div>
                        )}
                        Enter who you want to bet for: <br/>
                        <input className='textBox' type="text" value={this.state.betFor} onChange={this.handleChange}/>
                        <br/>Enter the amount to bet: <br/>
                        <input className='textBox' type="text" value={this.state.bet} onChange={this.handleChange}/>
                        <br/> <br/>
                        <input className='my-submit' type="submit" value="Submit"/>
                    </form>

                    {this.state.message}
                </div>
            )
        }

        if (isSubmitted) {
            return (
                this.handleIn
            )
        }
    }
}
export default Betting