import styled from "styled-components/native";
import { fontSizes } from "@src/utils/constants";
import { moderateScale, scale, verticalScale } from "@src/utils/scaleFunctions";
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
    height: 20%;
    text-align: center;
    line-height: ${verticalScale(35)}px;
    padding-top: ${verticalScale(35)}px;
    font-size: ${verticalScale(fontSizes.XXlarge)}px;
    color: ${(props: DefaultTheme) => props?.theme?.pinkColor};
`;

// :: HEADER
export const HeaderContainer = styled.View<{ isLoggedIn: boolean }>`
    height: 5%;
    width: 100%;
    align-items: center;
	flex-direction: row;
	padding-horizontal: 20px;
    justify-content: ${(props: DefaultTheme) => (props.isLoggedIn ? "space-between" : "flex-end")};
`;

export const UserStatus = styled.View<{ isLoggedIn: boolean }>`
	width: 32%;
	flex-direction: row;
	justify-content: space-between;
	display: ${(props: DefaultTheme) => (props.isLoggedIn ? "flex" : "none")};	
`;

export const TextUser = styled(TextObelix)`
	font-size: ${verticalScale(fontSizes.xsmall)}px;
`;

export const Image = styled.Image<{ isLoggedIn: boolean }>`
    width: ${verticalScale(20)}px; 
    height: ${verticalScale(20)}px;
`;

// :: GLOBAL SCORER
export const ScoreContainer = styled.View`
	width: 80%;
	height: 20%;
	flex-direction: column;
	justify-content: space-between;
`;

export const TopUsersContainer = styled.View<{ index: number }>`
    width: 100%;
    align-self: center;
    flex-direction: row;
    justify-content: space-between;
    padding: ${verticalScale(2)}px;
    opacity: ${(props: DefaultTheme) => 1 / (props.index)};
`;

export const TextTile = styled(TextObelix)`
	text-align:center;
	border-top-width: 0px;
	border-left-width: 0px;
	border-right-width: 0px;
    font-size: ${scale(fontSizes.small)}px;
	border-bottom-width: ${verticalScale(2)}px;
	color: ${(props: DefaultTheme) => props?.theme?.txtColor};
	border: 1px solid ${(props: DefaultTheme) => props.theme.txtColor};
`;

export const TextTopUser = styled(TextObelix)`
    font-size: ${scale(fontSizes.xsmall)}px;
`;

// :: COUNTER
export const BlueText = styled(TextObelix)`
    font-size: ${scale(fontSizes.normal)}px;
    color: ${(props: DefaultTheme) => props?.theme?.blueColor};
`;

export const RedText = styled(TextObelix)`
    font-size: ${scale(fontSizes.normal)}px;
    color: ${(props: DefaultTheme) => props?.theme?.redColor};
`;

export const LoginText = styled(TextObelix)``;

export const TopFiveText = styled(TextObelix)`
    font-size: ${scale(fontSizes.xsmall)}px;
`;

export const CounterNumber = styled(TextObelix)`
    font-size: ${scale(fontSizes.XXXlarge)}px;
`;

export const CounterContainer = styled.TouchableOpacity`
	width: 86%;
	height: 10%;
	margin-top: 5%;
	margin-bottom: 5%;
	align-items: center;
	flex-direction: column;
    justify-content: space-between;
`;

// :: BUTTONS
export const ButtonsText = styled(TextObelix)`
	font-size: ${scale(fontSizes.Xlarge)}px;
	color: ${(props: DefaultTheme) => props?.theme?.txtGrayColor};
`;

export const ButtonsContainer = styled.View`
	width: 86%;
	height: 28%;
	margin-top: 14%;
	flex-direction: column;
	justify-content: space-around;
`;

export const ButtonSettings = styled.TouchableOpacity`
	width: 100%;
	height: 32%;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	background-color: ${(props: DefaultTheme) => props?.theme?.blueColor};
`;

export const ButtonPlay = styled.TouchableOpacity`
	width: 100%;
	height: 34%;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	background-color: ${(props: DefaultTheme) => props?.theme?.pinkColor};
`;

// :: BOTTOM SHEET INFO
export const InfoContainer = styled.View<{ isLoggedIn: boolean }>`
	flex: 1;
	width: 100%;
	align-items: center;
	justify-content: center;
    background-color: ${(props: DefaultTheme) => props.theme.bgColor};
	height: ${(props: DefaultTheme) => (props?.isLoggedIn ? verticalScale(200) : verticalScale(325))}px;
`;

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
