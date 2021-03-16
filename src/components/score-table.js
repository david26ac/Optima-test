import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

class Score_table extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            home_score : 0,
            away_score : 0,
            playing : false,
            actual_playing : {
                country_1 : 'Mexico',
                country_2 : 'Canada'
            },
            new_matches : []
        }
    }
    componentDidMount(){
        console.log(localStorage)
        if(localStorage.getItem("matches_played")){
            this.setState({
                new_matches : JSON.parse(localStorage.getItem("matches_played"))
            }, () =>{
                console.log(this.state.new_matches)
            })
        }
        // localStorage.removeItem("matches_played");
    }
    score(e){
        if(e.currentTarget.id === 'score_home'){
            this.setState({
                home_score : this.state.home_score + 1
            })
        } else{
            this.setState({
                away_score : this.state.away_score + 1
            })
        }
    }
    finish(){
        let new_match_played = {
            country_1 : {
                country_name : this.state.actual_playing.country_1,
                score : this.state.home_score,
            },
            country_2 : {
                country_name : this.state.actual_playing.country_2,
                score : this.state.away_score
            },
            total : this.state.home_score + this.state.away_score,
            match : this.state.actual_playing.country_1 + this.state.actual_playing.country_2
        }

        this.setState(prevState => ({
            playing : false,
            home_score : 0,
            away_score : 0,
            new_matches : [
                ...prevState.new_matches, new_match_played
            ]
        }), () => {
            let arrayMatches = []
            arrayMatches = this.state.new_matches.sort( (a,b) => {
                if(b.total === a.total){
                    console.log('equals!')
                    console.log(a.match + " a ")
                    console.log(b.match + " b ")
                    a.total++
                }
                return b.total - a.total
            })
            this.setState({
                new_matches : arrayMatches
            }, () =>{
                console.log(this.state.new_matches)
                localStorage.setItem('matches_played', JSON.stringify(this.state.new_matches))
            })
        })
        

    }
    getTeam(e){
        console.log(e.currentTarget.value)
        let id = e.currentTarget.id;
        
        if(id === 'first_country'){
            let country = e.currentTarget.value;
            document.getElementById('second_country').childNodes.forEach(option => {
                if(option.text === country){
                    option.setAttribute('disabled', true)
                } else{
                    option.disabled = false
                }
            });

        } else{
            let country = e.currentTarget.value;
            document.getElementById('first_country').childNodes.forEach(option => {
                if(option.text === country){
                    option.setAttribute('disabled', true)
                } else{
                    option.removeAttribute('disabled', false)
                }
            });
        }
    }
    start(){
        if(document.getElementById('first_country')){
            var first_country = document.getElementById('first_country').value
            var second_country = document.getElementById('second_country').value
        } else{
            var first_country = this.state.actual_playing.country_1
            var second_country = this.state.actual_playing.country_2
        }
        this.setState({
            playing : true,
            home_score : 0,
            away_score : 0,
            actual_playing : {
                country_1 : first_country,
                country_2 : second_country
            }

        })
    }
    render(){
        return(
            <div className="score">
                <h1>Score board</h1>
                {this.state.playing}
                <div className="board">
                    { this.state.playing === true ?
                    <div className="cont">
                        <h2>Now playing</h2>
                        <div className="locals">
                            <div className="home">
                                {this.state.actual_playing.country_1}
                                <div className="score_match">
                                    {this.state.home_score}
                                    <Button variant="light" id='score_home' onClick={this.score.bind(this)}>Score</Button>
                                </div>
                            </div>
                            <div className="away">
                                {this.state.actual_playing.country_2}
                                <div className="score_match">
                                    {this.state.away_score}
                                    <Button variant="light" id='score_away' onClick={this.score.bind(this)}>Score</Button>
                                </div>
                            </div>
                        </div>
                    </div>: ''}
                    {this.state.playing == false ?
                    <div className="cont">
                        <Form.Control as="select" size="lg" id='first_country' onChange={this.getTeam.bind(this)} custom>
                            <option disabled>México</option>
                            <option>Canada</option>
                            <option>Spain</option>
                            <option>Brazil</option>
                            <option>Germany</option>
                            <option>France</option>
                            <option>Uruguay</option>
                            <option>Italy</option>
                            <option>Argentina</option>
                            <option>Australia</option>
                        </Form.Control>
                        <Form.Control as="select" size="lg" id='second_country' onChange={this.getTeam.bind(this)} custom>
                            <option disabled>Canada</option>
                            <option>México</option>
                            <option>Spain</option>
                            <option>Brazil</option>
                            <option>Germany</option>
                            <option>France</option>
                            <option>Uruguay</option>
                            <option>Italy</option>
                            <option>Argentina</option>
                            <option>Australia</option>
                        </Form.Control>
                    </div>
                    : ''}
                    
                    {this.state.playing == false 
                        ?<Button className='btn-dark' id='start_button' variant="light" onClick={this.start.bind(this)}>Start match</Button>
                        :<Button className='btn-dark' id='finish_button' variant="light" onClick={this.finish.bind(this)}>Finish match</Button>
                    }
                    
                </div>
                {this.state.new_matches.length > 0 &&
                    this.state.new_matches.map( 
                        (flag, key) => {
                            return(
                                <div key={flag} className="final_core" id={key}>
                                    <div className="final_score">
                                        <div className="box_score">
                                            {flag.country_1.country_name + " " + flag.country_1.score}
                                        </div>
                                        <span>VS</span>
                                        <div className="box_score">
                                            {flag.country_2.country_name + " " + flag.country_2.score}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }
}
export default Score_table;