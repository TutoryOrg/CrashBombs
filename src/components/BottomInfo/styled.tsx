import { fontSizes } from "@src/utils/constants";
import { verticalScale } from "@src/utils/scaleFunctions";
import { ContainerColumn } from "../Container";
import { TextLucky, TextObelix } from "../Text";
import styled, { type DefaultTheme } from "styled-components/native";

export const TextInfoBlue = styled(TextLucky)`
    color: ${(props: DefaultTheme) => props?.theme?.blueColor};
    font-size: ${verticalScale(fontSizes.small)}px;
`;

export const TextInfoRed = styled(TextLucky)`
    color: ${(props: DefaultTheme) => props?.theme?.redColor};
    font-size: ${verticalScale(fontSizes.small)}px;
`;

export const TextInfoPinkSmall = styled(TextLucky)`
    color: ${(props: DefaultTheme) => props?.theme?.pinkColor};
    font-size: ${verticalScale(fontSizes.small)}px;
`;

export const TextInfo = styled(TextLucky)`
    color: ${(props: DefaultTheme) => props?.theme?.txtColor};
    font-size: ${verticalScale(fontSizes.small)}px;
`;

export const InfoTitle = styled(TextLucky)`
	margin-top: 3%;
	font-size: ${verticalScale(fontSizes.Xlarge)}px;
    color: ${(props: DefaultTheme) => props.theme.blueColor};
`;

export const InfoContainer = styled.View<{ isLoggedIn: boolean; windowHeight: number }>`	
	flex: 1;
	width: 100%;
	align-items: center;
	justify-content: center;
	background-color: ${(props: DefaultTheme) => props.theme.bgColor};
	height: ${(props) => (props.isLoggedIn ? "fit-content" : `${props.windowHeight / 2}px`)};
`;

export const UserInfoContainer = styled.View`
	flex: 1;
	width: 100%;
    padding: ${verticalScale(5)}%;
	align-items: center;
	flex-direction: row;
	justify-content: space-around;
`;

export const UserNotContainer = styled(ContainerColumn)`
    width: 100%;
    align-items: center;
    justify-content: space-around;
`;

export const InfoSubTitle = styled(TextObelix)`
	width: 80%;
	padding: 3%;
	text-align: center;
`;

export const InfoButtonsContainer = styled.View`
	width: 80%;
    height: ${verticalScale(100)}px;
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
	width: 70%;
	text-align: left;
	padding-left: ${verticalScale(10)}px;
	font-size: ${verticalScale(fontSizes.small)}px;
	color: ${(props: DefaultTheme) => props?.theme?.txtGrayColor};
`;

export const NotHaveAccountOptions = styled.TouchableOpacity`
	z-index: 9;
	width: 100%;
	height: ${verticalScale(20)}px;
	align-items: center;
	justify-content: center;
	background-color: ${(props: DefaultTheme) => props?.theme?.bgColor};
`;
