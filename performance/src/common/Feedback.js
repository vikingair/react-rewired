// @flow

import React, { Component } from 'react';

type FeedbackStatus = 'good' | 'neutral' | 'bad';

const _get = (): { [string]: FeedbackStatus } => {
    try {
        return JSON.parse((localStorage.getItem('feedback'): any)) || {};
    } catch {
        return {};
    }
};

const _set = (id: string, status: FeedbackStatus) => {
    const current = _get();
    current[id] = status;
    localStorage.setItem('feedback', JSON.stringify(current));
};

const FeedbackStorage = {
    get: _get,
    set: _set,
};

type FeedbackProps = {| id: string |};
type FeedbackState = { status?: FeedbackStatus };

type FeedbackStatusProps = {| onClick?: void => void |};
const Good = ({ onClick }: FeedbackStatusProps) => (
    <div className="status" style={{ color: '#66ff6d' }}>
        <span onClick={onClick} aria-label="good" role="img" aria-labelledby="me">
            &#x1F603;
        </span>
    </div>
);
const Neutral = ({ onClick }: FeedbackStatusProps) => (
    <div className="status">
        <span onClick={onClick} aria-label="neutral" role="img" aria-labelledby="me">
            &#x1F610;
        </span>
    </div>
);
const Bad = ({ onClick }: FeedbackStatusProps) => (
    <div className="status" style={{ color: '#ff4f56' }}>
        <span onClick={onClick} aria-label="bad" role="img" aria-labelledby="me">
            &#x1F61E;
        </span>
    </div>
);

export class Feedback extends Component<FeedbackProps, FeedbackState> {
    state: FeedbackState = { status: FeedbackStorage.get()[this.props.id] };

    choose = (status: FeedbackStatus) => () => FeedbackStorage.set(this.props.id, status) || this.setState({ status });

    renderStatus = (status: FeedbackStatus) => {
        if (status === 'good') return <Good />;
        if (status === 'neutral') return <Neutral />;
        if (status === 'bad') return <Bad />;
    };

    render = () => {
        const { status } = this.state;

        return (
            <div className="feedback">
                {status ? (
                    this.renderStatus(status)
                ) : (
                    <>
                        <Good onClick={this.choose('good')} />
                        <Neutral onClick={this.choose('neutral')} />
                        <Bad onClick={this.choose('bad')} />
                    </>
                )}
            </div>
        );
    };
}
