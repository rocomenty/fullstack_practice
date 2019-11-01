import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../actions';

class SurveyList extends Component {

    componentDidMount() {
        this.props.fetchSurvey();
    }

    renderSurveys() {
        return this.props.survey.reverse().map(survey => {
            return (
                <div className="dark-1 card" key={survey._id}>
                    <div className='card-content'>
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a href='/'> Yes: {survey.yes} </a>
                        <a href='/'> No: {survey.no} </a>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>

        );
    }
}

function mapStateToProps({ survey }) {
    return { survey };
}

export default connect(mapStateToProps, {fetchSurvey})(SurveyList);