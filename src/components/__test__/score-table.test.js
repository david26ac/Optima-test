import React from 'react';
import Score_table from '../score-table';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme';

Enzyme.configure({adapter: new Adapter()})

describe('component Score', () =>{
    it('should change state of playing true', () => {
        const scoreboard = shallow(<Score_table/>) 
        const button_start = scoreboard.find('#start_button')
        button_start.simulate('click');
        expect(scoreboard.state().playing).toBe(true)
    })
    it('Should add matches to array', () => {
        const scoreboard = shallow(<Score_table/>) 
        const button_start = scoreboard.find('#start_button')
        button_start.simulate('click');
        const button_finish = scoreboard.find('#finish_button')
        button_finish.simulate('click');
        expect(scoreboard.state().new_matches.length).toBe(1)
    })
    it('it Should add 1 score to first team', () => {
        const scoreboard = shallow(<Score_table/>) 
        const button_start = scoreboard.find('#start_button')
        button_start.simulate('click');
        const button_score = scoreboard.find('#score_home')
        button_score.simulate('click', {"currentTarget":{"id": "score_home"}})
        expect(scoreboard.state().home_score).toBe(1)
    })
})

