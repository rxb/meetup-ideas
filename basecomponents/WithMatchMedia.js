import React from 'react';
import { MEDIA_QUERIES } from '../styles/designConstants';

const breakpointNames = Object.keys(MEDIA_QUERIES);

export const getStateNameByBreakpoint = breakpoint => {
	const capitalizedBp = `${breakpoint.substr(0,1).toUpperCase()}${breakpoint.substr(1)}`;
	return `at${capitalizedBp}`;
};

export const getUpdatedMediaState = (mediaQueries) => mediaQueries
	.reduce((state, mq, i) => {
		state[getStateNameByBreakpoint(breakpointNames[i])] = mq.matches;
		return state;
	}, {});

export const WithMatchMedia = (
	WrappedComponent
) => class extends React.Component {

	// TODO:
	// figure out how to support more platforms than just web

	/*
	constructor(props) {
		super(props);

		this.state = {
			media: {}
		};

		this.handleMediaChange = this.handleMediaChange.bind(this);
	}

	handleMediaChange() {
		const updated = getUpdatedMediaState(this.mediaQueries);
		this.setState({
			media: {...this.state.media, ...updated}
		});
	}

	componentDidMount() {

		if ( typeof window === 'undefined' || !window.matchMedia ) {
			return false;
		}

		this.mediaQueries = breakpointNames
			.map(bp => window.matchMedia(MEDIA_QUERIES[bp]));

		// add listners for every MediaQueryList object
		this.mediaQueries.forEach(mq => {
			mq.addListener(this.handleMediaChange);
		});

		this.setState({ media: getUpdatedMediaState(this.mediaQueries) });

	}

	componentWillUnmount() {
		this.mediaQueries.forEach(mq => {
			mq.removeListener(this.handleMediaChange);
		});
	}

	render() {
		return (
			<WrappedComponent
				{...this.props}
				media={this.state.media}
			/>
		);
	}
	*/


	// just hardcoding this for now
	// until there's time for a cross-platform responsive strategy
	render() {
		return (
			<WrappedComponent
				{...this.props}
				media={'small'}
			/>
		);
	}

};