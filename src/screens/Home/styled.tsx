import styled from "styled-components/native";
import { fontSizes } from "@src/utils/constants";
import { scale, verticalScale } from "@src/utils/scaleFunctions";
import { TextKomi, TextLucky, TextObelix } from "@components/Text";

import type { DefaultTheme } from "styled-components";

// :: SCREEN HOME CONTAINER
export const ViewContainer = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    align-items: center;
    padding-top: ${verticalScale(45)}px;
    background-color: ${(props: DefaultTheme) => props.theme.bgColor};
`;

export const HomeTitle = styled(TextKomi)`
    width: 80%;
    text-align: center;
    height: ${verticalScale(120)}px;
    line-height: ${verticalScale(35)}px;
    padding-top: ${verticalScale(35)}px;
    font-size: ${verticalScale(fontSizes.XXlarge)}px;
    color: ${(props: DefaultTheme) => props?.theme?.pinkColor};
`;

// :: BOTTOM SHEET INFO
export const InfoTitle = styled(TextObelix)`
	margin-top: 3%;
	font-size: ${verticalScale(fontSizes.Xlarge)}px;
    color: ${(props: DefaultTheme) => props.theme.blueColor};
`;

export const UserInfoContainer = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
	flex-direction: row;
	justify-content: space-around;
	padding-left: 12%;
	padding-right: 12%;
`;

export const UserInfoContent = styled.View`
	flex: 1;
	flex-direction: column;
`;

// :: BOTTOMINFO
export const InfoSubTitle = styled(TextObelix)`
	width: 60%;
	padding: 3%;
	text-align: center;
`;

export const InfoButtonsContainer = styled.View`
	width: 88%;
	height: ${verticalScale(180)}px;
	align-items: center;
	justify-content: space-around;
`;

export const InfoButton = styled.TouchableOpacity`
	width: 100%;
	height: ${verticalScale(40)}px;
	border-radius: ${verticalScale(13)}px;	
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding-left: 4%;
	background-color: ${(props: DefaultTheme) => props?.theme?.lightGray};
`;

export const InfoButtonText = styled(TextLucky)`
	width: 56%;
	text-align: left;
	padding-left: ${verticalScale(10)}px;
	font-size: ${verticalScale(fontSizes.small)}px;
	color: ${(props: DefaultTheme) => props?.theme?.txtGrayColor};
`;
