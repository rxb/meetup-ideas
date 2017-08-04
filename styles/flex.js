import { StyleSheet } from 'react-native';

// CONSTANTS
// move to file somewhere
const base = 16;
const space = base * .75;
const spaceSection = base * 1.5;
const flexGrowFactors = [1, 2, 3, 4, 5, 6, 7];
const flexJustifyMap = {
	"flexEnd": "flex-end",
	"center": "center",
	"spaceBetween": "space-between",
	"spaceAround": "space-around"
};
const flexAlignMap = {
	"top": "flex-start",
	"bottom": "flex-end",
	"center": "center"
};
const breakpointsMap = {
	"medium": 600,
	"large": 800
}
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// STYLES
const styles = StyleSheet.create({

	// BASIC FLEX

	'flex' : {
		alignItems: 'stretch',
		flexDirection: 'row',
	},

	'flex-item' : {
		flex: 1,
		//flexBasis: 0 // this was overshrinking react-native, don't remember why this was here to begin with
		//width: 'auto',
	},


	// testing setting first-child manually
	// works across platforms better
	// consider a composable component that adds this to iteratable items
	'flex-item--firstChild': {
		paddingLeft: 0
	},



	// FLEX DIRECTIONS

	'flex--row' : {
		flexDirection: 'row',
	},

	'flex--row__flex-item': {
		flex: 1,
		paddingLeft: base,
		//minHeight: '-webkit-min-content'
	},


	'flex--column': {
		flexDirection: 'column',
		//height: '100%' // this seems to mess up react-native
	},

	'flex--column__flex-item': {
		paddingLeft: 0,
		//minHeight: '-webkit-min-content'
	},



	// FLEX-ITEM VARIANTS

	...(()=>{
		const growObj = {};
		for(let factor of flexGrowFactors){
			growObj[`flex-item--${factor}`] = { flex: factor };
		}
		return growObj;
	})(),


	'flex-item--shrink': {
		flex: 0,
		//minWidth: '-webkit-min-content'
	},


	// FLEX-VARIANTS

	'flex--noGutters__flex-item': {
		padding: 0,
	},

	'flex--wrap': {
		flexWrap: 'wrap'
	},

	'flex--columnReverse': {
		flexDirection: 'column-reverse'
	},

	'flex--rowReverse': {
		flexDirection: 'row-reverse'
	},

	/*
	'flex--rowReverse__flex-item--firstChild': {
		paddingLeft: space
	},

	'flex--rowReverse__flex-item--lastChild': {
		paddingLeft: space
	},
	*/


	// FLEX-ITEM VARIANTS: JUSTIFICATION
	// flex--flexEnd, flex--center, flex--spaceBetween, flex--spaceAround
	...(()=>{
		const justifyObj = {};
		for( let jName in flexJustifyMap){
			justifyObj[`flex--${jName}`] = { justifyContent: flexJustifyMap[jName] };
		}
		return justifyObj;
	})(),


	// FLEX-ITEM VARIANTS: ALIGNMENT
	// flex--alignTop, flex--alignBottom, flex--alignCenter
	...(()=>{
		const alignObj = {};
		for( let aName in flexAlignMap){
			alignObj[`flex--align${capitalize(aName)}`] = { alignItems: flexAlignMap[aName] };
		}
		return alignObj;
	})(),


});

export default styles;