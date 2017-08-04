import { StyleSheet } from 'react-native';
import swatches from './swatches';
import flexStyles from './flex';


const base = 16;
const space = base * .75;
const spaceSection = base * 1.5;

const styles = StyleSheet.create({

	container: {
	    flex: 1,
	},

	absoluteFill: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},

	absoluteCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},

	// LAYOUT
	stripe: {
		backgroundColor: 'white'
	},

	stripeCollection: {
		backgroundColor: '#eee'
	},

	bounds: {
		maxWidth: 1000,
	},
	section: {
		paddingTop: spaceSection,
		marginHorizontal: spaceSection,
		paddingBottom: spaceSection - space,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,.1)',
	},


	chunk: {
		paddingBottom: space
	},

	// stacking up some inline
	inline: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},


	// TABLE SECTION VARIANTS
	sectionTable: {
		marginHorizontal: 0,
		padding: spaceSection,
		marginTop: spaceSection,
		marginBottom: 0,
		borderBottomWidth: 0,
		backgroundColor: 'white'
	},
	sectionTableFooter: {
		marginHorizontal: 0,
		paddingVertical: 0,
		marginTop: 0,
		paddingTop: space,
		paddingHorizontal: spaceSection,
		borderBottomWidth: 0,
	},


	// LISTS
	// react-sketchapp lists other than default depend on yoga https://github.com/airbnb/react-sketchapp/issues/52

	// default
	list:{

	},
	'list-item': {
		//borderTopWidth: 1,
		//borderTopColor: '#ddd',
		//paddingTop: space
	},

	// grid

	'list--grid':{
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	'list-item--grid': {
		flexBasis: '50%'
	},

	// inline
	'list--inline':{
		flexDirection: 'row',
		flexWrap: 'nowrap',
		//overflow: 'scroll',
		//WebkitOverflowScrolling: 'touch',
	},
	'list-item--inline': {
		flexBasis: 200
	},

	// hscroll
	'list--hscroll':{
		flexDirection: 'row',
		flexWrap: 'nowrap',
		marginHorizontal: -1 * spaceSection,
		marginBottom: space,
		//overflowY: 'scroll',
		//WebkitOverflowScrolling: 'touch',
	},
	'list-container--hscroll': {
		paddingHorizontal: spaceSection - space
	},
	'list-item--hscroll': {
		flexBasis: 200
	},


	// INPUT
	input: {
		//backgroundColor: '#eeeeee',
		//padding: space * 1.5,
		paddingBottom: space,
		borderRadius: 5,
		borderWidth: 0,
		color: swatches.textPrimary,
		fontSize: base,
		//borderBottomWidth: 1,
		//borderBottomColor: swatches.line,
		//boxSizing: 'border-box',
		//appearance: 'none'
	},
	inputBig: {
		fontSize: base * 1.375,
	},
	'input--multiline': {
		minHeight: base * 6
	},


	// BUTTON
	button: {
		backgroundColor: '#1D7CF2',
		padding: space*1.75,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	buttonText: {
		color: '#ffffff',
		textAlign: 'center',
		fontWeight: '600'
	},
	'button--edge': {
		borderRadius: 0,
	},

	// CHIP
	chip: {
		backgroundColor: '#eee',
		paddingVertical: space*0.5,
		paddingHorizontal: space,
		borderRadius: 20,
		flex: 0,
		//flexBasis: 0, // react native oversqueezes
		//width: 'auto',
		//minHeight: '-webkit-min-content',
		//minWidth: '-webkit-min-content'
	},
	chipText: {
		textAlign: 'center'
	},

	// CARD
	card: {
		borderRadius: 5,
		backgroundColor: 'rgba(0,0,0,.075)',
		overflow: 'hidden',
		/*
		shadowRadius: 4,
		shadowColor: 'rgba(0,0,0,.25)',
		shadowOpacity: 1,
		backgroundColor: 'white',
		elevation: 3 // android
		*/
	},

	cardSection: {
		paddingTop: spaceSection,
		paddingHorizontal: spaceSection,
		paddingBottom: spaceSection - space
	},

	// TABS
	tabs: {
		flexDirection: 'row',
		alignItems: 'stretch',
	},
	tabItem: {
		//minHeight: '-webkit-min-content',
		paddingHorizontal: space,
		paddingVertical: space / 2
	},

	'tabItem--variableWidth':{
		flex: 0
	},

	'tabItem--fullWidth': {
		flex: 1,
		textAlign: 'center'
	},

	'tabItem--selected': {
		borderBottomColor: 'blue',
		borderBottomWidth: 3,
	},
	'tabText--selected': {
		color: 'blue'
	},

	// MODAL
	'modal-backdrop': {
		//position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,.75)'
	},
	modal: {
		//position: 'fixed',
		top: space*2,
		left: space*2,
		right: space*2,
		bottom: space*2
	},

	// TOAST
	toast: {
		backgroundColor: 'red',
		//position: 'fixed',
		left: space*2,
		right: space*2,
		bottom: space*2,
		padding: space
	},

	// AVATAR
	avatar: {
		resizeMode: 'cover',
	},
	'avatar--small':{
		width: 24,
		height: 24,
		borderRadius: 12
	},
	'avatar--medium':{
		width: 36,
		height: 36,
		borderRadius: 18
	},
	'avatar--large':{
		width: 120,
		height: 120,
		borderRadius: 60
	},

	// TEXT
	text: {
		fontSize: base,
		fontFamily: 'System',
		fontWeight: '400',
		color: swatches.textPrimary,
		lineHeight: base * 1.4,
		//WebkitFontSmoothing: 'antialiased', // retina/non-retina rendering
		//fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
	},
	textSecondary:{
		color: swatches.textSecondary
	},
	textHint:{
		color: swatches.textHint
	},
	textSmall: {
		fontSize: base * 0.825,
		lineHeight: base * 0.825 * 1.4,
	},
	textStrong: {
		fontWeight: '600',
	},
	textBig: {
		fontSize: base * 1.375,
		lineHeight: base * 1.375 * 1.4,
		fontWeight: '800'
	},
	textSectionHead: {
		fontSize: base * 1.2,
		lineHeight: base * 1.125 * 1.4,
		fontWeight: '700'
	},
	textPageHead: {
		fontSize: base * 2,
		lineHeight: base * 2 * 1.2,
		fontWeight: '700'
	},
	textKicker: {
		fontSize: base * 0.75,
		fontWeight: '500',
		color: 'red'
	}
});

export default {...styles, ...flexStyles};