import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
        if(localStorage.getItem("matches_played")){
            this.setState({
                new_matches : JSON.parse(localStorage.getItem("matches_played"))
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
                    a.total++
                }
                return b.total - a.total
            })
            this.setState({
                new_matches : arrayMatches
            }, () =>{
                localStorage.setItem('matches_played', JSON.stringify(this.state.new_matches))
            })
        })
        

    }
    getTeam(e){
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
        let _this = this;
        if(document.getElementById('first_country')){
            let first_country = document.getElementById('first_country').value
            let second_country = document.getElementById('second_country').value
            setStateStart(first_country,second_country,_this)
        } else{
            let first_country = this.state.actual_playing.country_1
            let second_country = this.state.actual_playing.country_2
            setStateStart(first_country,second_country,_this)
        }

        function setStateStart(first_country,second_country, __this){
            __this.setState({
                playing : true,
                home_score : 0,
                away_score : 0,
                actual_playing : {
                    country_1 : first_country,
                    country_2 : second_country
                }
            })
        }
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
                    {this.state.playing === false ?
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
                    
                    {this.state.playing === false 
                        ?<Button className='btn-dark' id='start_button' variant="light" onClick={this.start.bind(this)}>Start match</Button>
                        :<Button className='btn-dark' id='finish_button' variant="light" onClick={this.finish.bind(this)}>Finish match</Button>
                    }
                    
                </div>
                <div className="cont">
                    {this.state.new_matches.length > 0 &&
                        this.state.new_matches.map( 
                            (flag, key) => {
                                return(
                                    <div key={flag} className="final_core" id={key}>
                                        <div className="final_score">
                                            <div className="box_score">
                                                {flag.country_1.country_name}
                                                <span>{flag.country_1.score}</span>
                                            </div>
                                            <span>VS</span>
                                            <div className="box_score">
                                                <span>{flag.country_2.score}</span>
                                                {flag.country_2.country_name}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        )
    }
}
export default Score_table;